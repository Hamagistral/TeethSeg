import { UploadCloud } from "lucide-react";
import { useState } from "react";

function Upload() {
  const [file, setFile] = useState();
  const [three, setThree] = useState("");

  // const fileName = files ? files.name : "File Uploaded";
  const fileName = "File Uploaded! Double Click To View";
  const chooseFile = document.getElementById("3d_file");
  const imgPreview = document.getElementById("img-preview");


  const generateModel = (e) => {
    e.preventDefault();
    setThree(fileName);
    getImgData();
    
  };



  function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
      });
    }
  }

  return (
    <div className="bg-gray-700 w-full px-10 py-10 rounded-md">
      <div className="w-full py-2 file flex-box flex-col">
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
          accept="image/*"
          // ref={model}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setThree(e.target.files[0].name);
          }}
          id="3d_file"
        />
        <div onClick={generateModel} className="fileName text-white">
          <p>{three}</p>
        </div>
      </div>
      <div className="py-2">
        <div className="text-center text-gray-400 text-xl font-bold">
          Supported files
        </div>
        <div className="text-center text-zinc-300 text-xl font-medium py-3">
          OBJ, STL, PLY, VTP, GLB, GLTG, FBX
        </div>
      </div>
      <div id="img-preview"></div>
    </div>
  );
}

export default Upload;
