import MenuItems from "../services/header/MenuItems";
import Logo from "../services/header/Logo";
import Sign from "../services/header/Sign";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header flex-box lg:h-full h-24 justify-between w-full px-8 lg:px-72 text-center bg-background text-foreground">
      <div className="header fixed-top flex-box justify-between w-full py-2 bg-background text-foreground text-center">
        <Logo />
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <Sign />
        </div>
        <ModeToggle />
        <div
          className="bg-background text-foreground border p-2 rounded-md hover:text-background hover:bg-foreground cursor-pointer block lg:hidden"
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          <Menu />
          <div className="bg-background text-foreground  absolute top-20 left-0 flex-box flex-col pb-8 w-full z-90">
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
