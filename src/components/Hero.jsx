import { Play } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadVTP } from "../helpers/helpers";

import TypewriterComponent from "typewriter-effect";
import { getAuth } from "firebase/auth";

import {useTheme} from './ThemeProvider'

function Hero(){
	const navigate = useNavigate();
    const currentTheme = useTheme()
	const auth = getAuth();
	const user = auth.currentUser;

	const handleStart = () => {
		if (!user) {
			navigate("/sign-in");
		} else {
			navigate("/start");
		}
	};

	useEffect(() => {

        if(currentTheme.theme == "light"){
            loadVTP("/TeethsSegmented.vtp", "Label", [0.796, 0.835, 0.882]);
        }else{
            loadVTP("/TeethsSegmented.vtp", "Label", [0.117, 0.160, 0.231]);
        }
	}, [currentTheme]);

	return (
		<>
			<div className="bg-primary-background">
				<div className="grid max-w-screen-xl py-8 mb-12 px-4 lg:px-0 flex-box flex-row md:flex-col mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent text-5xl pb-6 font-extrabold sm:text-5xl">
							TeethSeg
						</h1>
						<p className="max-w-2xl mb-6  font-light pb-3 text-primary lg:mb-8 md:text-lg lg:text-xl">
							Say goodbye to manual teeth segmentation! Our
							AI-powered technology ensures precise and efficient
							dental care. Join the revolution and experience the
							future of oral health with TeethSeg.
						</p>
						<h2 className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-2xl pb-6 font-bold text-transparent lg:text-2xl">
							<TypewriterComponent
								options={{
									strings: [
										"#MeshSegNet",
										"#DentalTech",
										"#AITeethSegmentation",
									],
									autoStart: true,
									loop: true,
								}}
							/>
						</h2>
						<a
							onClick={handleStart}
							className="cursor-pointer inline-flex transition ease-linear items-center justify-center py-3 px-6 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700"
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
							className="bg-slate-100 font-semibold transition ease-linear text-slate-700 py-3 px-6 hover:bg-slate-300 rounded-lg cursor-pointer inline-flex items-center justify-center text-center"
						>
							<Play
								className="w-3 h-3 mr-2"
								fill="currentColor"
							/>
							See Demo
						</a>
					</div>
					<div
						id="teeth-segmented"
						className="place-self-center lg:mt-0 lg:col-span-5  lg:flex h-full"
					></div>
				</div>
			</div>

			<div id="demo" className="bg-primary-background w-full pt-12">
				<div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
					<div className="mx-auto text-center w-full">
						<h2 className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl pb-14">
							Demo
						</h2>
						<iframe
							height="720"
							src="https://www.youtube.com/embed/vv0G7nkHsVo?si=sXLYo7sRr3lQJs_F"
							title="Demo TeethSeg"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							className="lg:w-content w-full rounded-lg max-h-72 lg:max-h-screen shadow-lg shadow-teal-400/50 "
						></iframe>
					</div>
				</div>
			</div>
		</>
	);
}

export default Hero;
