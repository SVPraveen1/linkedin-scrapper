# 🚀 Bright Data Scraper Hub

A comprehensive multi-platform web scraping API service powered by Bright Data's dataset infrastructure. This Express.js application provides unified access to scrape data from LinkedIn, Instagram, Facebook, YouTube, and Google Maps through a clean REST API interface.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v5.1.0-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Get BrightData Access Token](#3-get-brightdata-access-token)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Start the Server](#5-start-the-server)
- [Available APIs](#-available-apis)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [Frontend Interface](#-frontend-interface)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### LinkedIn Scraping
- **People Profiles**: Extract comprehensive profile data by URL or discover by name
- **Company Information**: Collect detailed company insights and metrics
- **Job Listings**: Search jobs by keyword or URL, discover opportunities
- **Posts**: Scrape individual posts or discover by company/profile
- **People Search**: Advanced profile search functionality

### Social Media Scraping
- **Instagram**: Profile data, posts, reels collection
- **Facebook**: Profile posts, events, reviews, reels, basic profiles
- **YouTube**: Video metadata, channel about pages

### Additional Services
- **Google Maps**: Extract business listings and location data
- **Utilities**: Snapshot retrieval, health checks, legacy dataset triggers

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js v5.1.0
- **HTTP Client**: Axios v1.12.2
- **Environment Management**: dotenv v17.2.3
- **CORS**: cors v2.8.5
- **Development**: nodemon v3.1.10
- **Styling**: Tailwind CSS v3.4.18
- **Deployment**: Vercel-ready configuration

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v8.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))
- **BrightData Account**: Required for API access ([Sign up](https://brightdata.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkedin-scraper.git
cd linkedin-scraper
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- axios
- cors
- dotenv
- nodemon (dev)
- tailwindcss (dev)

### 3. Get BrightData Access Token

#### Step-by-Step Guide:

**A. Create a BrightData Account**
1. Visit [BrightData](https://brightdata.com/)
2. Click "Start Free Trial" or "Sign Up"
3. Complete the registration process
4. Verify your email address

**B. Access the Dashboard**
1. Log in to your BrightData account
2. Navigate to the main dashboard

**C. Generate Access Token**
1. Click on your profile icon in the top-right corner
2. Select **"Settings"** or **"Account Settings"**
3. Navigate to **"API Tokens"** or **"Access Tokens"** section
4. Click **"Generate New Token"** or **"Create API Token"**
5. Provide a descriptive name (e.g., "LinkedIn Scraper App")
6. Select appropriate permissions:
   - ✅ Datasets API access
   - ✅ Scraping API access
7. Click **"Generate"** or **"Create"**
8. **IMPORTANT**: Copy the token immediately - it won't be shown again!

**D. Alternative Method (Using Dataset Page)**
1. Go to **"Datasets"** section in the dashboard
2. Select any dataset you want to use
3. Click on **"API"** or **"Get API Access"** tab
4. You'll find your access token or option to generate one
5. Copy the Bearer token from the code examples

**E. Token Format**
Your access token will look something like:
```
bda_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Note**: Keep this token secure and never commit it to version control!

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file and add your BrightData access token:

```bash
ACCESS_TOKEN=your_bright_data_access_token_here
```

Replace `your_bright_data_access_token_here` with the actual token you copied from BrightData.

**Example:**
```bash
ACCESS_TOKEN=bda_1234567890abcdefghijklmnopqrstuvwxyz
```

### 5. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

You should see output similar to:
```
============================================================
🚀 LinkedIn Bright Data API Server Running on Port 3000
============================================================

📋 AVAILABLE ENDPOINTS:
...
```

## 📡 Available APIs

The application provides 35+ API endpoints across multiple platforms:

### LinkedIn APIs (10 endpoints)
- People Profiles (2)
- Company Information (1)
- Job Listings (3)
- Posts (4)
- People Search (1)

### Instagram APIs (4 endpoints)
- Profile scraping
- Reels collection
- Post scraping

### YouTube APIs (2 endpoints)
- Video data scraping
- Channel about page

### Facebook APIs (8 endpoints)
- Profile posts
- Individual posts
- Events
- Reels
- Reviews
- Basic profiles

### Google Maps APIs (1 endpoint)
- Location/business data

### Utility APIs (3 endpoints)
- Snapshot retrieval
- Health check
- Legacy dataset trigger

## 🔌 API Endpoints

### LinkedIn - People Profiles

#### 1. Collect Profile by URL
```http
POST /people-profiles/collect-by-url
Content-Type: application/json

{
  "profile_url": "https://www.linkedin.com/in/example-profile",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

#### 2. Discover Profile by Name
```http
POST /people-profiles/discover-by-name
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

### LinkedIn - Company Information

#### 3. Collect Company by URL
```http
POST /company-info/collect-by-url
Content-Type: application/json

{
  "company_url": "https://www.linkedin.com/company/example-company",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

### LinkedIn - Job Listings

#### 4. Collect Job by URL
```http
POST /job-listings/collect-by-url
Content-Type: application/json

{
  "job_url": "https://www.linkedin.com/jobs/view/1234567890",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

#### 5. Discover Jobs by Keyword
```http
POST /job-listings/discover-by-keyword
Content-Type: application/json

{
  "searches": [
    {
      "keyword": "Software Engineer",
      "location": "San Francisco",
      "country": "United States",
      "time_range": "Past Week",
      "job_type": "Full-time",
      "experience_level": "Mid-Senior level",
      "remote": "Remote"
    }
  ]
}
```

#### 6. Discover Jobs by URL
```http
POST /job-listings/discover-by-url
Content-Type: application/json

{
  "search_url": "https://www.linkedin.com/jobs/search/?keywords=developer",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

### LinkedIn - Posts

#### 7. Collect Posts by URL
```http
POST /posts/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.linkedin.com/posts/example-post-123",
    "https://www.linkedin.com/posts/example-post-456"
  ],
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

#### 8. Discover Posts by Company URL
```http
POST /posts/discover-by-company-url
Content-Type: application/json

{
  "input": [
    {
      "url": "https://www.linkedin.com/company/example-company"
    }
  ],
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

#### 9. Discover Posts by Profile URL
```http
POST /posts/discover-by-profile-url
Content-Type: application/json

{
  "input": [
    {
      "url": "https://www.linkedin.com/in/example-profile"
    }
  ],
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

### LinkedIn - People Search

#### 10. People Search by URL
```http
POST /people-search/collect-by-url
Content-Type: application/json

{
  "search_url": "https://www.linkedin.com/search/results/people/?keywords=engineer",
  "li_at_cookie": "optional_linkedin_session_cookie"
}
```

### Instagram APIs

#### 11. Scrape Instagram Profile
```http
POST /instagram-profile/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.instagram.com/username/"
  ]
}
```

#### 12. Discover Profile by Username
```http
POST /instagram-profile/discover-by-username
Content-Type: application/json

{
  "user_names": ["username1", "username2"]
}
```

#### 13. Collect Instagram Reels
```http
POST /instagram-reels/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.instagram.com/reel/ABC123/"
  ]
}
```

#### 14. Collect Instagram Post
```http
POST /instagram-post/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.instagram.com/p/ABC123/"
  ]
}
```

### YouTube APIs

#### 15. Scrape YouTube Video
```http
POST /youtube-scraper/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.youtube.com/watch?v=VIDEO_ID"
  ]
}
```

#### 16. Scrape Channel About Page
```http
POST /youtube-scraper/about-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.youtube.com/@channelname/about"
  ]
}
```

### Facebook APIs

#### 17. Scrape Facebook Profile Posts
```http
POST /facebook-profile-posts/collect-by-url
Content-Type: application/json

