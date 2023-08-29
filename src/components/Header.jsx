import MenuItems from "../services/header/MenuItems";
import Logo from "../services/header/Logo";
import Sign from "../services/header/Sign";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header flex-box lg:h-full h-24 justify-between w-full px-8 lg:px-72 bg-slate-900 text-center">
      <div className="header fixed-top flex-box justify-between w-full py-2 bg-slate-900 text-center">
        <Logo />
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <Sign />
        </div>
        <div
          className="text-white border p-2 rounded-md hover:text-slate-900 hover:bg-white cursor-pointer block lg:hidden"
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          <Menu />
          <div className="absolute top-20 left-0 bg-slate-900 flex-box flex-col pb-8 w-full z-[100]">
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
    </div>
  );
}

export default Header;
