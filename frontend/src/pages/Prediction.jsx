import { useState } from "react";
import axios from "axios";
import "../index.css";

function Prediction() {
  const [soilData, setSoilData] = useState({
    temperature: "",
    humidity: "",
    ph: ""
  });

  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSoilSubmit = async () => {
    try {
      setLoading(true);
      setRecommendation("");

      if (!soilData.temperature || !soilData.humidity || !soilData.ph) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }

      const payload = {
        temperature: Number(soilData.temperature),
        humidity: Number(soilData.humidity),
        ph: Number(soilData.ph)
      };

      const res = await axios.post("http://localhost:5000/soil", payload);

      setResult(res.data.result);

      const risk = res.data.result.risk_percentage;

      if (risk > 60) {
        const aiRes = await axios.post(
          "http://localhost:5000/recommendation",
          { ...payload, risk }
        );

        setRecommendation(aiRes.data.recommendation);
      } else {
        setRecommendation("✅ Soil conditions are safe.");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {loading ? "Processing..." : "Predict Risk"}
        </button>

        {result && (
          <div className="result-box">
            <h3>Risk: {result.risk_percentage}%</h3>
            <p>Status: {result.message}</p>
          </div>
        )}

        {recommendation && (
          <div className="recommendation-box">
            <h3>🌱 AI Recommendations</h3>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Prediction;