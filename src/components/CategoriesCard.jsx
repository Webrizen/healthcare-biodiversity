"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, where, getDocs, doc, getDoc, query } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import Link from 'next/link';
import { Spinner } from '@material-tailwind/react';

export default function CategoriesCard({ params }) {
  const db = getFirestore(firebase_app);

  const [categoryName, setCategoryName] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch category name from Firestore
    const categoryRef = doc(db, 'Categories', params);
    getDoc(categoryRef)
      .then(doc => {
        if (doc.exists()) {
          setCategoryName(doc.data().name);
        }
      })
      .catch(error => {
        console.error('Error fetching category:', error);
        setIsLoading(false);
      });
  }, [db, params]);

  useEffect(() => {
    if (categoryName) {
      // Fetch blog posts from Firestore
      const blogsRef = collection(db, 'blogs');
      const blogsQuery = query(blogsRef, where('categories', '==', categoryName));
      getDocs(blogsQuery)
        .then(snapshot => {
          const filtered = snapshot.docs.map(doc => doc.data());
          setFilteredBlogs(filtered);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching blogs:', error);
          setIsLoading(false);
        });
    }
  }, [db, categoryName]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold mb-4">{categoryName}</h1>
      {filteredBlogs.length === 0 ? (
        <p>No blog posts found for this category.</p>
      ) : (
        filteredBlogs.map(blog => (
          <div key={blog.id} className="mb-6 p-4 hover:bg-gray-100 rounded-md cursor-pointer border-gray-100 border-2">
            <h2 className="text-xl font-medium mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.shortDescription}</p>
            <Link href={`/blogs/${blog.permalink}`} className="text-green-500 inline-flex items-center mt-2">
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
          </div>
        ))
      )}
    </div>
  );
}
