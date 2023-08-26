import { useRef, useState  } from 'react';
import { toast } from 'react-hot-toast';

import { Bot, FileAxis3d, UploadCloud } from 'lucide-react';
import {AiOutlineArrowLeft} from "react-icons/ai";
import {AiOutlineFullscreen} from "react-icons/ai";
import {AiOutlineFullscreenExit} from 'react-icons/ai';
import {FaDownload} from 'react-icons/fa';
import HashLoader from "react-spinners/HashLoader";

import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkXMLPolyDataReader from '@kitware/vtk.js/IO/XML/XMLPolyDataReader';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkAxesActor from '@kitware/vtk.js/Rendering/Core/AxesActor';
import vtkOrientationMarkerWidget from '@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget';
import vtkScalarBarActor from '@kitware/vtk.js/Rendering/Core/ScalarBarActor';

import ThreeDRenderer from '../../components/ThreeRenderer';


function VTKViewer() {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileBlob, setFileBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [data, setData] = useState(null)
  const [fullScreen, setFullScreen] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      console.log('Starting Segmentation...');

      setIsLoading(true);
      const formData = new FormData(event.target);
      const response = await fetch('http://127.0.0.1:8000/api/v1/predict/post_processing', {
        method: 'POST',
        body: formData,
      }).catch(err => {
        setIsLoading(false);
      });
      

      const jsonData = await response.json();

      const objData = JSON.parse(jsonData.body);
      setData(objData);

      const vtpFile = objData.prediction_file;
      
      const blob = new Blob([vtpFile], { type: 'text/xml' });
      const vtpFilePath = URL.createObjectURL(blob);

      loadVTPTest(vtpFilePath);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      toast.error("Oups! Something went wrong.");
    }
  };


  const loadVTPTest = (objData) => {
    document.querySelector('#vtk-container').style.display = 'block';
    const vtkRenderScreen = vtkFullScreenRenderWindow.newInstance({
        container: document.querySelector('#vtk-container'),
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
        // const materialidArray = vtpOutput.getCellData().getArrayByName('MaterialIds');
        const materialidArray = vtpOutput.getCellData().getArrayByName("Label");
  
        // Map scalar array through the lookup table
        materialidArray.setName("Scalars"); // Make sure the array has a name
        vtpOutput.getCellData().setScalars(materialidArray);
  
        // Create a color transfer function
        const colorTransferFunction = vtkColorTransferFunction.newInstance();
        
        // Create colors for 15 different classes (you can adjust these)
        const classColors = [
            [0.878, 0.878, 0.878],  // Gray
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
        const axes  = vtkAxesActor.newInstance();
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
        
        setIsPredicted(true);
        setIsLoading(false);
    });
  }

  const hanldeDownloadVtpFile = () => {
    const objContent = data.prediction_file;

    const blob = new Blob([objContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = data.filename
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  const handleBackBtn = () => {
    setFile(null)
    setFileBlob(null)
    setIsPredicted(null)
    setFullScreen(false)
    setData(null)
    if (formRef.current) {
      formRef.current.reset();
    }
    document.querySelector("#vtk-container").innerHTML = null;
    document.querySelector('#vtk-container').style.display = 'none';
  }

  const handleResizeWindow = () => {
    const headerElement = document.querySelector('.header');
    const footerElement = document.querySelector('.footer');
    
    setFullScreen(!fullScreen);

    if(!fullScreen){
      if (headerElement) {
        headerElement.style.display = 'none';
      }
      if(footerElement){
        footerElement.style.display = 'none';
      }
    }else{
      if(headerElement) {
        headerElement.style.display = 'block';
      }
      if(footerElement){
        footerElement.style.display = 'block';
      }
    }
  }

  const handlePredictBtn = () => {
      if (formRef.current) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.dispatchEvent(submitEvent);
      }
      setFile(null);
  };


  return (
    <>    
      <div className={`w-full h-screen scroll-smooth bg-slate-800 mt-4 ${!isLoading && !isPredicted && !file ? 'block' : 'hidden'}`}>
        <div className='p-3 m-4 flex justify-end h-20'>
          <button 
              className='bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear'
              onClick={handleResizeWindow}  
            >
              {fullScreen ?
              <div className='flex items-center font-semibold'><span className='mx-2'>Exit Full Screen</span> <AiOutlineFullscreenExit size={20}/></div>
              :
              <div className='flex items-center font-semibold'><span className='mx-2'>Mode Full Screen</span> <AiOutlineFullscreen size={20}/></div>
            }
            </button>
        </div>
        <div className="text-center flex-box flex-col">
          <div className="text-white p-12 text-3xl font-semibold text-center">
            Please choose a file to upload to start the prediction
          </div>
          <div>  
            <div className="bg-slate-700 flex-box flex-col md:flex-row w-full px-24 lg:px-96 rounded-md ">
              <form ref={formRef} id="upload-form" onSubmit={handleUpload} className="w-full p-0">
                <div className="w-full py-12 file flex-box flex-col">
                  <label
                    htmlFor="3d_file"
                    className="flex-box flex-col p-3 my-auto text-center hover:bg-slate-300 transition ease-linear"
                  >
                    <UploadCloud size={28} strokeWidth={2.5} />
                    <p>Click to upload or drag and drop</p>
                  </label>
                  <input
                    className="3d-file"
                    type="file" 
                    name="file"
                    accept=".obj"
                    onChange={(e) => {
                      setFileBlob(e.target.files[0]);
                      setFile(e.target.files[0].name);
                    }}
                    id="3d_file"
                  />
                  <input type="submit" id="hidden-submit" style={{ display: 'none' }} />
                  <div className="text-center pt-8 text-slate-100 text-xl font-semibold">
                    Supported files
                  </div>
                  <div className="text-center text-slate-300 text-md py-3">
                    For the moment only *.obj files are supported
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {file && 
        <div className='w-full h-screen scroll-smooth bg-slate-800 mt-2'>
          <div className='p-3 m-4 flex justify-between max-h-20'>
            <button 
              className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear" 
              onClick={handleBackBtn}
            >
              <div className='flex items-center'>
              <AiOutlineArrowLeft className="mx-2"/>
              Back
              </div>
            </button>
            <div className="text-center items-center text-white mb-12">
                <div className="bg-slate-900 py-4 px-8 max-w-xl mx-auto rounded-lg font-normal text-slate-300">
                  <FileAxis3d width={20} style={{display: 'inline-block'}}/> Uploaded file: <span className="font-semibold text-white">{file ? file : "None"}</span>
                </div>
            </div>
            <button 
              className='bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear'
              onClick={handleResizeWindow}  
            >
              {fullScreen ?
              <div className='flex items-center font-semibold'><span className='mx-2'>Exit Full Screen</span> <AiOutlineFullscreenExit size={20}/></div>
              :
              <div className='flex items-center font-semibold'><span className='mx-2'>Mode Full Screen</span> <AiOutlineFullscreen size={20}/></div>
            }
            </button>
          </div>
          <div className="text-center flex-box flex-col">
              <ThreeDRenderer file={fileBlob} />
          </div>
          <div className='text-center mt-8'>
            <button 
              onClick={handlePredictBtn} 
              className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-600 hover:text-white leading-tight rounded-lg transition ease-linear">
                <div className='flex items-center'>
                  <Bot className='mx-2'/>
                  Start Prediction
                </div>
            </button>
          </div>
        </div>
      }

      {isLoading ? 
        <div className="p-8 w-full h-screen flex-box bg-slate-800">
          <div className='flex flex-col items-center'>
            <div>
              <HashLoader color="#36d7b7" />
            </div>
            <div>
              <p className="text-md font-medium text-slate-100 pt-8">
                  TeethSeg is predicting...
              </p>
            </div>
          </div>
        </div>
      : null}
       
      <div className={`${isPredicted ? 'block' : 'hidden'} w-full scroll-smooth bg-slate-800`}>
        <div className='p-3 m-4 flex justify-between h-20'>
            <button 
              className="bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear" 
              onClick={handleBackBtn}
            >
              <div className='flex items-center'>
              <AiOutlineArrowLeft className="mx-2"/>
              Back
              </div>
            </button>
            <button 
              className='bg-slate-100 font-semibold text-slate-800 py-2 px-4 hover:bg-slate-600 hover:text-white rounded-lg transition ease-linear'
              onClick={handleResizeWindow}  
            >
              {fullScreen ?
              <div className='flex items-center font-semibold'><span className='mx-2'>Exit Full Screen</span> <AiOutlineFullscreenExit size={20}/></div>
              :
              <div className='flex items-center font-semibold'><span className='mx-2'>Mode Full Screen</span> <AiOutlineFullscreen size={20}/></div>
            }
            </button>
        </div>

        <div className="text-white text-3xl font-semibold text-center pt-2 pb-8">
          Predicted segmentation:
        </div>
      </div>
      
      <div className='rootController'>

      </div>
      { isPredicted ? <div id="vtk-container" className="w-full mb-8"></div> : <div id="vtk-container" style={{display: 'none'}}></div> }

      { isPredicted ? 
        <div className='flex justify-center pb-12 mb-24'>
          <button 
                onClick={hanldeDownloadVtpFile} 
                className="bg-slate-100 font-semibold text-slate-800 py-4 px-8 hover:bg-slate-600 hover:text-white leading-tight rounded-lg transition ease-linear"
              >
                <div className='flex items-center'>
                  <FaDownload className="mx-2"/>
                  <span className='mx-1'>Download Predicted File</span>
                </div>
          </button> 
        </div> : "" }
    </>
  );
}

export default VTKViewer;