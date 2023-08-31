import ContactForm from "../components/ContactForm";
import Header from "../components/Header";
import Footer from "./../components/Footer";
import TopFooter from './../services/contact/TopFooter';

function Contact() {
  return (
    <div className="flex-box flex-col w-full h-full flex-box bg-primary-background scroll-smooth text-center">
      <Header />
      <ContactForm />
      <TopFooter />
      <Footer />
    </div>
  );  
}

export default Contact;
