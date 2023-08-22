import { Play } from "lucide-react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, Html, useProgress } from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
// import Teeths from "./Teeth";

function Hero() {
    const navigate = useNavigate();

    function Scene() {
        const teeth = useLoader(OBJLoader, "/teethsObj.obj");
        return <primitive object={teeth} />;
    }

    function Loader() {
        const { progress } = useProgress();
        return <Html center>{progress} % loaded</Html>;
    }

    return (
        <>
            <div className="bg-slate-800">
                <div className="grid max-w-screen-xl px-4 py-8 mt-12 mb-12 flex-box flex-row md:flex-col mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl pb-6 font-extrabold text-transparent sm:text-5xl">
                            TeethSeg
                        </h1>
                        <p className="max-w-2xl mb-6 font-light pb-3 text-slate-300 lg:mb-8 md:text-lg lg:text-xl">
                            The best of automated end-to-end 3D file segmentation approch.
                            Your 3D models, well used, will allow us to do great things, let
                            us take care of it.
                        </p>
                        <a
                            onClick={() => navigate("/sign-in")}
                            className="cursor-pointer inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-primary-300"
                        >
                            Get started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="#demo"
                            className="cursor-pointer inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white/75 border rounded-lg focus:ring-4 focus:ring-gray-100  border-white/75 hover:bg-slate-700 dark:focus:ring-gray-800"
                        >
                            <Play className="w-3 h-3 mr-2" fill="currentColor" />
                            See Demo
                        </a>
                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex">
                        <Canvas className="h-full w-full" shadows>
                            <Suspense fallback={<Loader />}>
                                <Stage environment="city" intensity={1}>
                                    <directionalLight intensity="2" castShadow />
                                    <Scene />
                                </Stage>
                                <OrbitControls autoRotate="true" rotation={[10, 0, 0]} />
                            </Suspense>
                        </Canvas>
                        {/* <Canvas className="h-full w-full"> */}
                        {/* <Stage environment="city" intensity={0.6}>
              <Teeths />
            </Stage>
            <OrbitControls autoRotate="true" rotation={[10, 0, 0]} />
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Canvas className="h-full w-full" shadows>
                <Suspense fallback={<Loader />}>
                  <Stage environment="city" intensity={1}>
                    <directionalLight intensity="2" castShadow />
                    <Scene />
                  </Stage>
                  <OrbitControls autoRotate="true" rotation={[10, 0, 0]} />
                </Suspense>
              </Canvas>
            </div> */}
                        {/* </Canvas> */}
                    </div>
                </div>
            </div>

            <div id="demo" className="bg-slate-800 w-full">
                <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto text-center w-full">
                        <h2 className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl pb-14">
                            Demo
                        </h2>
                        <iframe
                            height="540"
                            src="https://www.youtube.com/embed/0G8QvDTE9Gc"
                            title="Demo TeethSeg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="md:w-content w-full rounded-lg"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* <div id="demo" className="px-10 pb-20 bg-slate-800">
                <h2 className="text-center text-4xl text-white font-extrabold mb-14">Demo</h2>
                <div className="video-container">
                    <iframe
                        width="1280"
                        height="720"
                        src="https://www.youtube.com/embed/0G8QvDTE9Gc"
                        title="YouTube video player"
                        className="rounded-xl col-span-8 lg:col-span-12"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div> */}
        </>
    );
}

export default Hero;
