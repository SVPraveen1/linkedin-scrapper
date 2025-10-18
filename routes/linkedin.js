import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// LinkedIn Dataset IDs
const DATASETS = {
  PEOPLE_PROFILES_BY_URL: "gd_l1viktl72bvl7bjuj0",
  PEOPLE_PROFILES_BY_NAME: "gd_l1viktl72bvl7bjuj0",
  COMPANY_INFO_BY_URL: "gd_l1vikfnt1wgvvqz95w",
  JOB_LISTINGS_BY_URL: "gd_lpfll7v5hcqtkxl6l",
  JOB_LISTINGS_BY_KEYWORD: "gd_lpfll7v5hcqtkxl6l",
  JOB_LISTINGS_BY_URL_DISCOVER: "gd_lpfll7v5hcqtkxl6l",
  POSTS_BY_URL: "gd_lyy3tktm25m4avu764",
  POSTS_BY_COMPANY_URL: "gd_lyy3tktm25m4avu764",
  POSTS_BY_PROFILE_URL: "gd_lyy3tktm25m4avu764",
  POSTS_BY_URL_DISCOVER: "gd_lyy3tktm25m4avu764",
  PEOPLE_SEARCH_BY_URL: "gd_m8d03he47z8nwb5xc",
};

// ========== LINKEDIN PEOPLE PROFILES ==========

// 1. LinkedIn People Profiles - Collect by URL
router.post("/people-profiles/collect-by-url", async (req, res) => {
  try {
    const { profile_url, li_at_cookie } = req.body;

    if (!profile_url) {
      return res.status(400).json({ error: "profile_url is required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.PEOPLE_PROFILES_BY_URL}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ url: profile_url }]),
    });

    const data = await response.json();
    console.log("\n========== PEOPLE PROFILES BY URL ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("===========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. LinkedIn People Profiles - Discover by Name
router.post("/people-profiles/discover-by-name", async (req, res) => {
  try {
    const { first_name, last_name, li_at_cookie } = req.body;

    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Both first_name and last_name are required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.PEOPLE_PROFILES_BY_NAME}&notify=false&include_errors=true&type=discover_new&discover_by=name`;
    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const data = JSON.stringify({
      input: [{ first_name, last_name }],
    });

    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== PEOPLE PROFILES BY NAME ==========");
    console.log("Response:", JSON.stringify(response.data, null, 2));
    console.log("============================================\n");

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

// ========== LINKEDIN COMPANY INFORMATION ==========

// 3. LinkedIn Company Information - Collect by URL
router.post("/company-info/collect-by-url", async (req, res) => {
  try {
    const { company_url, li_at_cookie } = req.body;

    if (!company_url) {
      return res.status(400).json({ error: "company_url is required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.COMPANY_INFO_BY_URL}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ url: company_url }]),
    });

    const data = await response.json();
    console.log("\n========== COMPANY INFO BY URL ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("=========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== LINKEDIN JOB LISTINGS ==========

// 4. LinkedIn Job Listings - Collect by URL
router.post("/job-listings/collect-by-url", async (req, res) => {
  try {
    const { job_url, li_at_cookie } = req.body;

    if (!job_url) {
      return res.status(400).json({ error: "job_url is required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.JOB_LISTINGS_BY_URL}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ url: job_url }]),
    });

    const data = await response.json();
    console.log("\n========== JOB LISTINGS BY URL ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("=========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. LinkedIn Job Listings - Discover by Keyword
router.post("/job-listings/discover-by-keyword", async (req, res) => {
  try {
    const { searches } = req.body;

    if (!searches || !Array.isArray(searches) || searches.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of job search objects is required" });
    }

    const input = searches.map((search) => ({
      location: search.location || "",
      keyword: search.keyword || "",
      country: search.country || "",
      time_range: search.time_range || "",
      job_type: search.job_type || "",
      experience_level: search.experience_level || "",
      remote: search.remote || "",
      company: search.company || "",
      location_radius: search.location_radius || "",
    }));

    const apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.JOB_LISTINGS_BY_KEYWORD}&notify=false&include_errors=true&type=discover_new&discover_by=keyword`;

    const { data } = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== JOB LISTINGS BY KEYWORD ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("============================================\n");

    res.json({ success: true, data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});

// 6. LinkedIn Job Listings - Discover by URL
router.post("/job-listings/discover-by-url", async (req, res) => {
  try {
    const { search_url, li_at_cookie } = req.body;

    if (!search_url) {
      return res.status(400).json({ error: "search_url is required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.JOB_LISTINGS_BY_URL_DISCOVER}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ url: search_url }]),
    });

    const data = await response.json();
    console.log("\n========== JOB LISTINGS BY URL DISCOVER ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("=================================================\n");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== LINKEDIN POSTS ==========

// 7. LinkedIn Posts - Collect by URL
router.post("/posts/collect-by-url", async (req, res) => {
  try {
    const { urls, li_at_cookie } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of LinkedIn post URLs is required" });
    }

    const input = urls.map((url) => ({ url }));

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_URL}&notify=false&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const { data } = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== POSTS BY URL ==========");
    console.log(JSON.stringify(data, null, 2));
    console.log("=================================\n");

    res.json({ success: true, data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 8. LinkedIn Posts - Discover by Company URL
router.post("/posts/discover-by-company-url", async (req, res) => {
  try {
    const { input, li_at_cookie } = req.body;

    if (!input || !Array.isArray(input) || input.length === 0) {
      return res
        .status(400)
        .json({ error: 'An array of company URLs is required in "input"' });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_COMPANY_URL}&notify=false&include_errors=true&type=discover_new&discover_by=company_url`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const { data } = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== POSTS BY COMPANY URL ==========");
    console.log(JSON.stringify(data, null, 2));
    console.log("==========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 9. LinkedIn Posts - Discover by Profile URL
router.post("/posts/discover-by-profile-url", async (req, res) => {
  try {
    const { input, li_at_cookie } = req.body;

    if (!input || !Array.isArray(input) || input.length === 0) {
      return res.status(400).json({
        error: "input array is required with at least one profile object",
      });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_PROFILE_URL}&notify=false&include_errors=true&type=discover_new&discover_by=profile_url`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const { data } = await axios.post(apiUrl, JSON.stringify({ input }), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("\n========== POSTS BY PROFILE URL ==========");
    console.log(JSON.stringify(data, null, 2));
    console.log("==========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    console.error(
      "❌ Bright Data Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// ========== LINKEDIN PEOPLE SEARCH ==========

// 10. LinkedIn People Search - Collect by URL
router.post("/people-search/collect-by-url", async (req, res) => {
  try {
    const { search_url, li_at_cookie } = req.body;

    if (!search_url) {
      return res.status(400).json({ error: "search_url is required" });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.PEOPLE_SEARCH_BY_URL}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ url: search_url }]),
    });

    const data = await response.json();
    console.log("\n========== PEOPLE SEARCH BY URL ==========");
    console.log("Response:", JSON.stringify(data, null, 2));
    console.log("==========================================\n");

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
