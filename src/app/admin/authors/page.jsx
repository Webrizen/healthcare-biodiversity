"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { Button } from "@material-tailwind/react";
import styles from "@/styles/admin.module.css";
import Placeholder from "@/assets/profile-placeholder.svg";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthorsTable } from "@/components/admin/AuthorsTable";

export default function Page() {
  const [activeTab, setActiveTab] = useState("form");
  const [authorName, setAuthorName] = useState("");
  const [bio, setBio] = useState("");
  const [permalink, setPermalink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const db = getFirestore(firebase_app); // Initialize Firestore

  // Function to generate a slug from Authors name
  const generatePermalink = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/-$/, "");
  };

  const handleAuthorNameChange = (event) => {
    const newName = event.target.value;
    const newPermalink = generatePermalink(newName);
    setAuthorName(newName);
    setPermalink(newPermalink);
  };

  const handleBioChange = (event) => {
    const bioText = event.target.value;
    setBio(bioText);
  };

  //handle Image Uploads:
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleFormSubmit = async () => {
    event.preventDefault();

    try {
      const storage = getStorage();

      // Upload image to Firebase Storage
      const imageFile = event.target.blogImage.files[0];
      const storageRef = ref(storage, `authorImages/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Prepare author data
      const authorData = {
        name: authorName,
        bio: bio,
        imageUrl: imageUrl,
      };

      // Add author data to Firestore
      const authorDocRef = doc(collection(db, "authors"), permalink);
      await setDoc(authorDocRef, authorData);

      Swal.fire({
        icon: "success",
        title: "Author Created",
        text: "The author has been created successfully!",
      });

      // Reset form fields
      setAuthorName("");
      setPermalink("");
      setSelectedImage(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the author.",
      });
      console.error("Error creating author:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white p-2">
        <h1 className="text-3xl font-semibold h1 mb-2 py-2">
          Authors Management
        </h1>
        <div className="flex gap-3 items-center border-b border-gray-300 pb-4 mt-2">
          <Button
            className={`py-2 px-4 rounded ${activeTab === "form"}`}
            onClick={() => setActiveTab("form")}
          >
            Add Authors
          </Button>
          <Button
            className={`py-2 px-4 rounded ${activeTab === "datatable"}`}
            onClick={() => setActiveTab("datatable")}
          >
            Authors List
          </Button>
        </div>

        {activeTab === "form" && (
          <div className="mt-6 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl h1 py-2">Create New Authors</h2>
            <form
              className="border-t border-gray-300"
              onSubmit={handleFormSubmit}
            >
              <div className="relative mb-2 py-4">
                <div
                  className={styles.imageUpload}
                  style={{ marginBottom: "10px" }}
                >
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      width={500}
                      height={500}
                      alt="Selected Image"
                    />
                  ) : (
                    <Image
                      src={Placeholder}
                      width={500}
                      height={500}
                      alt="Placeholder"
                    />
                  )}
                  <input
                    type="file"
                    name="blogImage"
                    onChange={handleImageChange}
                  />
                  <div className={styles.infoModel}>
                    Choose a Authors Image.
                  </div>
                </div>
                <label
                  htmlFor="CategoryName"
                  className="leading-7 text-sm text-gray-600"
                >
                  Author Name*
                </label>
                <input
                  type="text"
                  id="AuthorName"
                  name="AuthorName"
                  value={authorName}
                  onChange={handleAuthorNameChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                   text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <label
                  htmlFor="AuthorsBio"
                  className="leading-7 text-sm text-gray-600"
                >
                  Author Bio*
                </label>
                <textarea
                  name="AuthorsBio"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  cols="30"
                  rows="10"
                  value={bio}
                  onChange={handleBioChange}
                ></textarea>
              </div>
              <div className="relative mb-2 py-0 text-gray-400 text-xs">
                {`Your Authors Permalink: http://localhost:3000/authors/${permalink}`}
              </div>
              <Button type="submit">Add</Button>
            </form>
          </div>
        )}

        {activeTab === "datatable" && (
          <div className="mt-6 p-0 bg-white rounded-md shadow-md">
            <AuthorsTable />
          </div>
        )}
      </div>
    </div>
  );
}
