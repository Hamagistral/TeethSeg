import { Contact, HelpCircle, Home, Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MenuItems() {
  const navigate = useNavigate();

  return (
    <div className="flex p-5 sm:flex-row flex-col">
      <div onClick={() => navigate("/")} className="menu-item">
        <Home />
        Home
      </div>
      <div onClick={() => navigate("/faq")} className="menu-item">
        <HelpCircle />
        FAQ
      </div>
      <div onClick={() => navigate("/start")} className="menu-item">
        <Play />
        Start
      </div>
      <div onClick={() => navigate("/about")} className="menu-item">
        <Info />
        About
      </div>
      <div onClick={() => navigate("/contact")} className="menu-item">
        <Contact />
        Contact
      </div>
    </div>
  );
}

export default MenuItems;
