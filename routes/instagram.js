import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Instagram Dataset IDs
const DATASETS = {
  INSTAGRAM_PROFILE_BY_URL: "gd_l1vikfch901nx3by4",
  INSTAGRAM_DISCOVER_BY_USERNAME: "gd_l1vikfch901nx3by4",
  INSTAGRAM_REEL_BY_URL: "gd_lyclm20il4r5helnj",
  INSTAGRAM_POST_BY_URL: "gd_lk5ns7kz21pck8jpis",
};

// ========== INSTAGRAM PROFILE ==========

// 1. Instagram Profile Scraper - Collect by URL
router.post("/instagram-profile/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "Array of Instagram profile URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== INSTAGRAM PROFILE BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("=============================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 2. Instagram Profile Discover - by Username
router.post("/instagram-profile/discover-by-username", async (req, res) => {
  try {
    const { user_names } = req.body;
    if (!user_names || !Array.isArray(user_names) || user_names.length === 0) {
      return res
        .status(400)
        .json({ error: "Array of Instagram usernames required." });
    }
    const input = user_names.map((user_name) => ({ user_name }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_DISCOVER_BY_USERNAME}&notify=false&include_errors=true&type=discover_new&discover_by=user_name`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== INSTAGRAM PROFILE BY USERNAME ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("==================================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== INSTAGRAM REELS ==========

// 3. Instagram Reels Scraper - Collect by URL
router.post("/instagram-reels/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "Array of Instagram reel URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_REEL_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== INSTAGRAM REELS BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("===========================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== INSTAGRAM POST ==========

// 4. Instagram Post Scraper - Collect by Post URL
router.post("/instagram-post/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "Array of Instagram post URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_POST_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== INSTAGRAM POST BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("==========================================\n");

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
