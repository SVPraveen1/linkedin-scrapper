const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(express.json());


// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN =
  "383b76f4d071359c7852963285976a5147145b590a5eebe5594ae1fb1fd5be8b";

// Dataset IDs for different LinkedIn data types
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
  GOOGLEMAPSBYURL: "gd_m8ebnr0q2qlklc02fz",
  YOUTUBEBYURL: "gd_lk56epmy2i5g7lzu0k",
  YOUTUBEABOUTBYURL: "gd_lk538t2k2p1k3oos71",
  INSTAGRAM_PROFILE_BY_URL: "gd_l1vikfch901nx3by4",      // scraping by profile URL
  INSTAGRAM_DISCOVER_BY_USERNAME: "gd_l1vikfch901nx3by4",// discover by username, same as above
  INSTAGRAM_REEL_BY_URL: "gd_lyclm20il4r5helnj",
  INSTAGRAM_POST_BY_URL: "gd_lk5ns7kz21pck8jpis",
  FACEBOOK_PROFILE_POSTS_BY_URL: "gd_lkaxegm826bjpoo9m5",
  FACEBOOK_DISCOVER_BY_USERNAME: "gd_lkaxegm826bjpoo9m5", // same as above, with discover params
  FACEBOOK_POST_BY_URL: "gd_lyclm1571iy3mv57zw",
  FACEBOOK_EVENT_BY_URL: "gd_m14sd0to1jz48ppm51",
  FACEBOOK_EVENT_DISCOVER_BY_VENUE: "gd_m14sd0to1jz48ppm51", // same as event dataset, with discover params
  FACEBOOK_REELS_PROFILE_BY_URL: "gd_lyclm3ey2q6rww027t",
  FACEBOOK_REVIEWS_BY_URL: "gd_m0dtqpiu1mbcyc2g86",
  FACEBOOK_BASIC_PROFILE_BY_URL: "gd_mf0urb782734ik94dz"
};

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static("public"));

// ========== LINKEDIN PEOPLE PROFILES ==========

