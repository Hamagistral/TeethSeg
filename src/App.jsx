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
import { Bot } from "lucide-react";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";


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
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: "20px",
        zIndex: 1,
      }}
    >
      <Bot
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/chatbot")}
        className="bg-white rounded-full w-[50px] h-[50px] p-1 border  border-white"
      />
    </div>
  );
}
export default App;
