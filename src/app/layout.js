import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: {
    default: 'HealthCare Biodiversity',
    template: '%s | HealthCare Biodiversity'
  },
  description: {
    default: 'The Dynamic & Powerful Blog',
    template: '%s | HealthCare Biodiversity'
  },
  referrer: 'origin-when-cross-origin',
  publisher: 'Supratim Bhattacharya',
}

export const revalidate = 60;
export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
