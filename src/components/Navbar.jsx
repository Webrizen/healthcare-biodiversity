"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/navbar.module.css";
import Image from "next/image";
import Logo from "@/assets/logo.webp";
import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import Link from "next/link";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const categoriesContainerRef = useRef(null);
  const isLoading = categories.length === 0;

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleScrollLeft = () => {
    if (categoriesContainerRef.current) {
      categoriesContainerRef.current.scrollLeft -= 100; // Adjust as needed
      setScrollLeft(categoriesContainerRef.current.scrollLeft);
    }
  };

  const handleScrollRight = () => {
    if (categoriesContainerRef.current) {
      categoriesContainerRef.current.scrollLeft += 100; // Adjust as needed
      setScrollLeft(categoriesContainerRef.current.scrollLeft);
    }
  };

  return (
    <>
      <header className={styles.Navbar}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            <Image
              src={Logo}
              alt="Healthcare Biodiversity"
              width={45}
              height={45}
            />
          </Link>
          <div className="flex flex-row gap-1 items-center w-1/2 rounded-3xl text-blue-gray-500 bg-gray-100 px-2">
            <IconButton variant="text" className={styles.ico}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </IconButton>
            <input
              type="search"
              placeholder="Search The Healthy Web..."
              className="w-full bg-transparent h-full outline-none border-none"
            />
            <IconButton variant="text" className={styles.ico}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </IconButton>
          </div>
          <div className={styles.links}  style={{ zIndex: '999999' }}>
            <Link href="/notifications">
            <IconButton variant="text" className={styles.ico}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                  </svg>
                </IconButton>
            </Link>
            <Link href="/settings">
            <IconButton variant="text" className={styles.ico}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </IconButton>
            </Link>
          </div>
        </div>
        <div
          className={`${styles.categoriescol} flex flex-row gap-1 px-2 w-4/5 mx-auto my-2`}
        >
          {scrollLeft > 0 && (
            <IconButton
              variant="text"
              className={styles.icocat}
              onClick={handleScrollLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </IconButton>
          )}
          <div
            ref={categoriesContainerRef}
            className="flex flex-row gap-2 overflow-x-auto"
            style={{ flex: "1" }}
          >
            {isLoading ? (
              Array.from({ length: 50 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-full w-28 h-2 p-2 bg-gray-300 animate-pulse"
                >..................</div>
              ))
            ) : (
              categories.map((category) => (
                <Link href={`/categories/${category.id}`} key={category.id}>
                  <div className="rounded-full w-min p-2 text-blue-gray-500 bg-gray-100 whitespace-nowrap text-xs">
                    {category.name}
                  </div>
                </Link>
              ))
            )}
          </div>
          {categoriesContainerRef.current &&
            scrollLeft <
              categoriesContainerRef.current.scrollWidth -
                categoriesContainerRef.current.clientWidth && (
              <IconButton
                variant="text"
                className={styles.icocat}
                onClick={handleScrollRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </IconButton>
            )}
        </div>
      </header>
    </>
  );
}
