import BotFooter from "../services/footer/BotFooter";

function Footer() {
  return (
    <div className="footer w-full bottom-0 px-5 py-10 flex-box flex-col bg-background text-foreground scroll-smooth text-center">
      <BotFooter />
    </div>
  );
}

export default Footer;
