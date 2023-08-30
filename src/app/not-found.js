import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from '@/assets/404.gif';

export const metadata = {
  title: "404 - Page Not Found",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function NotFound() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={NotFoundImage} />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">404 - Page Not Found</h1>
          <p className="mb-8 leading-relaxed">Oops! Page not found. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <div className="flex justify-center">
            <Link href="/"><button>Go Back</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}