import Team from "../services/about/Team";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Supervisors from "../services/about/Supervisors";

function About() {
  return (
    <div className="flex-box flex-col">
      <Header />
      <div className="text-center text-white h-full w-full py-10 flex-box flex-col scroll-smooth bg-slate-800">
        <h1 className="mb-8 mt-12 text-5xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent pb-4t">About Us</h1>
        <Team />
        <Supervisors />
      </div>
      <Footer />
    </div>
  );
}

export default About;
