import "./styles/App.css";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import Faq from "./routes/FAQ";
import Start from "./routes/Start";
import About from "./routes/About";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Contact from "./routes/Contact";
import Chatbot from "./routes/Chatbot";
import { MessageSquare, X } from "lucide-react";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import ChatBot from "./routes/Chatbot";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/faq" element={<Faq />} />

        <Route path="/start" element={<Start />} />

        <Route path="/about" element={<About />} />

        <Route path="/sign-in" element={<SignIn />} />

        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      {user ? (
        <NavigateToChatbotButton />
      ) : (
        <></>
      )}
    </Router>
  );
}

function NavigateToChatbotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatIconClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: "20px",
        zIndex: 1,
      }}
      className="p-4"
    >
      <div className="flex justify-end fixed bottom-4 right-4">
        <div
          onClick={handleChatIconClick}
          style={{ cursor: "pointer" }}
        >
          {!isChatOpen ? <MessageSquare className="bg-blue-500 hover:bg-blue-600 rounded-full w-[60px] h-[60px] p-3 text-white border-2 border-white fill-white" /> : 
          <X className="bg-blue-500 hover:bg-blue-600 rounded-full w-[60px] h-[60px] p-3 text-white border-2 border-white fill-white" /> }
        </div>
        {isChatOpen && <ChatBot />}
      </div>
    </div>
  );
}
export default App;