// 1. LinkedIn People Profiles - Collect by URL
app.post("/people-profiles/collect-by-url", async (req, res) => {
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

//2. LinkedIn People Profiles - Discover by Name

app.post("/people-profiles/discover-by-name", async (req, res) => {
  try {
    const { first_name, last_name, li_at_cookie } = req.body;
    // Expecting: { "first_name": "...", "last_name": "...", "li_at_cookie": "..." }

    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "Both first_name and last_name are required" });
    }

    // Bright Data API URL for discover by name
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
app.post("/company-info/collect-by-url", async (req, res) => {
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
app.post("/job-listings/collect-by-url", async (req, res) => {
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
app.post("/job-listings/discover-by-keyword", async (req, res) => {
  try {
    const { searches } = req.body; // Expecting: { "searches": [ { location, keyword, ... }, ... ] }

    if (!searches || !Array.isArray(searches) || searches.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of job search objects is required" });
    }

    // Prepare the request payload
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
app.post("/job-listings/discover-by-url", async (req, res) => {
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

app.post("/posts/collect-by-url", async (req, res) => {
  try {
    const { urls, li_at_cookie } = req.body; // Expecting { urls: ["https://...", ...], li_at_cookie: "optional_cookie" }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json({ error: "An array of LinkedIn post URLs is required" });
    }

    // Prepare input array
    const input = urls.map((url) => ({ url }));

    // Prepare API URL
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_URL}&notify=false&include_errors=true`;

    // Include li_at cookie if provided
    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    // Axios POST request
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
app.post("/posts/discover-by-company-url", async (req, res) => {
  try {
    const { input, li_at_cookie } = req.body; // Expecting: { "input": [{"url": "..."}], "li_at_cookie": "optional_cookie" }

    if (!input || !Array.isArray(input) || input.length === 0) {
      return res
        .status(400)
        .json({ error: 'An array of company URLs is required in "input"' });
    }

    // Build API URL
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_COMPANY_URL}&notify=false&include_errors=true&type=discover_new&discover_by=company_url`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
    }

    // Send request to Bright Data
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
app.post("/posts/discover-by-profile-url", async (req, res) => {
  try {
    const { input, li_at_cookie } = req.body; // Expecting { input: [{ url, start_date, end_date }], li_at_cookie }

    if (!input || !Array.isArray(input) || input.length === 0) {
      return res
        .status(400)
        .json({
          error: "input array is required with at least one profile object",
        });
    }

    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.POSTS_BY_PROFILE_URL}&notify=false&include_errors=true&type=discover_new&discover_by=profile_url`;

    // Append li_at cookie if provided
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

// 11. LinkedIn People Search - Collect by URL
app.post("/people-search/collect-by-url", async (req, res) => {
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

// ========== LEGACY ROUTE (kept for backward compatibility) ==========

// Route to trigger LinkedIn profile dataset
app.post("/trigger-dataset", async (req, res) => {
  try {
    const { profile_url, li_at_cookie, fetch_type } = req.body;

    if (!profile_url) {
      return res.status(400).json({
        error: "profile_url is required in request body",
      });
    }

    // Determine which dataset to use: 'profile' (default) or 'posts'
    const datasetType = fetch_type || "profile";
    const DATASET_ID =
      datasetType === "posts" ? DATASET_ID_POSTS : DATASET_ID_PROFILE;

    console.log(`Fetching ${datasetType} data for: ${profile_url}`);

    // Build the API URL
    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.PEOPLE_PROFILES_BY_URL}&format=json&include_errors=true`;

    // Add li_at cookie to URL if provided
    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
      console.log("Using LinkedIn session cookie for authentication");
    }

    // Prepare request body - only URL, no li_at in body
    const requestBody = [
      {
        url: profile_url,
      },
    ];

    // Make the request to Bright Data API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Print response details to console
    console.log("\n========== BRIGHT DATA API RESPONSE ==========");
    console.log("Status Code:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("Response Data:", JSON.stringify(data, null, 2));
    console.log("==============================================\n");

    if (!response.ok) {
      console.error("ERROR: API request failed");
      return res.status(response.status).json({
        error: "Bright Data API error",
        details: data,
      });
    }

    console.log("SUCCESS: Dataset triggered successfully");
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Route to get data from snapshot
app.get("/get-snapshot/:snapshotId", async (req, res) => {
  try {
    const { snapshotId } = req.params;

    if (!snapshotId) {
      return res.status(400).json({
        error: "snapshot_id is required",
      });
    }

    // Build the API URL to get snapshot data
    const apiUrl = `${BASE_URL}/datasets/v3/snapshot/${snapshotId}?format=json`;

    console.log("\n========== FETCHING SNAPSHOT DATA ==========");
    console.log("Snapshot ID:", snapshotId);
    console.log("API URL:", apiUrl);

    // Make the request to Bright Data API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    // Print response details to console
    console.log("Status Code:", response.status);
    console.log("Response Data:", JSON.stringify(data, null, 2));
    console.log("==============================================\n");

    if (!response.ok) {
      console.error("ERROR: Failed to fetch snapshot data");
      return res.status(response.status).json({
        error: "Bright Data API error",
        details: data,
      });
    }

    console.log("SUCCESS: Snapshot data retrieved successfully");
    console.log("Total records:", Array.isArray(data) ? data.length : "N/A");

    res.json({
      success: true,
      snapshot_id: snapshotId,
      total_records: Array.isArray(data) ? data.length : 0,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 12. Google Maps Scraper - Collect by URLs
app.post('/maps-scraper/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body; // Expecting { urls: [array of Google Maps URLs] }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "An array of Google Maps place URLs is required." });
    }

    // Prepare input as required by Bright Data
    const input = urls.map(url => ({ url }));

    // Construct API URL for Bright Data
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.GOOGLEMAPSBYURL}&notify=false&include_errors=true`;

    // Make Axios POST request to Bright Data
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("GOOGLE MAPS SCRAPER:", JSON.stringify(response.data, null, 2));
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Bright Data Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 13. YouTube Scraper - Collect by URL
// YOUTUBE SCRAPER - Collect by URL
app.post('/youtube-scraper/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body; // Expects { urls: [...] }
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "An array of YouTube video URLs is required." });
    }

    const input = urls.map(url => ({ url, country: "", transcription_language: "" }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.YOUTUBEBYURL}&notify=false&include_errors=true`;

    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 14. YouTube About Page Scraper - Collect by Channel URLs
app.post('/youtube-scraper/about-by-url', async (req, res) => {
  try {
    const { urls } = req.body; // Expecting { urls: ["https://www.youtube.com/@MrBeast/about", ...] }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "An array of YouTube channel About page URLs is required." });
    }

    // Prepare input array for Bright Data API
    const input = urls.map(url => ({ url }));

    // Compose API URL
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.YOUTUBEABOUTBYURL}&notify=false&include_errors=true`;

    // Send POST request to Bright Data API
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("YOUTUBE ABOUT SCRAPER:", JSON.stringify(response.data, null, 2));
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Bright Data Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 15. Instagram Profile Scraper - Collect by URL
app.post('/instagram-profile/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of Instagram profile URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 16. Instagram Profile Discover - by Username
app.post('/instagram-profile/discover-by-username', async (req, res) => {
  try {
    const { user_names } = req.body; // Array of usernames
    if (!user_names || !Array.isArray(user_names) || user_names.length === 0) {
      return res.status(400).json({ error: "Array of Instagram usernames required." });
    }
    const input = user_names.map(user_name => ({ user_name }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_DISCOVER_BY_USERNAME}&notify=false&include_errors=true&type=discover_new&discover_by=user_name`;
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// 17. Instagram Reels Scraper - Collect by URL
app.post('/instagram-reels/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of Instagram reel URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_REEL_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


// 18. Instagram Post Scraper - Collect by Post URL
app.post('/instagram-post/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body; // Expecting { urls: ["https://www.instagram.com/p/Cuf4s0MNqNr", ...] }
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of Instagram post URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.INSTAGRAM_POST_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ input }),
      {
        headers: {
          "Authorization": `Bearer ${ ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});


// 1. Facebook profile posts scraper (by profile URL)
app.post('/facebook-profile-posts/collect-by-url', async (req, res) => {
  try {
    const { inputs } = req.body; // array of objects: { url, num_of_posts, posts_to_not_include, start_date, end_date }
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_PROFILE_POSTS_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }), {
      headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" }
    });
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 2. Facebook profile posts - discover by username
app.post('/facebook-profile-posts/discover-by-username', async (req, res) => {
  try {
    const { user_names } = req.body;
    if (!user_names || !Array.isArray(user_names) || user_names.length === 0) {
      return res.status(400).json({ error: "Array of usernames required." });
    }
    const input = user_names.map(user_name => ({ user_name, start_date: "", end_date: "" }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_DISCOVER_BY_USERNAME}&notify=false&include_errors=true&type=discover_new&discover_by=user_name`;
    const response = await axios.post(
      apiUrl, JSON.stringify({ input }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 3. Facebook post scraper (by post URL)
app.post('/facebook-post/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of post URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_POST_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 4. Facebook event (by URL)
app.post('/facebook-event/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of event URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_EVENT_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 5. Facebook event discover by venue
app.post('/facebook-event/discover-by-venue', async (req, res) => {
  try {
    const { inputs } = req.body; // input: [{ url, upcoming_events_only }]
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_EVENT_DISCOVER_BY_VENUE}&notify=false&include_errors=true&type=discover_new&discover_by=venue`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 6. Facebook reels/profile scrape (by URL)
app.post('/facebook-reels-profile/collect-by-url', async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_REELS_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 7. Facebook reviews scrape (by URL)
app.post('/facebook-reviews/collect-by-url', async (req, res) => {
  try {
    const { inputs } = req.body;
    if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "Input array required." });
    }
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_REVIEWS_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input: inputs }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});

// 8. Facebook basic profile scrape (by URL)
app.post('/facebook-basic-profile/collect-by-url', async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Array of profile URLs required." });
    }
    const input = urls.map(url => ({ url }));
    let apiUrl = `${BASE_URL}/datasets/v3/scrape?dataset_id=${DATASETS.FACEBOOK_BASIC_PROFILE_BY_URL}&notify=false&include_errors=true`;
    const response = await axios.post(apiUrl, JSON.stringify({ input }),
      { headers: { "Authorization": `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" } }
    );
    res.json({ success: true, data: response.data });
  } catch (error) { res.status(500).json({ error: error.response?.data || error.message }); }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🚀 LinkedIn Bright Data API Server Running on Port ${PORT}`);
  console.log(`${"=".repeat(60)}\n`);

  console.log("📋 AVAILABLE ENDPOINTS:\n");

  console.log("🔹 PEOPLE PROFILES:");
  console.log(
    `   POST http://localhost:${PORT}/people-profiles/collect-by-url`
  );
  console.log(
    `   POST http://localhost:${PORT}/people-profiles/discover-by-name\n`
  );

  console.log("🔹 COMPANY INFORMATION:");
  console.log(`   POST http://localhost:${PORT}/company-info/collect-by-url\n`);

  console.log("🔹 JOB LISTINGS:");
  console.log(`   POST http://localhost:${PORT}/job-listings/collect-by-url`);
  console.log(
    `   POST http://localhost:${PORT}/job-listings/discover-by-keyword`
  );
  console.log(
    `   POST http://localhost:${PORT}/job-listings/discover-by-url\n`
  );

  console.log("🔹 POSTS:");
  console.log(`   POST http://localhost:${PORT}/posts/collect-by-url`);
  console.log(`   POST http://localhost:${PORT}/posts/discover-by-company-url`);
  console.log(`   POST http://localhost:${PORT}/posts/discover-by-profile-url`);
  console.log(`   POST http://localhost:${PORT}/posts/discover-by-url\n`);

  console.log("🔹 PEOPLE SEARCH:");
  console.log(
    `   POST http://localhost:${PORT}/people-search/collect-by-url\n`
  );

  console.log("🔹 SNAPSHOT & UTILITIES:");
  console.log(`   GET  http://localhost:${PORT}/get-snapshot/:snapshotId`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   POST http://localhost:${PORT}/trigger-dataset (legacy)\n`);

  console.log(`${"=".repeat(60)}`);
  console.log("📖 See API_EXAMPLES.md for detailed usage examples");
  console.log(`${"=".repeat(60)}\n`);
});
