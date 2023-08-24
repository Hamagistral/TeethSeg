import "../styles/Main.css";
import VTKViewer from "../services/main/Upload";

function Main() {

  return (
    <div className="text-center w-full h-full flex-box flex-col scroll-smooth bg-slate-800 lg:px-64 px-12">
      <VTKViewer />
    </div>
  );
}

export default Main;
