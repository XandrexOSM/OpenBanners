import "./App.css";
import Map from "./components/Map.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banner" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
