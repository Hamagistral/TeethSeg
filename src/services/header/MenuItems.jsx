import { Contact, HelpCircle, Home, Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MenuItems() {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
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
=======
    <>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 ">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white font-bold" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">Why TeethSeg</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">Start TeethSeg</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">About Us</a>
            </li>
          </ul>
      </div>
    </>
>>>>>>> bf3c2ee7c321a937b5894f5690e92cb7596d1a2f
  );
}

export default MenuItems;
