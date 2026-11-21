import {NextResponse} from 'next/server';
export async function GET(req:Request){
 const p=new URL(req.url).searchParams; const city=p.get('city')||''; const country=p.get('country')||'';
 const destination=encodeURIComponent([city,country].filter(Boolean).join(' '));
 return NextResponse.json({city,country,links:[
  {label:'U.S. State Department travel advisories',url:`https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html`},
  {label:'UK Foreign Travel Advice',url:`https://www.gov.uk/foreign-travel-advice`},
  {label:'Search official advisories for this destination',url:`https://www.google.com/search?q=${destination}+official+travel+advisory`},
  {label:'Check local weather warnings',url:`https://www.google.com/search?q=${destination}+weather+warnings+official`}
 ],note:'Travel advisories are country-level and change frequently. DayVenture links to official sources but does not yet automatically aggregate or verify live government alerts for this city.'});
}
