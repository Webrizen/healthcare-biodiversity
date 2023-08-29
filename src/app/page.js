import { PostsSlider } from '@/components/PostsSlider';
import SixPosts from '@/components/posts/SixPosts';
import Link from 'next/link';

async function fetchBlogPost() {
  const response = await fetch(
    "https://healthcare-biodiversity.vercel.app/api/blogs", { cache: 'no-store' }, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch latest post data");
  }
  const data = await response.json();
  return data.blogPosts;
}

export default async function Home() {
  const blogs = await fetchBlogPost();

  function formatNumber(number) {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (number >= billion) {
      return (number / billion).toFixed(1) + "B";
    } else if (number >= million) {
      return (number / million).toFixed(1) + "M";
    } else if (number >= thousand) {
      return (number / thousand).toFixed(1) + "k";
    } else {
      return number;
    }
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="rounded-full w-min p-2 px-4 text-blue-gray-500 bg-gray-100 whitespace-nowrap text-xs mb-4">Healthcarebiodiversity</div>
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Empower Your Well-being: Explore a World of Free Health, Wellness, and Biodiversity Insights!</h1>
            <p className="mb-8 leading-relaxed">
              Welcome to our vibrant online hub dedicated to enhancing your holistic well-being and nurturing your curiosity about the diverse wonders of health care and biodiversity. Discover a treasure trove of free, insightful content that empowers you to lead a healthier and more sustainable life. Join us in celebrating the incredible tapestry of life while cultivating a healthier you and a greener world. Explore our free content today and embark on a journey towards well-being and biodiversity enlightenment!</p>
            <div className="flex justify-center">
              <Link href="#explore">
                <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Explore</button></Link>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Join Our Community</button>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font" id='explore'>
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-2/3 mx-auto">
            <div className="flex flex-wrap w-full bg-gray-100 rounded-md relative mb-4">
              <PostsSlider />
            </div>
            <div className="flex flex-wrap -mx-2 p-2">
              <SixPosts data={blogs} />
            <Link href="/blogs" className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg mx-auto mt-3">Read More.</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}