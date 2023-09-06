import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { Bot, Crop, FileAxis3d, Microscope, UploadCloud } from "lucide-react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader";
import vtkColorTransferFunction from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkAxesActor from "@kitware/vtk.js/Rendering/Core/AxesActor";
import vtkOrientationMarkerWidget from "@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget";
import vtkScalarBarActor from "@kitware/vtk.js/Rendering/Core/ScalarBarActor";

import ThreeDRenderer from "./../../components/ThreeRenderer";
import { FileUploader } from "react-drag-drop-files";

function VTKViewer() {
	const formRef = useRef(null);
	const [file, setFile] = useState(null);
	const [fileBlob, setFileBlob] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPredicted, setIsPredicted] = useState(false);
	const [data, setData] = useState(null);
	const [fullScreen, setFullScreen] = useState(false);
	const [segment, setSegment] = useState(false);
	const [visualize, setVisualize] = useState(false);

	const handleUpload = async (event) => {
		event.preventDefault();
		try {
			console.log("Starting Segmentation...");

			setIsLoading(true);
			const formData = new FormData(event.target);
			const response = await fetch(
				// "http://localhost:8000/api/v1/predict/post_processing", LOCAL SERVER
				"https://7bo0eldhj4.execute-api.us-east-1.amazonaws.com/prod/api/v1/predict/post_processing",  // AWS API ENDPOINT
				{
					method: "POST",
					body: formData,
				}
			).catch(() => {
				setIsLoading(false);
			});

			const jsonData = await response.json();

			const objData = JSON.parse(jsonData.body);
			setData(objData);

			const vtpFile = objData.prediction_file;

			const blob = new Blob([vtpFile], { type: "text/xml" });
			const vtpFilePath = URL.createObjectURL(blob);

			setIsPredicted(true);
			loadVTPTest(vtpFilePath);
			setIsLoading(false);
			toast.success("Segmentation is Done");
		} catch (err) {
			setIsLoading(false);
			toast.error("Oups! Something went wrong.");
		}
	};

	// LOAD VTP AND VISUALIZE
	const handleVisualize = (file) => {
		setFile(file);
		setFileBlob(file[0]);

		const selectedFile = file[0];
		const reader = new FileReader();

		reader.onload = () => {
			// Save the VTP XML data to a temporary file
			const vtpBlob = new Blob([file[0]], {
				type: "application/octet-stream",
			});
			const vtpFilePath = URL.createObjectURL(vtpBlob);

			// Load the VTP data
			loadVTPTest(vtpFilePath, "MaterialIds");
		};

		reader.readAsArrayBuffer(selectedFile);
	};

	const loadVTPTest = (objData) => {
		document.querySelector("#vtk-container").style.display = "block";
		const vtkRenderScreen = vtkFullScreenRenderWindow.newInstance({
			container: document.querySelector("#vtk-container"),
			background: [0.118, 0.161, 0.231],
			height: 550,
		});

		// Create a VTP reader
		const reader = vtkXMLPolyDataReader.newInstance();

		reader.setUrl(objData);

		reader.loadData().then(() => {
			// Get the VTP output data
			const vtpOutput = reader.getOutputData();

			// Get the materialid array from the VTP data
			const materialidArray = vtpOutput
				.getCellData()
				.getArrayByName("Label");

			if (!materialidArray) {
				toast.error(
					"The VTP file must be segmented first before visualizing. Please go back and segment the file, or try again to see if the issue has been resolved."
				);
				return;
			}

			// Map scalar array through the lookup table
			materialidArray.setName("Scalars"); // Make sure the array has a name
			vtpOutput.getCellData().setScalars(materialidArray);

			// Create a color transfer function
			const colorTransferFunction =
				vtkColorTransferFunction.newInstance();

			// Create colors for 15 different classes (you can adjust these)
			const classColors = [
				[0.878, 0.878, 0.878], // Gray
				[0.839, 0.153, 0.157], // Red
				[0.121, 0.466, 0.705], // Blue
				[0.172, 0.627, 0.172], // Green
				[0.58, 0.404, 0.741], // Purple
				[1.0, 0.498, 0.054], // Orange
				[0.89, 0.467, 0.761], // Pink
				[0.498, 0.498, 0.498], // Gray
				[0.737, 0.741, 0.133], // Yellow
				[0.09, 0.745, 0.811], // Teal
				[0.682, 0.78, 0.909], // Light Blue
				[0.09, 0.745, 0.172], // Bright Green
				[0.831, 0.607, 0.101], // Gold
				[0.647, 0.38, 0.094], // Brown
				[0.596, 0.306, 0.639], // Dark Purple
				[0.18, 0.18, 0.18], // Dark Gray
			];

			const uniqueMaterialIds = new Set(materialidArray.getData());
			const numColors = classColors.length;

			uniqueMaterialIds.forEach((materialid, index) => {
				// Normalize the index based on the unique material IDs
				const normalizedIndex = index / (uniqueMaterialIds.size - 1);

				// Calculate the color index and wrap around within the valid range
				const colorIndex =
					Math.floor(normalizedIndex * numColors) % numColors;

				const color = classColors[colorIndex];
				colorTransferFunction.addRGBPoint(
					materialid,
					color[0],
					color[1],
					color[2]
				);
			});

			// Create mapper and actor
			const mapper = vtkMapper.newInstance();
			mapper.setInputData(reader.getOutputData());
			mapper.setLookupTable(colorTransferFunction);

			mapper.setUseLookupTableScalarRange(true); // Ensure correct scalar range

			// Map scalars through the lookup table
			mapper.setScalarModeToUseCellData();
			mapper.setScalarVisibility(true);

			mapper.setColorModeToMapScalars(); // Map colors based on the materialid values

			const actor = vtkActor.newInstance();
			actor.setMapper(mapper);

			// create orientation widget
			const axes = vtkAxesActor.newInstance();
			const orientationWidget = vtkOrientationMarkerWidget.newInstance({
				actor: axes,
				interactor: vtkRenderScreen.getRenderWindow().getInteractor(),
			});
			orientationWidget.setEnabled(true);
			orientationWidget.setViewportCorner(
				vtkOrientationMarkerWidget.Corners.BOTTOM_LEFT
			);

			orientationWidget.setViewportSize(0.15);
			orientationWidget.setMinPixelSize(100);
			orientationWidget.setMaxPixelSize(300);

			let lut = mapper.getLookupTable();

			const scalarBarActor = vtkScalarBarActor.newInstance();
			scalarBarActor.setScalarsToColors(lut);

			vtkRenderScreen.getRenderer().addActor(scalarBarActor);

			vtkRenderScreen.getRenderer().addActor(actor);
			vtkRenderScreen.getRenderer().resetCamera();

			//Start rendering
			vtkRenderScreen.getRenderWindow().render();

			setIsLoading(false);
		});
	};

	const hanldeDownloadVtpFile = () => {
		const objContent = data.prediction_file;

		const blob = new Blob([objContent], { type: "text/plain" });

		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = data.filename;
		document.body.appendChild(a);
		a.click();

		URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	const handleBackBtn = () => {
		setFile(null);
		setFileBlob(null);
		setIsPredicted(null);
		setFullScreen(false);
		setData(null);
		setVisualize(false);
		setSegment(false);
		if (formRef.current) {
			formRef.current.reset();
		}
		document.querySelector("#vtk-container").innerHTML = null;
		document.querySelector("#vtk-container").style.display = "none";
	};

	const handleResizeWindow = () => {
		const headerElement = document.querySelector(".header");
		const footerElement = document.querySelector(".footer");

		setFullScreen(!fullScreen);

		if (!fullScreen) {
			if (headerElement) {
				headerElement.style.display = "none";
			}
			if (footerElement) {
				footerElement.style.display = "none";
			}
		} else {
			if (headerElement) {
				headerElement.style.display = "block";
			}
			if (footerElement) {
				footerElement.style.display = "block";
			}
		}
	};

	const handlePredictBtn = () => {
		if (formRef.current) {
			const submitEvent = new Event("submit", {
				bubbles: true,
				cancelable: true,
			});
			formRef.current.dispatchEvent(submitEvent);
		}
		setFile(null);
	};

	const fileOBJTypes = ["OBJ"];
	const fileVTPTypes = ["VTP"];

	const handleChange = (file) => {
		setFile(file);
		setFileBlob(file[0]);
	};

	const handleVisualizeBtn = () => {
		setVisualize(true);
	};

	const handleSegmentBtn = () => {
		setSegment(true);
	};

	const style = (
		<div className="container border-2 border-primary/50 bg-background text-primary hover:bg-primary/10 transition ease-linear rounded-xl px-8 py-6 lg:mx-8 md:px-24 cursor-pointer flex-box flex-col">
			<div className="flex-box box-1">
				<div className="w-12 h-12 mx-auto ">
					<UploadCloud size={32} strokeWidth={2.5} />
				</div>
			</div>
			<div className="flex-box box-2">
				<p className="font-medium 0">
					Upload or Drag and Drop a File
				</p>
			</div>
		</div>
	);

	return (
		<>
			<div
				className={`w-full h-screen scroll-smooth bg-primary-background mt-4 ${
					!isLoading &&
					!isPredicted &&
					!file &&
					!segment &&
					!visualize
						? "block"
						: "hidden"
				}`}
			>
				<div className="p-3 m-4 flex justify-end h-20">
					<button
						className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
						onClick={handleResizeWindow}
					>
						{fullScreen ? (
							<div className="flex items-center font-semibold">
								<span className="mx-2">Exit Full Screen</span>{" "}
								<AiOutlineFullscreenExit size={20} />
							</div>
						) : (
							<div className="flex items-center font-semibold">
								<span className="mx-2">Mode Full Screen</span>{" "}
								<AiOutlineFullscreen size={20} />
							</div>
						)}
					</button>
				</div>
				<div className="text-center flex-box flex-col">
					<div className="text-primary p-12 text-3xl font-semibold text-center">
						Please choose an option to Start
					</div>
					<div>
						<div className="bg-background flex-box flex-col md:flex-row w-full px-24 py-32 lg:px-96 rounded-md">
							<div className="text-center flex-box flex-col md:flex-row gap-4 w-full">
								<button
									onClick={handleVisualizeBtn}
									className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-700 hover:text-white leading-tight rounded-lg transition ease-linear"
								>
									<div className="flex items-center whitespace-nowrap">
										<Microscope className="mx-2" />
										Visualize VTP File
									</div>
								</button>
								<button
									onClick={handleSegmentBtn}
									className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-700 hover:text-white leading-tight rounded-lg transition ease-linear"
								>
									<div className="flex items-center whitespace-nowrap">
										<Crop className="mx-2" />
										Segment OBJ File
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{visualize && (
				<div
					className={`w-full h-screen scroll-smooth bg-primary-background mt-4 ${
						!isLoading && !isPredicted && !file ? "block" : "hidden"
					}`}
				>
					<div className="p-3 m-4 flex justify-center md:justify-between max-h-20 space-x-2 sm:space-x-4">
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-4 px-2 md:px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleBackBtn}
						>
							<div className="flex items-center">
								<AiOutlineArrowLeft className="mx-2" />
								<span className="hidden sm:block">Back</span>
							</div>
						</button>
						<div className="text-center items-center text-white mb-12">
							<div className="bg-background text-primary py-4 px-8 max-w-xl lg:mx-auto rounded-lg font-medium lg:text-xl text-md mx-2  whitespace-nowrap">
								<Microscope
									width={20}
									className="mr-2"
									style={{ display: "inline-block" }}
								/>{" "}
								Start Visualization
							</div>
						</div>
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleResizeWindow}
						>
							{fullScreen ? (
								<div className="flex items-center font-semibold">
									<span className="mx-2 hidden sm:block whitespace-nowrap">
										Exit Full Screen
									</span>{" "}
									<AiOutlineFullscreenExit size={20} />
								</div>
							) : (
								<div className="flex items-center font-semibold">
									<span className="mx-2  hidden sm:block whitespace-nowrap">
										Mode Full Screen
									</span>{" "}
									<AiOutlineFullscreen size={20} />
								</div>
							)}
						</button>
					</div>
					<div className="text-center flex-box flex-col">
						<div className="text-primary p-12 text-3xl font-semibold text-center">
							Please choose a file to start the Visualization
						</div>
						<div>
							<div className="bg-background text-primary flex-box flex-col md:flex-row w-full px-24 lg:px-96 rounded-md ">
								<div className="w-full py-12 file flex-box flex-col">
									<div>
										<FileUploader
											multiple={true}
											handleChange={handleVisualize}
											name="file"
											types={fileVTPTypes}
											// eslint-disable-next-line react/no-children-prop
											children={style}
										/>
									</div>
									<div className="lg:ml-16">
										<div className="text-center pt-8 text-xl font-semibold">
											Supported files
										</div>
										<div className="text-center text-md py-3">
											Only VTP files are supported
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{segment && (
				<div
					className={`w-full h-screen scroll-smooth bg-primary-background mt-4 ${
						!isLoading && !isPredicted && !file ? "block" : "hidden"
					}`}
				>
					<div className="p-3 m-4 flex justify-center md:justify-between max-h-20 space-x-2 sm:space-x-4">
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-4 px-2 md:px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleBackBtn}
						>
							<div className="flex items-center">
								<AiOutlineArrowLeft className="mx-2" />
								<span className="hidden sm:block">Back</span>
							</div>
						</button>
						<div className="text-center items-center text-white mb-12">
							<div className="bg-background text-primary py-4 px-8 max-w-xl lg:mx-auto rounded-lg font-medium lg:text-xl text-md mx-2 whitespace-nowrap">
								<Crop
									width={20}
									className="mr-2"
									style={{ display: "inline-block" }}
								/>{" "}
								Start Segmentation
							</div>
						</div>
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleResizeWindow}
						>
							{fullScreen ? (
								<div className="flex items-center font-semibold">
									<span className="mx-2 hidden sm:block whitespace-nowrap">
										Exit Full Screen
									</span>{" "}
									<AiOutlineFullscreenExit size={20} />
								</div>
							) : (
								<div className="flex items-center font-semibold">
									<span className="mx-2  hidden sm:block whitespace-nowrap">
										Mode Full Screen
									</span>{" "}
									<AiOutlineFullscreen size={20} />
								</div>
							)}
						</button>
					</div>
					<div className="text-center flex-box flex-col">
						<div className="text-primary p-12 text-3xl font-semibold text-center">
							Please choose a file to start the Segmentation
						</div>
						<div>
							<div className="bg-background text-primary flex-box flex-col md:flex-row w-full px-24 lg:px-96 rounded-md">
								<form
									ref={formRef}
									id="upload-form"
									onSubmit={handleUpload}
									className="w-full"
								>
									<div className="w-full py-12 flex-box flex-col">
										<div>
											<FileUploader
												multiple={true}
												handleChange={handleChange}
												name="file"
												types={fileOBJTypes}
												// eslint-disable-next-line react/no-children-prop
												children={style}
											/>
										</div>
										<div className="lg:ml-16">
											<div className="text-center pt-8 text-xl font-semibold">
												Supported files
											</div>
											<div className="text-center text-md py-3">
												Only OBJ files are supported
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}

			{file && visualize && (
				<div className="w-full h-screen scroll-smooth bg-primary-background mt-2">
					<div className="p-3 m-4 flex justify-between max-h-20">
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-4 px-2 md:px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleBackBtn}
						>
							<div className="flex items-center">
								<AiOutlineArrowLeft className="mx-2" />
								<span className="hidden sm:block">Back</span>
							</div>
						</button>
						<div className="text-center items-center text-white mb-12">
							<div className="bg-slate-900 py-4 px-8 max-w-xl mx-auto rounded-lg font-normal text-slate-300">
								<FileAxis3d
									width={20}
									style={{ display: "inline-block" }}
								/>{" "}
								Uploaded file:{" "}
								<span className="font-semibold text-white">
									{file ? `${file[0].name}` : "None"}
								</span>
							</div>
						</div>
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleResizeWindow}
						>
							{fullScreen ? (
								<div className="flex items-center font-semibold">
									<span className="mx-2 hidden sm:block whitespace-nowrap">
										Exit Full Screen
									</span>{" "}
									<AiOutlineFullscreenExit size={20} />
								</div>
							) : (
								<div className="flex items-center font-semibold">
									<span className="mx-2  hidden sm:block whitespace-nowrap">
										Mode Full Screen
									</span>{" "}
									<AiOutlineFullscreen size={20} />
								</div>
							)}
						</button>
					</div>

					<div className="text-primary p-4 text-3xl font-semibold text-center">
						Your uploaded VTP File:
					</div>

					<div id="vtk-container" className="w-full mb-8"></div>
				</div>
			)}

			{file && segment && (
				<div className="w-full h-screen scroll-smooth bg-primary-background mt-2">
					<div className="p-3 m-4 flex justify-between max-h-20">
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-4 px-2 md:px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleBackBtn}
						>
							<div className="flex items-center">
								<AiOutlineArrowLeft className="mx-2" />
								<span className="hidden sm:block">Back</span>
							</div>
						</button>
						<div className="text-center items-center text-white mb-12">
							<div className="bg-slate-900 py-4 px-8 max-w-xl mx-auto rounded-lg font-normal text-slate-300">
								<FileAxis3d
									width={20}
									style={{ display: "inline-block" }}
								/>{" "}
								Uploaded file:{" "}
								<span className="font-semibold text-white">
									{file ? `${file[0].name}` : "None"}
								</span>
							</div>
						</div>
						<button
							className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
							onClick={handleResizeWindow}
						>
							{fullScreen ? (
								<div className="flex items-center font-semibold">
									<span className="mx-2 hidden sm:block whitespace-nowrap">
										Exit Full Screen
									</span>{" "}
									<AiOutlineFullscreenExit size={20} />
								</div>
							) : (
								<div className="flex items-center font-semibold">
									<span className="mx-2  hidden sm:block whitespace-nowrap">
										Mode Full Screen
									</span>{" "}
									<AiOutlineFullscreen size={20} />
								</div>
							)}
						</button>
					</div>
					<div className="text-center flex-box flex-col">
						<ThreeDRenderer file={fileBlob} />
					</div>
					<div className="text-center mt-8">
						<button
							onClick={handlePredictBtn}
							className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-600 hover:text-white leading-tight rounded-lg transition ease-linear"
						>
							<div className="flex items-center">
								<Bot className="mx-2" />
								Start Segmentation
							</div>
						</button>
					</div>
				</div>
			)}

			{/* Loading Section */}
			{isLoading ? (
				<div className="p-8 w-full h-screen flex-box bg-primary-background">
					<div className="flex flex-col items-center">
						<div>
							<HashLoader color="#36d7b7" />
						</div>
						<div>
							<p className="text-md font-medium text-primary pt-8">
								TeethSeg is segmenting...
							</p>
						</div>
					</div>
				</div>
			) : null}

			{/* Segmentation Page */}
			<div
				className={`${
					isPredicted ? "block" : "hidden"
				} w-full scroll-smooth bg-primary-background`}
			>
				<div className="p-3 m-4 flex justify-between h-20">
					<button
						className="bg-slate-100 font-semibold text-slate-800 py-4 px-2 md:px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
						onClick={handleBackBtn}
					>
						<div className="flex items-center">
							<AiOutlineArrowLeft className="mx-2" />
							<span className="hidden sm:block">Back</span>
						</div>
					</button>
					<button
						className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear"
						onClick={handleResizeWindow}
					>
						{fullScreen ? (
							<div className="flex items-center font-semibold">
								<span className="mx-2 hidden sm:block whitespace-nowrap">
									Exit Full Screen
								</span>{" "}
								<AiOutlineFullscreenExit size={20} />
							</div>
						) : (
							<div className="flex items-center font-semibold">
								<span className="mx-2  hidden sm:block whitespace-nowrap">
									Mode Full Screen
								</span>{" "}
								<AiOutlineFullscreen size={20} />
							</div>
						)}
					</button>
				</div>

				<div className="text-primary text-3xl font-semibold text-center pt-2 pb-8">
					Predicted Segmentation:
				</div>
			</div>

			{isPredicted ? (
				<div id="vtk-container" className="w-full mb-8"></div>
			) : (
				<div id="vtk-container" style={{ display: "none" }}></div>
			)}

			{isPredicted ? (
				<div className="flex justify-center pb-12 mb-24">
					<button
						onClick={hanldeDownloadVtpFile}
						className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-600 hover:text-white leading-tight rounded-lg transition ease-linear"
					>
						<div className="flex items-center">
							<FaDownload className="mx-2" />
							<span className="mx-1">
								Download Segmented File
							</span>
						</div>
					</button>
				</div>
			) : (
				""
			)}
		</>
	);
}

export default VTKViewer;
