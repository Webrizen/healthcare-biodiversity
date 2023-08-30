import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loading from "@/components/Loading";
import BlogsPage from "@/components/posts/BlogsPage";

async function fetchBlogPost() {
  const response = await fetch(
    "https://healthcare-biodiversity.vercel.app/api/blogs", { cache: 'no-store' }, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch latest post data");
  }
  const data = await response.json();
  return data.blogPosts;
}

export default async function Page() {
  const blogs = await fetchBlogPost();

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-4/5 flex flex-col gap-1 text-center justify-center items-center h-min mx-auto mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900">
            Our Blogs
          </h1>
          <div class="w-12 h-1 bg-green-500 rounded mt-2 mb-4"></div>
          </div>
         <BlogsPage blogs={blogs}  />
        </div>
      </section>
    </>
  );
}
