import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuration
const BASE_URL = "https://api.brightdata.com";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Dataset IDs (for legacy route)
const DATASETS = {
  PEOPLE_PROFILES_BY_URL: "gd_l1viktl72bvl7bjuj0",
};

// ========== UTILITIES & LEGACY ROUTES ==========

// Health check route
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Route to get data from snapshot
router.get("/get-snapshot/:snapshotId", async (req, res) => {
  try {
    const { snapshotId } = req.params;

    if (!snapshotId) {
      return res.status(400).json({
        error: "snapshot_id is required",
      });
    }

    const apiUrl = `${BASE_URL}/datasets/v3/snapshot/${snapshotId}?format=json`;

    console.log("\n========== FETCHING SNAPSHOT DATA ==========");
    console.log("Snapshot ID:", snapshotId);
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

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

// ========== LEGACY ROUTE (kept for backward compatibility) ==========

// Route to trigger LinkedIn profile dataset
router.post("/trigger-dataset", async (req, res) => {
  try {
    const { profile_url, li_at_cookie, fetch_type } = req.body;

    if (!profile_url) {
      return res.status(400).json({
        error: "profile_url is required in request body",
      });
    }

    const datasetType = fetch_type || "profile";
    console.log(`Fetching ${datasetType} data for: ${profile_url}`);

    let apiUrl = `${BASE_URL}/datasets/v3/trigger?dataset_id=${DATASETS.PEOPLE_PROFILES_BY_URL}&format=json&include_errors=true`;

    if (li_at_cookie) {
      apiUrl += `&li_at=${encodeURIComponent(li_at_cookie)}`;
      console.log("Using LinkedIn session cookie for authentication");
    }

    const requestBody = [
      {
        url: profile_url,
      },
    ];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

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

export default router;
