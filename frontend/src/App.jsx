import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [soilData, setSoilData] = useState({
    temperature: "",
    humidity: "",
    ph: ""
  });

  const [result, setResult] = useState(null);

  const handleSoilSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:5000/soil", {
      temperature: Number(soilData.temperature),
      humidity: Number(soilData.humidity),
      ph: Number(soilData.ph)
    });

    setResult(res.data.result);
  } catch (err) {
    console.error(err);
    alert("Backend not connected");
  }
};

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">AgroAI 🌾</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Prediction</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* HERO SECTION */}
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

      {/* PREDICTION SECTION */}
      <section className="prediction-section">
        <div className="card">
          <h2>Check Disease Risk</h2>

          <div className="form-group">
            <input
              type="number"
              placeholder="Temperature (°C)"
              onChange={(e) =>
                setSoilData({ ...soilData, temperature: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Humidity (%)"
              onChange={(e) =>
                setSoilData({ ...soilData, humidity: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Soil pH"
              onChange={(e) =>
                setSoilData({ ...soilData, ph: e.target.value })
              }
            />
          </div>

          <button className="btn" onClick={handleSoilSubmit}>
            Predict Risk
          </button>

          {result && (
            <div className="result-box">
              <h3>Risk: {result.risk_percentage}%</h3>
              <p>Status: {result.message}</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 AgroAI | Smart Farming with AI 🌱
      </footer>

    </div>
  );
}

export default App;