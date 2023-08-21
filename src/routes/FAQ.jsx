import Footer from "../components/Footer";
import Header from "./../components/Header";
import { useState } from "react";
import { faq } from "../data";

function Faq() {
  const [faqs, setFaqs] = useState(faq);
  const toggleFAQ = (index) => {
    const newFaqs = [...faqs];
    newFaqs[index].show = !newFaqs[index].show;
    setFaqs(newFaqs);
  };
  return (
    <div className="flex-box flex-col">
      <Header />
      <div className="text-center text-white w-full py-10 flex-box flex-col scroll-smooth bg-slate-800">

        <div className="w-full flex-box flex-col">
          <div className="text-center w-full scroll-smooth">

            <div className="w-full flex-box flex-col py-20 ">
              <h1 className="text-2xl font-semibold mb-6 text-white">
                Frequently Asked Questions
              </h1>
              <div className="text-center py-10 w-full">


                <div className=" w-full flex justify-center items-start gap-10 flex-wrap">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`bg-white p-4 rounded-lg shadow-md transition-all text-black w-[30%] }`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex-box w-full focus:outline-none"
                      >
                        <span className="font-medium">{faq.question}</span>
                        <i
                          className={`fas fa-chevron-down d-arrow transform transition-transform ${faq.show ? "rotate-180" : "rotate-0"
                            }`}
                        ></i>
                      </button>
                      <p
                        className={`mt-2 overflow-hidden ${faq.show ? "opacity-100" : "opacity-0 max-h-0"
                          }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Faq;
