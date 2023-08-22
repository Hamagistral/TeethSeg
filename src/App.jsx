import "./styles/App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Faq from "./routes/FAQ";
import Start from "./routes/Start";
import About from "./routes/About";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Contact from "./routes/Contact";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
