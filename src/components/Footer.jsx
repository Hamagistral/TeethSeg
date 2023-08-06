import BotFooter from "../services/footer/BotFooter";

function Footer() {
  return (
    <div className="w-full h-full px-5 py-5 flex-box flex-col bg-gray-950 scroll-smooth text-center">
      <div className="w-full h-px border border-neutral-200"></div>
      <BotFooter />
    </div>
  );
}

export default Footer;
