import { LogIn, LogOut } from "lucide-react";
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
					<div className="px-6 py-3 transition ease-linear  bg-opacity-25 rounded-lg justify-start items-start gap-2.5 inline-flex hover:bg-foreground hover:text-background text-background bg-foreground/90">
						<div className="flex-box text-base font-semibold leading-tight">
							Sign In &nbsp;
							<LogIn />
						</div>
					</div>
				</div>
			) : (
				<>	
					<div
					onClick={() => handleLogOut()}
					className="flex-box w-40 h-12 cursor-pointer uppercase text-center"
					>
						<div className="px-6 py-3 transition ease-linear text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl rounded-lg">
							<div className="flex-box text-base font-semibold leading-tight">
								Log Out &nbsp;
								<LogOut />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Sign;
