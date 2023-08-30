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
					<div className="px-6 py-3 transition ease-linear bg-background text-foreground bg-slate-700 rounded-lg justify-start items-start gap-2.5 inline-flex hover:bg-slate-100 hover:text-slate-900">
						<div className="flex-box text-base font-semibold leading-tight">
							Sign In &nbsp;
							<LogIn />
						</div>
					</div>
				</div>
			) : (
				<>
					<button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-white"
					onClick={() => handleLogOut()}>
						<span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Log Out 
						</span>
					</button>
				</>
			)}
		</>
	);
}

export default Sign;
