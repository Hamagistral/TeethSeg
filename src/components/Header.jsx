import MenuItems from "../services/header/MenuItems";
import Logo from "../services/header/Logo";
import Sign from "../services/header/Sign";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header flex-box px-2 justify-between w-full py-5 bg-gray-950 text-center">
      <Logo />
      <div className="hidden sm:block">
        <MenuItems />
      </div>
      <div className="hidden sm:block">
        <Sign />
      </div>
      <div
        className="text-white border p-2 rounded-md hover:text-blue-950 hover:bg-white cursor-pointer block sm:hidden"
        onClick={() => {
          setMenuOpen((open) => !open);
        }}
      >
        <Menu />
        <div className="absolute top-20 left-0 bg-gray-950 flex-box flex-col pb-8 w-full">
          {menuOpen ? (
            <>
              {" "}
              <MenuItems /> <Sign />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
