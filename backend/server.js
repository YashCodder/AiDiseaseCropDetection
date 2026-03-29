require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

app.post("/recommendation", async (req, res) => {
  try {
    // 🔥 safety check
    if (!req.body) {
      return res.status(400).json({ error: "No data received" });
    }

    const { temperature, humidity, ph, risk } = req.body;

    if (
      temperature === undefined ||
      humidity === undefined ||
      ph === undefined ||
      risk === undefined
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const prompt = `
    Soil Conditions:
    Temperature: ${temperature}°C
    Humidity: ${humidity}%
    pH: ${ph}
    Risk Level: ${risk}%

    Give practical farming recommendations to reduce disease risk.
    Keep it short and actionable.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      recommendation: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI recommendation failed" });
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