import "./App.css";
import BannerGuider from "./components/BannerGuider.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/browse/" element={<Home />} />
          <Route exact path="/browse/:placeId" element={<Home />} />
          <Route path="/banner/:bannerId" element={<Home />} />
          <Route path="/bannerguider/:bannerId" element={<BannerGuider />} />
          <Route path="/search/:query" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
