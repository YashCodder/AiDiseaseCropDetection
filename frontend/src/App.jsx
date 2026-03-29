import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import Prediction from "./pages/Prediction";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="app">

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">AgroAI 🌾</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/prediction">Prediction</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* ROUTES */}
        <Routes>

          {/* HOME PAGE (Hero only) */}
          <Route
            path="/"
            element={
              <section className="hero">
                <div className="overlay">
                  <div className="hero-content">
                    <h1>Smart Crop Disease Prediction</h1>
                    <p>
                      AI-powered early detection system to protect your crops
                      and increase yield using soil and environmental data.
                    </p>
                  </div>
                </div>
              </section>
            }
          />

          {/* PREDICTION PAGE */}
          <Route path="/prediction" element={<Prediction />} />

          {/* ABOUT PAGE */}
          <Route path="/about" element={<About />} />

        </Routes>

        {/* FOOTER */}
        <footer className="footer">
          © 2026 AgroAI | Smart Farming with AI 🌱
        </footer>

      </div>
    </Router>
  );
}

export default App;