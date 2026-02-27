# CSM-LIVE API

This is a Node.js/Express-based CMS API.

## Features
- Auth (JWT, OTP)
- Artifact Management
- Security (Helmet, CORS, Rate Limiting)
- NoSQL Injection Protection

## Local Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with `MONGO_URI` and `PORT`.
4. Run `npm run dev`.

## Deployment (Live Link)

### 1. Vercel (Recommended for APIs)
This repo includes a `vercel.json` for easy deployment.
- Connect your GitHub repo to [Vercel](https://vercel.com).
- Add your environment variables (like `MONGO_URI`) in the Vercel dashboard.
- Deploy!

### 2. Render
- Create a new "Web Service" on [Render](https://render.com).
- Connect this GitHub repo.
- Set the build command to `npm install`.
- Set the start command to `node server.js`.
- Add environment variables in the settings.

## API Usage
- **Health Check**: `GET /`
- **Auth**: `/api/auth`
- **Artifacts**: `/api/artifacts`