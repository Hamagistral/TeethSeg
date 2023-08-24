import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	TwitterAuthProvider,
} from "firebase/auth";

// console.log(import.meta.env.VITE_API_KEY);

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "teethsegmentation-42aaa.firebaseapp.com",
	projectId: "teethsegmentation-42aaa",
	storageBucket: "teethsegmentation-42aaa.appspot.com",
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = {
	"google.com": googleProvider,
	"github.com": githubProvider,
	"twitter.com": twitterProvider,
};
