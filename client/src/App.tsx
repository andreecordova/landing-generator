import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingGenerator from "./pages/LandingGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<LandingGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
