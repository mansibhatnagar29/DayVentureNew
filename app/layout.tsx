import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'DayVenture | Make every day an adventure',description:'Weather intelligence, travel safety links, air quality and weather-aware destination inspiration.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
