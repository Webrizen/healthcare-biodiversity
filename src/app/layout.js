import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: {
    default: 'healthcare biodiversity',
    template: '%s | healthcare biodiversity'
  },
  description: {
    default: 'Welcome to healthcare biodiversity a vibrant online hub dedicated to enhancing your holistic well-being and nurturing your curiosity about the diverse wonders of health care and biodiversity.',
    template: '%s | healthcare biodiversity'
  },
  applicationName: 'healthcare biodiversity',
  generator: 'healthcare biodiversity',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'healthcare biodiversity',
    'Nutrition & Diet',
    'Fitness & Exercise',
    'Mental Health & Wellness',
    'Medical Conditions',
    "Women's Health",
    "Men's Health",
    'Healthy Lifestyle',
    'Weight Loss & Management',
    "Children's Health",
    'Aging & Senior Health',
    'Chronic Illness Support',
    'Healthy Recipes',
    'Healthy Habits',
    'Wellness Tips',
    'Health Education',
    'Preventive Care',
    'Mindfulness',
    'Work-Life Balance',
    'Stress Management',
    'Healthy Living',
    'Holistic Health',
    'Physical Fitness',
    'Healthy Mindset',
    'Self-Care',
    'Well-Being',
    'Health Benefits',
    'Disease Prevention',
    'Healthy Eating',
    'Mental Clarity',
    'Healthy Aging',
    'Natural Remedies',
    'Fitness Challenges',
    'Yoga & Meditation',
    'Exercise Routines',
    'Healthy Heart',
    'Health Research',
    'Health Tips',
    'Health News',
    'Healthcare Technology',
    'Healthy Sleep',
    'Mental Wellness',
    'Emotional Health',
    'Healthy Environment',
    'Nutritional Supplements',
    'Healthy Skin',
    'Healthy Hair',
    'Hydration',
    'Immune System',
    'Healthcare Trends',
    'Healthcare Solutions',
    'Healthcare Innovations',
    'Healthy Workspaces',
    'Holistic Healing',
    'Environmental Health',
    'Plant-Based Nutrition',
    'Outdoor Fitness',
    'Mind-Body Connection',
    'Green Living',
    'Biodiversity Conservation',
    'Eco-Friendly Lifestyle',
    'Sustainable Health Practices',
    'Holistic Wellness',
    'Organic Living',
    'Eco-conscious Choices',
    'Natural Living',
    'Bio-Diversity',
    'Green Healthcare',
    'Climate Resilience',
    'Nature-based Healing',
    'Eco-Wellness',
    'Healthy Planet',
    'Biodiversity Awareness',
  ],
  authors: [{ name: 'Supratim Bhattacharya', url: 'https://healthcarebiodiversity.com'}],
  publisher: 'Supratim Bhattacharya',
  metadataBase: new URL('https://healthcarebiodiversity.com'),
  openGraph: {
    title: 'healthcare biodiversity',
    description: 'Welcome to healthcare biodiversity a vibrant online hub dedicated to enhancing your holistic well-being and nurturing your curiosity about the diverse wonders of health care and biodiversity.',
    url: 'https://healthcarebiodiversity.com',
    siteName: 'healthcare biodiversity',
    images: [
      {
        url: 'https://healthcarebiodiversity.com/logo.webp',
        width: 500,
        height: 500,
        alt: 'healthcare biodiversity'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.webp',
    },
  },
  manifest: 'https://healthcarebiodiversity.com/manifest.json',
  twitter: {
    card: 'summary_large_image',
    title: 'healthcare biodiversity',
    description: 'Welcome to healthcare biodiversity a vibrant online hub dedicated to enhancing your holistic well-being and nurturing your curiosity about the diverse wonders of health care and biodiversity.',
    creator: '@Healthcarebiodi',
    images: ['https://healthcarebiodiversity.com/logo.webp'],
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['support@healthcarebiodiversity.com', 'healthcarebiodiversity.com'],
    },
  },
  category: 'healthcare',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
