import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const p = new URL(req.url).searchParams; const lat=p.get('lat'), lon=p.get('lon'), city=p.get('city') || '';
  if (!lat || !lon) return NextResponse.json({error:'Coordinates required.'},{status:400});
  try {
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({action:'query',format:'json',list:'geosearch',gscoord:`${lat}|${lon}`,gsradius:'10000',gslimit:'15',gsnamespace:'0'}).toString();
    const r = await fetch(url,{headers:{'User-Agent':'DayVenture/2.0 (travel weather app)'},next:{revalidate:86400}});
    if(!r.ok) throw new Error();
    const data=await r.json(); const results=data.query?.geosearch || [];
    const filtered=results.filter((x:any)=>!/(disambiguation|category:|list of)/i.test(x.title)).slice(0,12);
    const details=await Promise.all(filtered.map(async (x:any)=>{
      try { const s=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(x.title.replace(/ /g,'_'))}`,{headers:{'User-Agent':'DayVenture/2.0'},next:{revalidate:86400}}); const d=s.ok?await s.json():{}; return {title:x.title,description:d.extract || 'Local point of interest.',url:d.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(x.title.replace(/ /g,'_'))}`,thumbnail:d.thumbnail?.source}; } catch {return {title:x.title,description:'Local point of interest.',url:`https://en.wikipedia.org/wiki/${encodeURIComponent(x.title.replace(/ /g,'_'))}`};}
    }));
    return NextResponse.json({city,places:details},{headers:{'Cache-Control':'public, s-maxage=86400, stale-while-revalidate=604800'}});
  } catch {return NextResponse.json({error:'Could not load nearby attractions.'},{status:502});}
}
