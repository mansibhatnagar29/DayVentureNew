# DayVenture — Make every day an adventure.

Weather-aware travel planning dashboard built with Next.js, TypeScript and Open-Meteo.

## Features
- Global city search with autocomplete (Open-Meteo geocoding)
- Current conditions, today hourly outlook, and 7/10/15-day forecast
- Celsius temperatures, precipitation probability/amount, humidity, wind speed/direction
- Air quality indicators (US AQI, PM2.5, PM10, ozone)
- **DayVenture Score** (0–100) based on temperature, rain probability, wind and AQI; a practical outdoor-planning indicator, not a safety rating
- Weather-aware activity suggestions and conditional weather heads-up
- Nearby points of interest from Wikipedia geosearch, with broad categories
- Travel/safety/entry/weather alert links for the destination
- Responsive UI for desktop and mobile

## Data providers
- Open-Meteo Forecast & Air Quality APIs — weather and air quality
- Open-Meteo Geocoding API — city search
- Wikipedia API — nearby attractions and short descriptions
- Official government pages/search links — destination advisory research

**Important:** Travel advisories and weather alerts are not ingested as verified live government feeds in this version. The app links to official sources and targeted searches. The DayVenture Score is a heuristic and should not be treated as an authoritative travel safety assessment.

## Run locally
1. Install Node.js 20+
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## Deploy to Vercel
Push the project to GitHub, import the repository in Vercel, select Next.js, and deploy. No API keys are required for the public API endpoints used in this starter.

## Build check
Run `npm run build` before deploying.

## Attribution
Weather data by [Open-Meteo](https://open-meteo.com/). Attractions and summaries are surfaced from Wikipedia. Check official sources for advisories, entry requirements and current alerts.
