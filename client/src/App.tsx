import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingGenerator from "./pages/LandingGenerator";
import PostGenerator from "./pages/PostGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<LandingGenerator />} />
        <Route path="/post-generator" element={<PostGenerator />} />

      </Routes>
    </Router>
  );
}

export default App;
