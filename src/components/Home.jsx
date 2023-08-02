import { useState } from "react";
import Output from "../services/home/Output";
import "../styles/Home.css";

function Home() {
  const [files, setFile] = useState();
  const [model, setModel] = useState("");
  // const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Display Model
  const displayModel = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fileName = files ? files.name : "File Uploaded"; 
    const loadModel = loading ? "Loading..." : "Prediction:";
    setLoading(loadModel)

    setModel(fileName);

    const model = "whisper-1";
    const formData = new FormData();
    formData.append("model", model);
    formData.append("file", files);

    // communicate with API server
    // axios
    //   .post("https://api.openai.com/v1/model/", formData, {
    //     headers: {
    //       Authorization: "Bearer " + apiKey,
    //       "OpenAI-Organization": orgKey,
    //       "Content-Type": `multipart/form-data: boundary=${formData._boundary}`,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res.data)
    //     setOutput(res.data.text);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="w-full py-10 flex-box flex-col scroll-smooth bg-gray-900">
      <div className="text-white text-3xl font-semibold pb-10 text-center">
        Please choose a file to upload to start the prediction
      </div>
      <div className="bg-gray-700 w-5/6 px-20 py-20 rounded-md">
        <div className="w-full file flex-box flex-col">
          <label htmlFor="3d" className="p-10 my-auto mx-32 text-center">
            Click to upload or drag and drop
          </label>
          <input
            className="ipt prompt"
            type="file"
            name="3d-file"
            // ref={model}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setModel(e.target.files[0].name);
            }}
            id="3d"
          />
          <div className="w-full modelName py-10">
          {loading ? "Loading..." : <Output response={model} />}
            
          </div>
          <div className="w-full py-10 flex-box justify-evenly">
            <button
              type="submit"
              className="px-10 py-3.5 bg-gray-400 bg-opacity-25  text-center text-white text-base font-semibold leading-tight mx-2 rounded-lg"
              onClick={displayModel}
            >
              Display Model
            </button>
            <button
              type="submit"
              className="px-10 py-3.5 bg-gray-400 bg-opacity-25  text-center text-white text-base font-semibold leading-tight mx-2 rounded-lg"
              // onClick={predict}
            >
              Predict Model
            </button>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xl font-bold">
          Supported files
        </div>
        <div className="text-center text-zinc-300 text-xl font-medium py-10">
          OBJ, STL, PLY, VTP, GLB, GLTG, FBX
        </div>
      </div>
    </div>
  );
}

export default Home;
