import Team from "../services/about/Team";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Supervisors from "../services/about/Supervisors";

function About() {
  return (
    <div className="flex-box flex-col">
      <Header />
      <div className="text-center text-white h-full w-full py-10 flex-box flex-col scroll-smooth bg-slate-800">
        <h1 className="text-white text-5xl pt-12 pb-4 font-extrabold sm:text-5xl">About us</h1>
        <Team />
        <Supervisors />
      </div>
      <Footer />
    </div>
  );
}

export default About;
