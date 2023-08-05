import Logo from "../services/header/Logo";
import MenuItems from "../services/header/MenuItems";
import MobileMenu from "../services/header/MobileMenu";

import "../styles/Header.css";

function Header() {
  return (
    <>
      <nav className="bg-slate-900 w-full z-20 top-0 left-0 border-b border-slate-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo />
          <MobileMenu />
          <MenuItems />
        </div>
      </nav>
    </>
  );
}

export default Header;
