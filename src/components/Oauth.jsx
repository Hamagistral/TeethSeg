import { useNavigate } from "react-router-dom";

import SignInWithGoogleButton from "../components/shared/SignInWithGoogleButton.jsx";
import SignInWithXButton from "../components/shared/SignInWithXButton.jsx";
import SignInWithGithubButton from "../components/shared/SignInWithGithubButton";

import { provider, auth } from "../config/firebase";

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
				// const credential =
				// 	GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				// const user = result.user;
				// console.log(token);
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
				// const credential =
				// 	GithubAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				// const user = result.user;
				// console.log(token);
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
				// const credential =
				// 	TwitterAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				// const secret = credential.secret;
				// const user = result.user;
				// console.log(token, secret, user);
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

			{/* <SignInWithXButton handle={handleXSingIn} /> */}
		</div>
	);
};

export default Oauth;