{
  "inputs": [
    {
      "url": "https://www.facebook.com/username"
    }
  ]
}
```

#### 18. Discover Posts by Username
```http
POST /facebook-profile-posts/discover-by-username
Content-Type: application/json

{
  "user_names": ["username1", "username2"]
}
```

#### 19. Scrape Facebook Post
```http
POST /facebook-post/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.facebook.com/post/123456"
  ]
}
```

#### 20. Scrape Facebook Event
```http
POST /facebook-event/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.facebook.com/events/123456"
  ]
}
```

#### 21. Discover Events by Venue
```http
POST /facebook-event/discover-by-venue
Content-Type: application/json

{
  "inputs": [
    {
      "venue": "Madison Square Garden",
      "location": "New York"
    }
  ]
}
```

#### 22. Scrape Facebook Reels Profile
```http
POST /facebook-reels-profile/collect-by-url
Content-Type: application/json

{
  "inputs": [
    {
      "url": "https://www.facebook.com/username/reels"
    }
  ]
}
```

#### 23. Scrape Facebook Reviews
```http
POST /facebook-reviews/collect-by-url
Content-Type: application/json

{
  "inputs": [
    {
      "url": "https://www.facebook.com/page/reviews"
    }
  ]
}
```

#### 24. Scrape Basic Facebook Profile
```http
POST /facebook-basic-profile/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.facebook.com/username"
  ]
}
```

### Google Maps API

#### 25. Scrape Google Maps Location
```http
POST /maps-scraper/collect-by-url
Content-Type: application/json

