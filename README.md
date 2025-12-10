# TrendSpotterLabs

TrendSpotterLabs Website - A NestJS Application

## Analytics & Reporting Services

Welcome to our analytics service! We help businesses, agencies, and individuals transform raw data into actionable insights through intelligent dashboards, automated reporting, and real-time analytics solutions.

## 🚀 What we Offer

- **Meta Ads Reporting**  
  In-depth analysis of Facebook and Instagram ad performance, including metrics like CTR, CPC, ROAS, and more.

- **Social Media Analytics**  
  Track engagement, follower growth, and content performance using the Facebook Graph API with automated data pipelines.

- **Custom Dashboards & Reports**  
  Visualize key metrics in interactive dashboards built with Looker Studio and Metabase, connected to platforms like Google Sheets, BigQuery, and SQL databases.

- **Automated Data Workflows**  
  Use tools like Google Apps Script, AppSheet, and automated pipelines to eliminate manual reporting and deliver real-time updates.

## 🛠 Tools & Technologies

- Looker Studio (Google Data Studio)
- Metabase
- SQL / NoSQL (BigQuery, MongoDB, MySQL)
- Facebook Graph API
- Google Sheets + Apps Script
- AppSheet

## 🎯 Outcomes You Can Expect

- Faster, data-driven decision-making
- Saved time through automation (up to 10 hours/month)
- Better visibility into ROI and campaign performance
- Unified dashboards for smarter strategy execution

## 🔧 Getting Started

### Prerequisites
- Node.js (v20.x or higher)
- npm (v10.x or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
```bash
npm run start:dev
```
The application will start on `http://localhost:3000`

#### Production Mode
```bash
npm run build
npm run start:prod
```

### API Endpoints

- `POST /api/contact/submit` - Submit contact form
  - Request body: `{ name, email, message, phone?, company? }`
  - All form submissions are saved to Google Sheets automatically

### Project Structure

- `src/` - NestJS application source code
  - `main.ts` - Application entry point
  - `app.module.ts` - Root application module
  - `contact/` - Contact form module
    - `contact.controller.ts` - API endpoints
    - `contact.service.ts` - Business logic and Google Sheets integration
    - `dto/` - Data Transfer Objects for validation
  - `config/` - Configuration files (hardcoded credentials)
- `public/` - Static files (HTML, CSS, JavaScript)
- `dist/` - Compiled output (generated after build)

### Configuration

All configurations including Google Sheets credentials are hardcoded in the application:
- Google Sheets credentials: `src/config/google-sheets.config.ts`
- Spreadsheet ID and range are configured in the same file

### Services & Integration

The application integrates with Google Sheets API to automatically save form submissions. The service account credentials are hardcoded in the configuration file.

---

## 📊 Original Service Information

### What we offer

1. Schedule a free consultation
2. Define your data goals and KPIs
3. Receive a custom analytics strategy
4. Get your dashboards, reports, and automation delivered
5. Enjoy ongoing support if needed

---

Ready to get started or have questions?  
**Let’s turn your data into decisions.**
