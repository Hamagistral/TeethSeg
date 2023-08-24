import { useNavigate } from "react-router-dom";

import SignInWithGoogleButton from "../components/shared/SignInWithGoogleButton.jsx";
import SignInWithXButton from "../components/shared/SignInWithXButton.jsx";
import SignInWithGithubButton from "../components/shared/SignInWithGithubButton";

import { provider } from "../config/firebase";

import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	TwitterAuthProvider,
} from "firebase/auth";

const Oauth = ({ auth }) => {
	const navigate = useNavigate();

	const handleGoogleSingIn = async () => {
		await signInWithPopup(auth, provider["google.com"])
			.then((result) => {
			
				navigate("/start");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential =
					GoogleAuthProvider.credentialFromError(error);
			});
	};

	const handleGithubSingIn = async () => {
		await signInWithPopup(auth, provider["github.com"])
			.then((result) => {
			
				navigate("/start");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential =
					GithubAuthProvider.credentialFromError(error);
			});
	};

	const handleXSingIn = async () => {
		await signInWithPopup(auth, provider["twitter.com"])
			.then((result) => {
	
				navigate("/start");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential =
					TwitterAuthProvider.credentialFromError(error);
			});
	};

	return (
		<div className="flex justify-center">
			<SignInWithGoogleButton handle={handleGoogleSingIn} />

			<SignInWithGithubButton handle={handleGithubSingIn} />

{/* 			<SignInWithXButton handle={handleXSingIn} /> */}
		</div>
	);
};

export default Oauth;