{
  "urls": [
    "https://www.google.com/maps/place/..."
  ]
}
```

### Utility APIs

#### 26. Get Snapshot Data
```http
GET /get-snapshot/:snapshotId
```

#### 27. Health Check
```http
GET /health
```
Response:
```json
{
  "status": "ok"
}
```

#### 28. Trigger Dataset (Legacy)
```http
POST /trigger-dataset
Content-Type: application/json

{
  "profile_url": "https://www.linkedin.com/in/example",
  "li_at_cookie": "optional_cookie",
  "fetch_type": "profile"
}
```

## 💻 Usage Examples

### Using cURL

```bash
# Example: Scrape LinkedIn Profile
curl -X POST http://localhost:3000/people-profiles/collect-by-url \
  -H "Content-Type: application/json" \
  -d '{
    "profile_url": "https://www.linkedin.com/in/example-profile"
  }'
```

### Using JavaScript (Fetch API)

```javascript
// Example: Search LinkedIn Jobs
const response = await fetch('http://localhost:3000/job-listings/discover-by-keyword', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    searches: [{
      keyword: 'Software Engineer',
      location: 'San Francisco',
      country: 'United States',
      time_range: 'Past Week'
    }]
  })
});

const data = await response.json();
console.log(data);
```

### Using Python (requests)

```python
import requests

# Example: Scrape Instagram Profile
url = "http://localhost:3000/instagram-profile/collect-by-url"
payload = {
    "urls": ["https://www.instagram.com/username/"]
}

response = requests.post(url, json=payload)
data = response.json()
print(data)
```

### Using Postman

1. Import the included `LinkedIn_API.postman_collection.json` file
2. Set the base URL to `http://localhost:3000`
3. Select an endpoint and modify the request body as needed
4. Click "Send" to execute the request

## 🎨 Frontend Interface

The application includes a comprehensive web dashboard built with HTML, CSS, and JavaScript.

### Accessing the Dashboard

