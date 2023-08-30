"use client";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function BlogsPage({ blogs }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [visibleBlogs, setVisibleBlogs] = useState([]);

  const postsPerPage = 6;

  useEffect(() => {
    setVisibleBlogs(blogs.slice(0, postsPerPage));
  }, [blogs]);

  const loadMoreBlogs = () => {
    setLoading(true);
    setTimeout(() => {
      const startIndex = page * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newVisibleBlogs = [
        ...visibleBlogs,
        ...blogs.slice(startIndex, endIndex),
      ];
      setVisibleBlogs(newVisibleBlogs);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

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
      <div className="flex flex-wrap -m-4">
        {visibleBlogs.map(
          ({
            id,
            imageUrl,
            categories,
            title,
            shortDescription,
            views,
            likes,
          }) => (
            <div key={id} className="p-4 md:w-1/3 overflow-hidden">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-48 md:h-36 object-cover object-center"
                  src={imageUrl || '/placeholder.svg'}
                  alt="blog"
                  width={600}
                  height={400}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {categories || "No Data Found"}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {title || "No Data Found"}
                  </h1>
                  <p className="leading-relaxed mb-3 truncate">
                    {shortDescription || "No Data Found"}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <Link
                      href={`/blogs/${id}`}
                      className="text-green-500 inline-flex items-center md:mb-2 lg:mb-0"
                      aria-label={title || "No Data Found"}
                    >
                      Read More
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
                      {formatNumber(views || 0)}
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
                      {formatNumber(likes || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex flex-row justify-center text-center items-center w-full">
            <Spinner />
          </div>
        )}
        {!loading && visibleBlogs.length < blogs.length && (
          <div className="flex flex-row justify-center text-center items-center w-full">
            <button
              onClick={loadMoreBlogs}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 mx-auto my-2"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
