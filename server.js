import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

// Import route modules
import linkedinRoutes from "./routes/linkedin.js";
import instagramRoutes from "./routes/instagram.js";
import youtubeRoutes from "./routes/youtube.js";
import facebookRoutes from "./routes/facebook.js";
import googleMapsRoutes from "./routes/googleMaps.js";
import utilitiesRoutes from "./routes/utilities.js";

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static("public"));

// Mount route modules
app.use("/", linkedinRoutes);
app.use("/", instagramRoutes);
app.use("/", youtubeRoutes);
app.use("/", facebookRoutes);
app.use("/", googleMapsRoutes);
app.use("/", utilitiesRoutes);

// Server startup
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
