import "../styles/Main.css";
import VTKViewer from "../services/main/Upload";

function Main() {

  return (
    <div className="text-center w-full py-24 flex-box flex-col scroll-smooth bg-slate-800">
      <div className="text-white p-12 text-3xl font-semibold  text-center">
        Please choose a file to upload to start the prediction
      </div>
      
      <VTKViewer />
      
    </div>
  );
}

export default Main;
