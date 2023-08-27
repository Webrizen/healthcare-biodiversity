"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/admin.module.css";
import Placeholder from "@/assets/placeholder.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import firebase_app from "@/firebase/config";
import {
  serverTimestamp,
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import addData from "@/firebase/firestore/addData";
import { Button } from "@material-tailwind/react";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const db = getFirestore(firebase_app);

export default function page({ params }) {
  const id = params.id;

  const [blogData, setBlogData] = useState({});
  const [blogTitle, setBlogTitle] = useState("");
  const [permalink, setPermalink] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Display SweetAlert2 while uploading image
        Swal.fire({
          title: "Uploading Image...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        const storage = getStorage(firebase_app);
        const storageRef = ref(storage, `blogImages/${permalink}-${Date.now()}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        setSelectedImage(downloadURL);

        // Close SweetAlert2 after successful upload
        Swal.close();
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire("Error", "Failed to upload image", "error");
      }
    }
  };

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setAllCategories(data.categories); // Make sure you're setting data.categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchAllCategories();
  }, []);

  useEffect(() => {
    async function fetchAllAuthors() {
      try {
        const response = await fetch("/api/authors");
        const data = await response.json();
        setAllAuthors(data); // Set the fetched authors data
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    }

    fetchAllAuthors();
  }, []);

  const handleTitleChange = (event) => {
    const title = event.target.textContent;
    setBlogTitle(title);
    const formattedPermalink = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setPermalink(formattedPermalink);
  };

  useEffect(() => {
    async function fetchBlogData() {
      const db = getFirestore(firebase_app);
      const docRef = doc(db, "blogs", id);

      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setBlogData(data);
          setBlogTitle(data.title);
          setPermalink(data.permalink);
          setShortDescription(data.shortDescription);
          setCategories(data.categories);
          setKeywords(data.keywords);
          setAuthor(data.author);
          setEditorContent(data.content);
          setSelectedImage(data.imageUrl);
        } else {
          alert("No Data");
        }
      } catch (error) {
        console.error("Error fetching document data:", error);
        alert(error);
      }
    }

    if (id) {
      fetchBlogData();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Update the document ID (slug) if the title has changed
    if (blogTitle !== blogData.title) {
      const newPermalink = blogTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setPermalink(newPermalink);
    }

    // Update the blog data in Firestore
    const updatedBlogData = {
      title: blogTitle,
      permalink,
      shortDescription,
      categories,
      keywords,
      author,
      content: editorContent,
      imageUrl: selectedImage,
      updatedAt: serverTimestamp(),
    };

    try {
      const docRef = doc(db, "blogs", id);
      await setDoc(docRef, updatedBlogData, { merge: true });
      Swal.fire("Success", "Blog post updated successfully", "success");
    } catch (error) {
      console.error("Error updating blog post:", error);
      Swal.fire("Error", "Failed to update blog post", "error");
    }
  };

  return (
    <>
      <div className={styles.createPost}>
        <form onSubmit={handleFormSubmit}>
        <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Enter your blog title"
            className={styles.blogTitleInput}
          />
          <hr />
          <input
            type="text"
            id="permalink"
            name="permalink"
            style={{
              padding: "5px",
              color: "rgba(0,0,0,0.5)",
              background: "none",
              border: "none",
            }}
            placeholder="enter-your-blog-title"
            value={`Your Blog Permalink: https://healthcare-biodiversity.vercel.app/blog/${permalink}`}
            readOnly
          />
          <div className={styles.imageUpload}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected Image"
              width={600}
              height={400}
            />
          ) : (
            <Image
              src={Placeholder}
              width={600}
              height={400}
              alt="Placeholder"
            />
          )}
            <input type="file" name="blogImage" onChange={handleImageChange} />
            <div className={styles.infoModel}>
              Choose a Thumbnail Image for Your Blog Post.
            </div>
          </div>
          <label htmlFor="shortDescription">Short Description*</label>
          <textarea
            name="shortDescription"
            required
            cols="30"
            rows="10"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          ></textarea>
          <label htmlFor="categories">Categories*</label>
          <select
            name="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="">Select</option>
            {Object.keys(allCategories).map((categoryId) => (
              <option key={categoryId} value={categories}>
                {allCategories[categoryId].name}
              </option>
            ))}
          </select>

          <label htmlFor="Keywords">Keywords*</label>
          <input
            type="text"
            name="Keywords"
            placeholder="Keyword1, Keyword2, keyword3"
            required
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <label htmlFor="Author">Author*</label>
          <select
            name="Author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="">Select</option>
            {allAuthors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <label htmlFor="Content">Add Life To Your Blog*</label>
          <SunEditor
            width="100%"
            setOptions={{
              height: 500,
              buttonList: [
                [
                  "formatBlock",
                  "font",
                  "fontSize",
                  "fontColor",
                  "align",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                ["table", "list"],
                ["link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
              ],
            }}
            setContents={editorContent}
            onChange={(content) => setEditorContent(content)}
          />
          <Button type="submit" className={styles.createButton}>
            Update Blog Post
          </Button>
        </form>
      </div>
    </>
  );
}