"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import Image from "next/image";
import { Typography, Avatar, IconButton, Button } from "@material-tailwind/react";
import { BsDot, BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FiMail, FiLink } from "react-icons/fi";
import Swal from "sweetalert2";

async function fetchBlogData(blogId) {
  const db = getFirestore(firebase_app);
  const blogRef = doc(db, "blogs", blogId);

  const snapshot = await getDoc(blogRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
}

export default function singleBlog({ id }) {
  const blogId = id;
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const incrementViewCount = async () => {
    try {
      const db = getFirestore(firebase_app);
      const blogRef = doc(db, "blogs", blogId);

      // Get the blog document
      const snapshot = await getDoc(blogRef);

      if (snapshot.exists()) {
        const blogData = snapshot.data();

        // Calculate the updated view count
        const updatedViews = (blogData.views || 0) + 1;

        // Update the document with the new view count
        await setDoc(blogRef, { views: updatedViews }, { merge: true });
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };
  // Call the function when the component mounts
  incrementViewCount();

  
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

  const incrementLikeCount = async () => {
    try {
      if (!hasLiked) {
        const db = getFirestore(firebase_app);
        const blogRef = doc(db, "blogs", blogId);

        await runTransaction(db, async (transaction) => {
          const snapshot = await transaction.get(blogRef);
          if (snapshot.exists()) {
            const blogData = snapshot.data();

            const updatedLikes = (blogData.likes || 0) + 1;

            transaction.update(blogRef, { likes: updatedLikes });
            setLikeCount(updatedLikes);
            setHasLiked(true);

            // Show success message using SweetAlert2
            Swal.fire({
              icon: "success",
              title: "Liked!",
              text: "You have successfully liked the blog.",
            });
          }
        });
      }
    } catch (error) {
      console.error("Error incrementing like count:", error);
      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while liking the blog. Please try again later.",
      });
    }
  };

  useEffect(() => {
    incrementViewCount();
    const fetchData = async () => {
      const blogData = await fetchBlogData(blogId);
      if (blogData) {
        setViewCount(blogData.views || 0);
        setLikeCount(blogData.likes || 0);
        setHasLiked(blogData.likes > 0);
        setBlogData(blogData);
      }
    };
    fetchData();
  }, [blogId]);

  function timeAgo(timestamp) {
    const currentDate = new Date();
    const providedDate = new Date(timestamp.seconds * 1000);
  
    const timeDifference = currentDate - providedDate;
    const seconds = Math.floor(timeDifference / 1000);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} years ago`;
    }
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <h1 className="text-5xl font-medium mb-4">{blogData?.title || 'Loading...'}</h1>
        <div className="bg-cover text-center overflow-hidden rounded-xl">
          <figure>
            <Image
              src={blogData?.imageUrl || "/placeholder.svg"}
              alt="Blog Image"
              width={600}
              height={400}
              className="w-full rounded-xl"
            />
            <figcaption className="mt-2 text-center font-normal">
            {blogData?.title || 'Image caption'}
            </figcaption>
          </figure>
        </div>
        <div className="max-w-screen-xl mx-auto my-5">
          <div className="top-content my-4 flex flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <Avatar src="/placeholder.svg" alt="avatar | Author Profile PIC" />
              <div>
                <Typography variant="h6">{blogData?.author || 'Author Name'}</Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal flex flex-row gap-1 items-center justify-center"
                >
                  {blogData?.timestamp ? `Posted ${timeAgo(blogData.timestamp)}` : 'Posted - ago'} <BsDot /> {blogData?.categories || 'Category'}
                </Typography>
              </div>
            </div>
            <div className="flex gap-4">
              <IconButton color="blue">
                <BsTwitter />
              </IconButton>
              <IconButton color="red">
                <BsFacebook />
              </IconButton>
              <IconButton color="green">
                <BsLinkedin />
              </IconButton>
              <IconButton color="amber">
                <FiMail />
              </IconButton>
              <IconButton color="teal">
                <FiLink />
              </IconButton>
            </div>
          </div>
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div 
            className="content"
            dangerouslySetInnerHTML={{ __html: blogData?.content || 'Loading Content...' }}
             />
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-min p-2 rounded-3xl mx-auto sticky bottom-2 left-0 right-0">
      <Button variant="text" className="flex flex-row gap-1 items-center rounded-full">
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
          <span>{formatNumber(viewCount)}</span>
      </Button>
      <Button variant="gradient" className="flex flex-row gap-1 items-center rounded-full" onClick={incrementLikeCount}>
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
          <span>{formatNumber(likeCount)}</span>
      </Button>
      </div>
    </>
  );
}
