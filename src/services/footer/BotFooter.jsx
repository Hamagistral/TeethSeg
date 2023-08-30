import Logo from "./../header/Logo";
import Copyright from "./Copyright";
import Social from "./Social";

function BotFooter() {
  return (
    <div className="bottom-footer w-full flex-box justify-around flex-col lg:flex-row flex-end lg:px-28">
      <Logo />
      <Copyright />
      <Social />
    </div>
  );
}

export default BotFooter;
