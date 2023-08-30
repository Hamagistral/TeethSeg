import { Contact, HelpCircle, Home, Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { cn } from "@/lib/utils";

function MenuItems() {
	const navigate = useNavigate();
	const location = useLocation();
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
			<div
				onClick={() => navigate("/")}
				className={cn(
					"menu-item",
					location.pathname === "/"
						? "bg-foreground text-background  hover:bg-background hover:text-foreground font-semibold"
						: "hover:bg-foreground hover:text-background  bg-background text-foreground"
				)}
			>
				<Home />
				<span className="px-2">Home</span>
			</div>
			<div
				onClick={() => navigate("/faq")}
				className={cn(
					"menu-item",
					location.pathname === "/faq"
						? "bg-foreground text-background font-semibold hover:text-foreground"
						: "hover:bg-foreground hover:text-background  bg-background text-foreground"
				)}
			>
				<HelpCircle />
				<span className="px-2">FAQ</span>
			</div>
			{user ? (
				<div
					onClick={() => navigate("/start")}
					className={cn(
						"menu-item",
						location.pathname === "/start"
							? "bg-foreground text-background hover:text-foreground font-semibold"
							: "hover:bg-foreground hover:text-background  bg-background text-foreground"
					)}
				>
					<Play />
					<span className="px-2">Start</span>
				</div>
			) : (
				<></>
			)}

			<div
				onClick={() => navigate("/about")}
				className={cn(
					"menu-item",
					location.pathname === "/about"
						? "bg-foreground text-background hover:text-foreground font-semibold"
						: "hover:bg-foreground hover:text-background  bg-background text-foreground"
				)}
			>
				<Info />
				<span className="px-2">About</span>
			</div>
			<div
				onClick={() => navigate("/contact")}
				className={cn(
					"menu-item",
					location.pathname === "/contact"
						? "bg-foreground text-background hover:text-foreground font-semibold"
						: "hover:bg-foreground hover:text-background  bg-background text-foreground"
				)}
			>
				<Contact />
				<span className="px-2">Contact</span>
			</div>
		</div>
	);
}

export default MenuItems;
