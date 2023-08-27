"use client";
import React from "react";
import styles from "@/styles/navbar.module.css";
import Image from "next/image";
import Logo from "@/assets/logo.webp";
import { IconButton  } from "@material-tailwind/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
        <div className={styles.logo}>
          <Image
            src={Logo}
            alt="Healthcare Biodiversity"
            width={45}
            height={45}
          />
          <span>Healthcarebiodiversity</span>
        </div>
        </Link>
        <div className={styles.links}>
          <IconButton  variant="text" className={styles.ico}>
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
          <IconButton  variant="text" className={styles.ico}>
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
        </div>
      </header>
    </>
  );
}
