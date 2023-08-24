import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Main from "./../components/Main";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

function Start() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				navigate("/start");
			} else {
				setUser(null);
				navigate("/sign-in");
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className="flex-box flex-col">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default Start;
