const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Crop Disease Backend is Running 🚀");
});

// Dummy storage (in-memory)
let predictions = [];

// Soil Prediction
app.post("/soil", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict-soil",
      req.body
    );

    const newPrediction = {
      id: predictions.length + 1,
      type: "soil",
      result: response.data,
      createdAt: new Date()
    };

    predictions.unshift(newPrediction);

    res.json(newPrediction);
  } catch (error) {
    res.status(500).json({ error: "AI service not reachable" });
  }
});

// Image Prediction (dummy for now)
app.post("/image", (req, res) => {
  const dummy = {
    id: predictions.length + 1,
    type: "image",
    result: {
      prediction: "Yellow Fungus",
      confidence: 88
    },
    createdAt: new Date()
  };

  predictions.unshift(dummy);
  res.json(dummy);
});

// Get History
app.get("/history", (req, res) => {
  res.json(predictions);
});

app.listen(5000, () => console.log("Server running on 5000"));