import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// YouTube Dataset IDs
const DATASETS = {
  YOUTUBEBYURL: "gd_lk56epmy2i5g7lzu0k",
  YOUTUBEABOUTBYURL: "gd_lk538t2k2p1k3oos71",
};

// ========== YOUTUBE VIDEO SCRAPER ==========

// 1. YouTube Scraper - Collect by URL
router.post("/youtube-scraper/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of YouTube video URLs is required." });
    }

    const input = urls.map((url) => ({
      url,
      country: "",
      transcription_language: "",
    }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.YOUTUBEBYURL}&notify=false&include_errors=true`;

    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== YOUTUBE VIDEO BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("=========================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== YOUTUBE ABOUT PAGE SCRAPER ==========

// 2. YouTube About Page Scraper - Collect by Channel URLs
router.post("/youtube-scraper/about-by-url", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({
          error: "An array of YouTube channel About page URLs is required.",
        });
    }

    const input = urls.map((url) => ({ url }));

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.YOUTUBEABOUTBYURL}&notify=false&include_errors=true`;

    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== YOUTUBE ABOUT BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("=========================================\n");

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
