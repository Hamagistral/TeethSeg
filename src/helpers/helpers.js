import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkColorTransferFunction from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";

export const loadVTP = (objData, label, colorArray) => {
	const container = document.querySelector("#teeth-segmented");
	
	// Remove any previous rendering if it exists
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	const vtkRenderScreen = vtkFullScreenRenderWindow.newInstance({
		container: container,
		background: colorArray,
	});

	// Create a VTP reader
	const reader = vtkXMLPolyDataReader.newInstance();

	reader.setUrl(objData);

	reader.loadData().then(() => {
		// Get the VTP output data
		const vtpOutput = reader.getOutputData();

		// Get the materialid array from the VTP data
		const materialidArray = vtpOutput.getCellData().getArrayByName(label);

		// Map scalar array through the lookup table
		materialidArray.setName("Scalars"); // Make sure the array has a name
		vtpOutput.getCellData().setScalars(materialidArray);

		// Create a color transfer function
		const colorTransferFunction = vtkColorTransferFunction.newInstance();

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

		// Clean up the previous rendering before adding the new actor
		const previousActors = vtkRenderScreen.getRenderer().getActors();
		previousActors.forEach((actor) => {
			vtkRenderScreen.getRenderer().removeActor(actor);
			actor.delete();
		});

		const actor = vtkActor.newInstance();
		actor.setMapper(mapper);

		vtkRenderScreen.getRenderer().addActor(actor);
		vtkRenderScreen.getRenderer().resetCamera();

		const camera = vtkRenderScreen.getRenderer().getActiveCamera();

		let rotationAngle = 90;
		const rotationSpeed = 0.005;

		const animate = () => {
			rotationAngle += rotationSpeed;

			const cameraX = Math.cos(rotationAngle);
			const cameraZ = Math.sin(rotationAngle);
			const cameraY = 1;

			camera.setPosition(cameraX, cameraY, cameraZ);
			camera.setFocalPoint(0, 0, 0);
			camera.setViewUp(1, 0, 0);

			vtkRenderScreen.getRenderer().resetCamera();
			vtkRenderScreen.getRenderWindow().render();

			requestAnimationFrame(animate);
		};

		animate();
	});
};
