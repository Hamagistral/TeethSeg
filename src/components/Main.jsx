import Output from "../services/main/Output";
import "../styles/Main.css";
import Order from "../services/main/Order";
import Upload from "../services/main/Upload";
import { useState } from "react";


function Main() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const img = document.querySelector(".img");
  function displayImage() {
    if (img) {
      img.classList.remove("hide");
      img.classList.add("block");
    }
  }
  const model = "Predict Model";

  const update = async (e) => {
    e.preventDefault();
    // console.log("You clicked update button.");
    setLoading(true);
    displayImage();
    setImage("initial3Dfile.png");
    setLoading(false);
  };

  return (
    <div className="text-center lg:h-screen w-full py-10 flex-box flex-col scroll-smooth bg-slate-800">
      <Order />
      <div id="file" className="flex-box w-9/12 my-6" onDoubleClickCapture={update}>
        <Upload />
      </div>
      <div className="img hide w-full flex-box">
        {loading ? (
          "loading..."
        ) : (
          <div className="flex-box flex-col">
            {/* <img className="rounded" src={image} /> */}
            <Output response={model} />
          </div>
        )}
      </div>
      <div className="w-96">
        {/* <Spline scene="https://prod.spline.design/eyJf8UqWFNRPTW40/scene.splinecode"/> */}
      </div>
    </div>
  );
}

export default Main;
