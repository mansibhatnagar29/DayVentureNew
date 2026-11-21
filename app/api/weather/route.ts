import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const lat = p.get('lat'), lon = p.get('lon');
  if (!lat || !lon || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) return NextResponse.json({error:'Valid latitude and longitude required.'},{status:400});
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.search = new URLSearchParams({latitude:lat,longitude:lon,timezone:'auto',forecast_days:'16',current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m',hourly:'temperature_2m,precipitation_probability,precipitation,relative_humidity_2m,wind_speed_10m,weather_code',daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset',temperature_unit:'celsius',wind_speed_unit:'kmh'}).toString();
    const weather = await fetch(url,{next:{revalidate:900}});
    const aqUrl = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
    aqUrl.search = new URLSearchParams({latitude:lat,longitude:lon,timezone:'auto',current:'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,sulphur_dioxide,us_aqi,european_aqi',hourly:'pm10,pm2_5,us_aqi',forecast_days:'5'}).toString();
    const air = await fetch(aqUrl,{next:{revalidate:1800}});
    if (!weather.ok) throw new Error('Weather source failed');
    const w = await weather.json();
    const a = air.ok ? await air.json() : null;
    return NextResponse.json({weather:w,air:a},{headers:{'Cache-Control':'public, s-maxage=900, stale-while-revalidate=3600'}});
  } catch { return NextResponse.json({error:'Weather data could not be loaded. Please try again.'},{status:502}); }
}
