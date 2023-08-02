import MenuItems from "../services/header/MenuItems";
import Logo from "../services/header/Logo";
import Contact from "../services/header/Contact";

import "../styles/Header.css";

function Header() {
  return (
    <div className="header flex-box px-2 justify-around flex-col md:flex-row w-full h-full py-5 bg-gray-950 text-center">
      <Logo />
      <MenuItems />
      <Contact />
    </div>
  );
}

export default Header;
