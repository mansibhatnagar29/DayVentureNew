import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.trim();
  if (!q || q.length < 2) return NextResponse.json([]);
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en&format=json`;
    const r = await fetch(url, { next: { revalidate: 3600 } });
    if (!r.ok) throw new Error('Geocoding unavailable');
    const data = await r.json();
    return NextResponse.json((data.results || []).map((x: any) => ({id:`${x.id}`,name:x.name,country:x.country,admin1:x.admin1,latitude:x.latitude,longitude:x.longitude,timezone:x.timezone})), {headers:{'Cache-Control':'public, s-maxage=3600, stale-while-revalidate=86400'}});
  } catch { return NextResponse.json({error:'City search is temporarily unavailable.'},{status:502}); }
}
