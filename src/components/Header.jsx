import MenuItems from "../services/header/MenuItems";
import Logo from "../services/header/Logo";
import Contact from "../services/header/Contact";

import "../styles/Header.css";

function Header() {
  return (
    <div className="header h-24 bg-gray-950">
      <Logo />
      <MenuItems />
      <Contact />
    </div>
  );
}

export default Header;
