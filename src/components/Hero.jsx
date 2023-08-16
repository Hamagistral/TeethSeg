import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Teeths from "./Teeth";


function Hero() {
    const navigate = useNavigate();

    return (
        <>
            <section className="bg-slate-800 w-full">
                <div className="grid max-w-screen-xl px-4 py-8 mt-32 mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl pb-6 font-extrabold text-transparent sm:text-5xl">TeethSeg</h1>
                        <p className="max-w-2xl mb-6 font-light pb-3 text-slate-300 lg:mb-8 md:text-lg lg:text-xl">The best of automated end-to-end 3D file segmentation approch. Your 3D models, well used, will allow us to do great things, let us take care of it.</p>
                        <a href="#" onClick={() => navigate("/start")} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-primary-300">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="#demo" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white/75 border rounded-lg focus:ring-4 focus:ring-gray-100  border-white/75 hover:bg-slate-700 dark:focus:ring-gray-800">
                            <Play className="w-3 h-3 mr-2"/>
                            See Demo
                        </a> 
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Canvas className="h-full w-full">
                            <Stage environment="city" intensity={0.6}>
                                <Teeths />
                            </Stage>
                            <OrbitControls autoRotate="true" rotation={[10,0,0]}/>
                        </Canvas>
                    </div>                
                </div>
            </section>
            
            <section id="demo" className="bg-slate-800 w-full">
                <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto text-center">
                        <h2 className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl pb-14">Demo</h2>
                        <iframe width="960" height="540" src="https://www.youtube.com/embed/0G8QvDTE9Gc" title="Demo TeethSeg" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen className="rounded-lg"></iframe>
                    </div>
                </div>
            </section>



            {/* <div className="text-center h-screen overflow-hidden bg-cover bg-no-repeat w-full py-10 flex-box flex-col scroll-smooth home">
                <div
                className="h-full w-full overflow-hidden bg-fixed"
                >
                <div className="flex h-full items-center justify-center">
                    <div className="px-6 text-center text-white md:px-12">
                    <h1 className="mb-6 text-5xl font-bold">TeethSeg</h1>
                    <h3 className="mb-8 text-3xl font-bold">The best of automated end-to-end 3D file segmentation approch. Your 3D models, well used, will allow us to do great things, let us take care of it.</h3>
                    <button
                        type="button"
                        className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={() => navigate("/start")} 
                    >
                        Get started
                    </button>
                    </div>
                </div>
                </div>
            </div> */}
        </>
    );
}

export default Hero;