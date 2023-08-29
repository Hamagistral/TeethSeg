import { Contact, HelpCircle, Home, Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { cn } from "@/lib/utils";

function MenuItems() {
	const navigate = useNavigate();
	const location = useLocation()
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
			<div onClick={() => navigate("/")} className={cn("menu-item", location.pathname === '/' ? "bg-white text-slate-900 font-semibold" : "bg-slate-900")}>
				<Home />
				<span className="px-2">Home</span>
			</div>
			<div onClick={() => navigate("/faq")} className={cn("menu-item", location.pathname === '/faq' ? "bg-white text-slate-900 font-semibold" : "bg-slate-900")}>
				<HelpCircle />
				<span className="px-2">FAQ</span>
			</div>
			{ user ? (
				<div onClick={() => navigate("/start")} className={cn("menu-item", location.pathname === '/start' ? "bg-white text-slate-900 font-semibold" : "bg-slate-900")}>
					<Play />
					<span className="px-2">Start</span>
				</div>
			) : (
				<></>
			)}

			<div onClick={() => navigate("/about")} className={cn("menu-item", location.pathname === '/about' ? "bg-white text-slate-900 font-semibold" : "bg-slate-900")}>
				<Info />
				<span className="px-2">About</span>
			</div>
			<div onClick={() => navigate("/contact")} className={cn("menu-item", location.pathname === '/contact' ? "bg-white text-slate-900 font-semibold" : "bg-slate-900")}>
				<Contact />
				<span className="px-2">Contact</span>
			</div>
		</div>
	);
}

export default MenuItems;
