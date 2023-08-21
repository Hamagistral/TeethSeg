import vtk from "@kitware/vtk.js/vtk";
import axios from "axios";

import { FileAxis3d, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

function Upload() {
  const [file, setFile] = useState();
  const [obj, setObj] = useState();
  const [three, setThree] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fileName = files ? files.name : "File Uploaded";
  const fileName = "File Uploaded! Double Click To View";
  const chooseFile = document.getElementById("3d_file");
  // const imgPreview = document.getElementById("img-preview");

  const generateImg = async (e) => {
    e.preventDefault();
    setThree(fileName);
    getImgData();
  }

  // useEffect(() => {
  //   // Inside the useEffect, we will make the API request
  //   axios.post('http://127.0.0.1:8000/api/v1/predict/alpha')
  //     .then(response => {
  //       // setData(formData);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, []);  
  useEffect(() => {
    const fetchData = async () => {
      // const result = await fetch('http://127.0.0.1:8000/api/v1/predict/alpha')
      const result = await fetch('http://127.0.0.1:8000/')
      const jsonResult = await result.json()
      console.log(jsonResult);
      // setObj(jsonResult);
    }
    fetchData()
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }


  const generateModel = async (event) => {
    event.preventDefault();
    console.log("Starting Segmentation...")
    // Create a FormData object

    const formData = new FormData(event.target);

    // formData.append('file', new Blob(), './1.obj');

    // Fetch the JSON file containing the VTP XML data
    const response = await fetch('http://127.0.0.1:8000/api/v1/predict/alpha', {
      // const response = await fetch('http://127.0.0.1:8000/api/v1/predict',{
      method: 'POST', // Specify the HTTP method
      // header: {
      //   'Content-Type': 'application/json'
      // },
      body: formData,
      // body: JSON.stringify(formData),
    });
    const jsonData = await response.json();
    console.log(jsonData);

    // Extract the VTP XML data from the JSON data
    const objData = jsonData.prediction_file;

    // Save the VTP XML data to a temporary file
    const blob = new Blob([objData], { type: 'text/xml' });
    const vtpFilePath = URL.createObjectURL(blob);

    loadVTPTest(vtpFilePath);
  };

  const loadVTPTest = (objData) => {
    const vtkRenderScreen = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance({
      // container: document.querySelector('#vtk-container'),
      container: document.getElementById('vtk-container'),
      background: [0., 0., 0.]
    });

    // Create a VTP reader
    const reader = vtk.IO.XML.vtkXMLPolyDataReader.newInstance();
    // reader.parseAsArrayBuffer(objData);
    reader.setUrl(objData);

    reader.loadData().then(() => {

      // Get the VTP output data
      const vtpOutput = reader.getOutputData();

      // Get the materialid array from the VTP data
      // const materialidArray = vtpOutput.getCellData().getArrayByName('MaterialIds');
      const materialidArray = vtpOutput.getCellData().getArrayByName("Label");


      // console.log(vtpOutput.getCellData())
      // console.log(vtpOutput.getCellData().getArrayByName("MaterialIds").getData())
      // console.log(vtpOutput.getPointData().getNormals().getElementComponentSize())

      // Map scalar array through the lookup table
      materialidArray.setName("Scalars"); // Make sure the array has a name
      vtpOutput.getCellData().setScalars(materialidArray);

      console.log("materialidArray.getData(): ", materialidArray.getData())

      // Create a color transfer function
      const colorTransferFunction = vtk.Rendering.Core.vtkColorTransferFunction.newInstance();

      // Create colors for 15 different classes (you can adjust these)
      const classColors = [
        [0.839, 0.153, 0.157],  // Red
        [0.121, 0.466, 0.705],  // Blue
        [0.172, 0.627, 0.172],  // Green
        [0.580, 0.404, 0.741],  // Purple
        [1.000, 0.498, 0.054],  // Orange
        [0.890, 0.467, 0.761],  // Pink
        [0.498, 0.498, 0.498],  // Gray
        [0.737, 0.741, 0.133],  // Yellow
        [0.090, 0.745, 0.811],  // Teal
        [0.682, 0.780, 0.909],  // Light Blue
        [0.090, 0.745, 0.172],  // Bright Green
        [0.831, 0.607, 0.101],  // Gold
        [0.647, 0.380, 0.094],  // Brown
        [0.596, 0.306, 0.639],  // Dark Purple
        [0.180, 0.180, 0.180]   // Dark Gray
      ];

      // Assign colors to unique materialids
      // if(materialidArray.getData()){
      // }else{
      //     console.log("materialidArray is null")
      // }

      const uniqueMaterialIds = new Set(materialidArray.getData());
      const numColors = classColors.length;

      uniqueMaterialIds.forEach((materialid, index) => {
        // Normalize the index based on the unique material IDs
        const normalizedIndex = index / (uniqueMaterialIds.size - 1);

        // Calculate the color index and wrap around within the valid range
        const colorIndex = Math.floor(normalizedIndex * numColors) % numColors;

        const color = classColors[colorIndex];
        colorTransferFunction.addRGBPoint(materialid, color[0], color[1], color[2]);
      });
      // Create mapper and actor
      const mapper = vtk.Rendering.Core.vtkMapper.newInstance();
      mapper.setInputData(reader.getOutputData());
      mapper.setLookupTable(colorTransferFunction);

      mapper.setUseLookupTableScalarRange(true); // Ensure correct scalar range

      // Map scalars through the lookup table
      mapper.setScalarModeToUseCellData();
      mapper.setScalarVisibility(true);

      mapper.setColorModeToMapScalars(); // Map colors based on the materialid values

      const actor = vtk.Rendering.Core.vtkActor.newInstance();
      actor.setMapper(mapper);

      // create orientation widget
      const axes = vtk.Rendering.Core.vtkAxesActor.newInstance();
      const orientationWidget = vtk.Interaction.Widgets.vtkOrientationMarkerWidget.newInstance({
        actor: axes,
        interactor: vtkRenderScreen.getRenderWindow().getInteractor(),
      });
      orientationWidget.setEnabled(true);
      orientationWidget.setViewportCorner(
        vtk.Interaction.Widgets.vtkOrientationMarkerWidget.Corners.BOTTOM_RIGHT
      );

      orientationWidget.setViewportSize(0.15);
      orientationWidget.setMinPixelSize(100);
      orientationWidget.setMaxPixelSize(300);

      vtkRenderScreen.getRenderer().addActor(actor);
      vtkRenderScreen.getRenderer().resetCamera();

      //Start rendering
      vtkRenderScreen.getRenderWindow().render();
    });
  }

  function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      // fileReader.addEventListener("load", function () {
      //   imgPreview.style.display = "block";
      //   imgPreview.innerHTML = '<img src="' + this.result + '" />';
      // });
    }
  }

  return (
    <>
      <div className="bg-slate-700 flex-box flex-col md:flex-row w-full px-10 rounded-md">
        <div id="upload" className="w-full py-12 file flex-box flex-col">
          {/* <form id="upload-form" onSubmit={generateModel}> */}
            <label
              htmlFor="3d_file"
              className="flex-box flex-col p-3 my-auto text-center"
            >
              <UploadCloud size={28} strokeWidth={2.5} />
              <p>Click to upload or drag and drop</p>
            </label>
            <input
              className="3d-file"
              type="file"
              name="3d_file"
              accept=".obj"
              // accept="image/*"
              // ref={model}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setThree(e.target.files[0].name);
              }}
              id="3d_file"
              required
            />
            {/* <button type="submit">Upload and Render</button> */}
          {/* </form> */}
          <div onClick={generateImg} className="fileName text-white">
            <p className="bg-slate-800 py-4 px-8 rounded-xl font-normal text-slate-300">
              <FileAxis3d width={18} style={{ display: 'inline-block' }} /> Uploaded file: <span className="font-semibold text-white">{three ? three : "None"}</span>

            </p>
          </div>
          <div className="text-center pt-8 text-slate-100 text-xl font-semibold">
            Supported files
          </div>
          <div className="text-center text-slate-300 text-md py-3">
            OBJ, STL, PLY, VTP, GLB, GLTG, FBX
          </div>
        </div>
        {/* <div id="img-preview"></div> */}
        <div id="vtk-container"></div>
      </div>
    </>

  );
}

export default Upload;
