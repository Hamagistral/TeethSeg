import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	TwitterAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDn0wcIHv7vkn-AgWpgF0cWLD9dUoZnKrU",
	authDomain: "teethseg-845e7.firebaseapp.com",
	projectId: "teethseg-845e7",
	storageBucket: "teethseg-845e7.appspot.com",
	messagingSenderId: "112871786106",
	appId: "1:112871786106:web:ffed1300e95d6b1ce3ddc3",
	measurementId: "G-NCXRS337RC",
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
