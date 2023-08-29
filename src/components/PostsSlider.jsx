"use client";
import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export function PostsSlider() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint here
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        // setBlogPosts();
        setBlogPosts(data.blogPosts.slice(0, 7));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const loadingPlaceholder = (
    <div className="p-4 w-full rounded-lg overflow-hidden animate-pulse" style={{ height: "500px" }}>
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden relative">
        <div className="h-72 bg-gray-300"></div>
        <div className="p-6 absolute bottom-0 left-0 right-0 rounded-lg bg-gray-800 bg-opacity-50">
          <div className="rounded-full w-24 h-6 bg-gray-300 mb-2"></div>
          <div className="h-6 bg-gray-300 w-4/5 mb-3"></div>
          <div className="h-4 bg-gray-300 w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 w-2/5 mb-2"></div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-20 bg-gray-300"></div>
            <div className="h-6 w-12 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-6 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {blogPosts.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>{loadingPlaceholder}</div>
          ))
        : blogPosts.map((post) => (
        <div
          key={post.id}
          className=" w-full rounded-lg overflow-hidden"
          style={{ height: "500px" }}
        >
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden relative">
            <Image
              className="h-full w-full object-cover object-center"
              src={post.imageUrl}
              alt="blog"
              width={600}
              height={400}
            />
            <div className="p-6 absolute bottom-0 left-0 right-0 rounded-lg" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent)' }}>
              <div className="rounded-full w-min p-2 text-blue-gray-500 bg-transparent backdrop-blur-md whitespace-nowrap text-xs mb-2">{post.categories}</div>
              <h1 className="title-font text-3xl font-medium text-white mb-3">
                {post.title}
              </h1>
              <p className="leading-relaxed mb-3 truncate text-white">
                {post.shortDescription}
              </p>
              <div className="flex items-center flex-wrap ">
                <Link href={`/blogs/${post.id}`} className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {formatNumber(post.views || 0)}
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>

                  {formatNumber(post.likes || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
