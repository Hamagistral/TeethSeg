import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase.js";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";

function Sign() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const handleLogOut = async () => {
		const currentProvider = user.providerData[0].providerId;

		await signOut(auth, provider[currentProvider])
			.then(() => {
				console.log("sad to see you go :(");

				const user = auth.currentUser;
				console.log(user);
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	return (
		<>
			{!user ? (
				<div
					onClick={() => navigate("/sign-in")}
					className="flex-box w-40 h-12 cursor-pointer uppercase text-center"
				>
					<div className="px-6 py-3 transition ease-linear   bg-opacity-25 rounded-lg justify-start items-start gap-2.5 inline-flex hover:bg-foreground hover:text-background text-foreground bg-background">
						<div className="flex-box text-base font-semibold leading-tight">
							Sign In &nbsp;
							<LogIn />
						</div>
					</div>
				</div>
			) : (
				<>
					<button
						className="relative inline-flex items-center justify-center mb-2 mr-2 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-green-400 group-hover:from-blue-500 group-hover:to-gren-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 hover:shadow-lg  hover:scale-105 transition-all duration-300 ease-in-out"
						onClick={() => handleLogOut()}
					>
						<span className="flex-box text-base font-semibold  transition ease-linear leading-tight relative px-6 py-3 bg-background text-foreground rounded items-start gap-3 group-hover:bg-opacity-0 whitespace-nowrap">
							Log Out
						</span>
					</button>
				</>
			)}
		</>
	);
}

export default Sign;
