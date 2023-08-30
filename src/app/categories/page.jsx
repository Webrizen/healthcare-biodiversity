import CategoriesList from "@/components/CategoriesList";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: 'Categories',
  description: `Explore a diverse range of health care and biodiversity topics on our blog website's Categories page. Discover insightful content covering various aspects of these vital niches.`,
}

async function fetchCategories() {
  const response = await fetch(
    "https://healthcare-biodiversity.vercel.app/api/categories", { cache: 'no-store' }, { next: { revalidate: 30 } });
  if (!response.ok) {
    throw new Error("Failed to fetch latest post data");
  }
  const data = await response.json();
  return data.categories;
}

export default async function page() {
  const blogs = await fetchCategories();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container sm:p-24 p-10 mx-auto">
          <div className="lg:w-2/3 flex sm:flex-row sm:items-center items-center mx-auto border-b-2 py-3">
            <h1 className="flex-grow sm:pr-16 sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Categories
            </h1>
            <Link href="/blogs" className="flex-shrink-0 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg sm:mt-0">
              Read Blogs
            </Link>
          </div>
          <CategoriesList data={blogs} />
        </div>
      </section>
    </>
  );
}
