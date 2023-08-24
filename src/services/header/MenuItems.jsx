import { Contact, HelpCircle, Home, Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

function MenuItems() {
	// const navigate = useNavigate();
	// const [first, setfirst] = useState("");

	// useEffect(() => {
	// 	return () => {
	// 		<div onClick={() => navigate("/start")} className="menu-item">
	// 			<Play />
	// 			<span className="px-2">Start</span>
	// 		</div>;
	// 	};
	// }, []);
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

	return (
		<div className="flex p-5 sm:flex-row flex-col">
			<div onClick={() => navigate("/")} className="menu-item">
				<Home />
				<span className="px-2">Home</span>
			</div>
			<div onClick={() => navigate("/faq")} className="menu-item">
				<HelpCircle />
				<span className="px-2">FAQ</span>
			</div>
			{ user ? (
				<div onClick={() => navigate("/start")} className="menu-item">
					<Play />
					<span className="px-2">Start</span>
				</div>
			) : (
				<></>
			)}
			{/* <div onClick={() => navigate("/about")} className="menu-item"> */}

			<div onClick={() => navigate("/about")} className="menu-item">
				<Info />
				<span className="px-2">About</span>
			</div>
			<div onClick={() => navigate("/contact")} className="menu-item">
				<Contact />
				<span className="px-2">Contact</span>
			</div>
		</div>
	);
}

export default MenuItems;
