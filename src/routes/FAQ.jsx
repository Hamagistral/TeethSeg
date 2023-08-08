import Footer from "../components/Footer";
import Header from "./../components/Header";

function Faq() {
  return (
    <div className="flex-box flex-col">
      <Header />
      <div className="text-center text-white h-screen  w-full py-10 flex-box flex-col scroll-smooth bg-slate-800">
        <h1>Frequently Asked Questions</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Faq;