1. Start the server (see [Getting Started](#-getting-started))
2. Open your browser and navigate to: `http://localhost:3000`
3. You'll see the main dashboard with category cards for each service

### Available Pages

- **`index.html`** - Main dashboard with all service categories
- **`people-profiles.html`** - LinkedIn people profile scraping interface
- **`company-info.html`** - Company information extraction
- **`job-listings.html`** - Job search and collection
- **`posts.html`** - LinkedIn posts scraping
- **`people-search.html`** - People search functionality
- **`instagram-scraper.html`** - Instagram data collection
- **`youtube-scraper.html`** - YouTube video/channel scraping
- **`facebook-scraper.html`** - Facebook data extraction
- **`maps-scraper.html`** - Google Maps business data
- **`utilities.html`** - Snapshot and utility functions

### Dashboard Features

- ✅ Clean, modern Salesforce-inspired UI
- ✅ Real-time server health status indicator
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Interactive category cards with hover effects
- ✅ Color-coded service categories
- ✅ Easy navigation between different scrapers

## 📁 Project Structure

```
linkedin-scraper/
├── server.js                 # Main Express server & route configuration
├── package.json              # Project dependencies & scripts
├── vercel.json              # Vercel deployment configuration
├── .env.example             # Example environment variables
├── .env                     # Your environment variables (create this)
├── LinkedIn_API.postman_collection.json  # Postman API collection
│
├── routes/                  # API route handlers
│   ├── linkedin.js          # LinkedIn scraping endpoints
│   ├── instagram.js         # Instagram scraping endpoints
│   ├── youtube.js           # YouTube scraping endpoints
│   ├── facebook.js          # Facebook scraping endpoints
│   ├── googleMaps.js        # Google Maps scraping endpoints
│   └── utilities.js         # Utility & helper endpoints
│
└── public/                  # Frontend static files
    ├── index.html           # Main dashboard
    ├── styles.css           # Global styles
    ├── people-profiles.html # People profile interface
    ├── company-info.html    # Company info interface
    ├── job-listings.html    # Job listings interface
    ├── posts.html           # Posts interface
    ├── people-search.html   # People search interface
    ├── instagram-scraper.html
    ├── youtube-scraper.html
    ├── facebook-scraper.html
    ├── maps-scraper.html
    └── utilities.html
```

## 🌐 Deployment

### Deploy to Vercel

This application is pre-configured for Vercel deployment.

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `ACCESS_TOKEN` with your BrightData token
   - Redeploy if necessary

5. **Production Deployment**:
```bash
vercel --prod
```

### Deploy to Other Platforms

#### Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku config:set ACCESS_TOKEN=your_token_here
git push heroku main
```

#### Railway
1. Connect your GitHub repository
2. Add environment variable: `ACCESS_TOKEN`
3. Deploy automatically

#### DigitalOcean App Platform
1. Connect repository
2. Configure environment variables
3. Deploy with Node.js buildpack

## 🔧 Troubleshooting

### Common Issues

#### 1. "ACCESS_TOKEN is undefined"
**Solution**: Ensure your `.env` file exists and contains:
```bash
ACCESS_TOKEN=your_actual_token_here
```

#### 2. "Cannot connect to BrightData API"
**Solutions**:
- Verify your access token is valid
- Check your internet connection
- Ensure BrightData service is operational
- Verify you have sufficient credits in your BrightData account

#### 3. "Port 3000 already in use"
**Solution**: Change the port in `.env`:
```bash
PORT=3001
```

#### 4. "Module not found" errors
**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 5. Dataset returns empty results
**Solutions**:
- Verify the URL format is correct
- Check if the profile/page is public
- For LinkedIn, consider using `li_at_cookie` parameter
- Ensure you have sufficient BrightData credits

### Debug Mode

Enable detailed logging by adding to `.env`:
```bash
DEBUG=true
```

### Getting Help

- **BrightData Documentation**: https://docs.brightdata.com/
- **BrightData Support**: support@brightdata.com
- **Issue Tracker**: [Create an issue](https://github.com/yourusername/linkedin-scraper/issues)

## 📄 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ACCESS_TOKEN` | BrightData API access token | ✅ Yes | - |
| `PORT` | Server port number | ❌ No | 3000 |

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Rotate tokens periodically** - Generate new BrightData tokens regularly
3. **Use environment-specific tokens** - Different tokens for dev/staging/production
4. **Implement rate limiting** - Add rate limiting middleware for production
5. **Add authentication** - Consider adding API keys for your endpoints
6. **Monitor usage** - Track API calls to prevent abuse

## 🚦 Rate Limits

BrightData has usage limits based on your subscription plan:
- Free tier: Limited requests per month
- Paid plans: Check your dashboard for specific limits
- Implement caching to reduce API calls

## 📝 API Response Format

All endpoints return JSON responses in this format:

### Success Response
```json
{
  "success": true,
  "data": {
    "snapshot_id": "abc123",
    // ... additional data
  }
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": {
    // ... error details
  }
}
```

## 🎯 Best Practices

1. **Use snapshot IDs**: After triggering a scrape, use the snapshot ID to retrieve results
2. **Batch requests**: Send multiple URLs in a single request when possible
3. **Handle errors gracefully**: Implement proper error handling in your application
4. **Cache results**: Store frequently accessed data to reduce API calls
5. **Monitor costs**: Keep track of your BrightData usage

## 📈 Performance Tips

- Use `notify=false` in API calls for faster responses
- Implement request queuing for large batches
- Use webhooks (if available) instead of polling
- Cache snapshot results
- Implement retry logic with exponential backoff

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update README.md if adding new features
- Test endpoints before submitting PR

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [BrightData](https://brightdata.com/) for providing the scraping infrastructure
- [Express.js](https://expressjs.com/) for the web framework
- All contributors and users of this project

## 📞 Support

- **Email**: email@example.com
- **GitHub Issues**: [Report a bug](https://github.com/yourusername/linkedin-scraper/issues)
- **Documentation**: [BrightData Docs](https://docs.brightdata.com/)

## 🗺️ Roadmap

- [ ] Add webhook support for async scraping
- [ ] Implement request queuing system
- [ ] Add authentication/API keys
- [ ] Create SDK for popular languages
- [ ] Add more social media platforms
- [ ] Implement data export features (CSV, JSON, Excel)
- [ ] Add scheduling for recurring scrapes
- [ ] Create admin dashboard for monitoring

## ⚠️ Legal Disclaimer

This tool is for educational and legitimate business purposes only. Always:
- Respect robots.txt files
- Follow platform Terms of Service
- Comply with data protection laws (GDPR, CCPA, etc.)
- Obtain necessary permissions before scraping
- Use responsibly and ethically

## 📊 Version History

### v1.0.0 (Current)
- Initial release
- Support for LinkedIn, Instagram, Facebook, YouTube, Google Maps
- 35+ API endpoints
- Web dashboard interface
- Vercel deployment ready

---

