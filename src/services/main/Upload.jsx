import { FileAxis3d, UploadCloud } from "lucide-react";
import { useState } from "react";

function Upload() {
  const [file, setFile] = useState();
  const [three, setThree] = useState("");

  // const fileName = files ? files.name : "File Uploaded";
  const fileName = "File Uploaded! Double Click To View";

  const generateModel = (e) => {
    e.preventDefault();
    setThree(fileName);
  };

  return (
    <>
    <div className="bg-slate-700 flex-box flex-col md:flex-row w-full px-10 rounded-md">
      <div className="w-full py-12 file flex-box flex-col">
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
          // ref={model}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setThree(e.target.files[0].name);
          }}
          id="3d_file"
        />
        <div onClick={generateModel} className="fileName text-white">
          <p className="bg-slate-800 py-4 px-8 rounded-xl font-normal text-slate-300"><FileAxis3d width={18} style={{display: 'inline-block'}}/> Uploaded file: <span className="font-semibold text-white">{three ? three : "None"}</span></p>
        </div>
        <div className="text-center pt-8 text-slate-100 text-xl font-semibold">
          Supported files
        </div>
        <div className="text-center text-slate-300 text-md py-3">
          OBJ, STL, PLY, VTP, GLB, GLTG, FBX
        </div>
      </div>
    </div>
  </>
    
  );
}

export default Upload;
