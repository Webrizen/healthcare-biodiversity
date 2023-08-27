"use client";
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config"; // Make sure this import is correct

export default function Page({ params }) {
  const blogId = params.id;

  const incrementViewCount = async () => {
    try {
      const db = getFirestore(firebase_app);
      const blogRef = doc(db, 'blogs', blogId);

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
      console.error('Error incrementing view count:', error);
    }
  };

  // Call the function when the component mounts
  incrementViewCount();

  return (
    <>
      <div>My Post: {params.id}</div>
    </>
  )
}