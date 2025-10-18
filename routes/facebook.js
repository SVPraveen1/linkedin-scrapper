import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Facebook Dataset IDs
const DATASETS = {
  FACEBOOK_PROFILE_POSTS_BY_URL: "gd_lkaxegm826bjpoo9m5",
  FACEBOOK_DISCOVER_BY_USERNAME: "gd_lkaxegm826bjpoo9m5",
  FACEBOOK_POST_BY_URL: "gd_lyclm1571iy3mv57zw",
  FACEBOOK_EVENT_BY_URL: "gd_m14sd0to1jz48ppm51",
  FACEBOOK_EVENT_DISCOVER_BY_VENUE: "gd_m14sd0to1jz48ppm51",
  FACEBOOK_REELS_PROFILE_BY_URL: "gd_lyclm3ey2q6rww027t",
  FACEBOOK_REVIEWS_BY_URL: "gd_m0dtqpiu1mbcyc2g86",
  FACEBOOK_BASIC_PROFILE_BY_URL: "gd_mf0urb782734ik94dz",
};

// ========== FACEBOOK PROFILE POSTS ==========

// 1. Facebook profile posts scraper (by profile URL)
router.post("/facebook-profile-posts/collect-by-url", async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_PROFILE_POSTS_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK PROFILE POSTS BY URL ==========");
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

// 2. Facebook profile posts - discover by username
router.post("/facebook-profile-posts/discover-by-username", async (req, res) => {
  try {
    const { user_names } = req.body;
    if (!user_names || !Array.isArray(user_names) || user_names.length === 0) {
      return res.status(400).json({ error: "Array of usernames required." });
    }
    const input = user_names.map((user_name) => ({
      user_name,
      start_date: "",
      end_date: "",
    }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_DISCOVER_BY_USERNAME}&notify=false&include_errors=true&type=discover_new&discover_by=user_name`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK PROFILE POSTS BY USERNAME ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("=======================================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== FACEBOOK POST ==========

// 3. Facebook post scraper (by post URL)
router.post("/facebook-post/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of post URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_POST_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK POST BY URL ==========");
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

// ========== FACEBOOK EVENT ==========

// 4. Facebook event (by URL)
router.post("/facebook-event/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of event URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_EVENT_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK EVENT BY URL ==========");
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

// 5. Facebook event discover by venue
router.post("/facebook-event/discover-by-venue", async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_EVENT_DISCOVER_BY_VENUE}&notify=false&include_errors=true&type=discover_new&discover_by=venue`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK EVENT BY VENUE ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("============================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== FACEBOOK REELS ==========

// 6. Facebook reels/profile scrape (by URL)
router.post("/facebook-reels-profile/collect-by-url", async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_REELS_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK REELS PROFILE BY URL ==========");
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

// ========== FACEBOOK REVIEWS ==========

// 7. Facebook reviews scrape (by URL)
router.post("/facebook-reviews/collect-by-url", async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_REVIEWS_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK REVIEWS BY URL ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("============================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== FACEBOOK BASIC PROFILE ==========

// 8. Facebook basic profile scrape (by URL)
router.post("/facebook-basic-profile/collect-by-url", async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "Array of profile URLs required." });
    }
    const input = urls.map((url) => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_BASIC_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== FACEBOOK BASIC PROFILE BY URL ==========");
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

export default router;
