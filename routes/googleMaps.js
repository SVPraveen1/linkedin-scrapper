import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Google Maps Dataset IDs
const DATASETS = {
  GOOGLEMAPSBYURL: "gd_m8ebnr0q2qlklc02fz",
};

// ========== GOOGLE MAPS SCRAPER ==========

// Google Maps Scraper - Collect by URLs
router.post("/maps-scraper/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of Google Maps place URLs is required." });
    }

    const input = urls.map((url) => ({ url }));

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.GOOGLEMAPSBYURL}&notify=false&include_errors=true`;

    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== GOOGLE MAPS BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("=======================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

export default router;
