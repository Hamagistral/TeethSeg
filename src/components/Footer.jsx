
import TopFooter from './../services/footer/TopFooter';
import BotFooter from "../services/footer/BotFooter";

function Footer() {
  return (
    <div className="w-full h-full px-5 py-5 flex-box flex-col bg-slate-900 scroll-smooth text-center">
      <TopFooter />
      <div className="w-full h-px border border-neutral-200"></div>
      <BotFooter />
    </div>
  );
}

export default Footer;
