import ContactForm from "../components/ContactForm";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Faq from "../components/FAQ";

function Home() {

  return (
    <>
      <Header />
      <div className="w-full flex flex-col">
        <Hero />
        <Features />
        <Faq />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}

export default Home;
