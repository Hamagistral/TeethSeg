import Logo from "./../header/Logo";
import Copyright from "./Copyright";
import Social from "./Social";

function BotFooter() {
  return (
    <div className="bottom-footer w-full pt-12 flex-box justify-around flex-col md:flex-row flex-end">
      <Logo />
      <Copyright />
      <Social />
    </div>
  );
}

export default BotFooter;
