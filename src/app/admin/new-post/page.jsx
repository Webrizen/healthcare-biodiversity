"use client";
import React, { useState } from "react";
import styles from "@/styles/admin.module.css";
import Placeholder from "@/assets/placeholder.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import addData from "@/firebase/firestore/addData";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function Page() {
  const [blogTitle, setBlogTitle] = useState("");
  const [permalink, setPermalink] = useState("enter-your-blog-title");
  const [shortDescription, setShortDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleTitleChange = (event) => {
    const title = event.target.textContent;
    setBlogTitle(title);
    const formattedPermalink = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setPermalink(formattedPermalink);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      Swal.fire({
        icon: 'loading',
        title: 'Uploading Blog Thumbnail',
        text: 'Your blog image is uploading...',
      });
      const storage = getStorage();

      // Upload image to Firebase Storage
      const imageFile = event.target.blogImage.files[0];
      const storageRef = ref(storage, `blogImages/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      Swal.fire({
        icon: 'loading',
        title: 'Connecting With Database',
        text: 'Your blog Data is uploading...',
      });
      // Prepare blog data
      const blogData = {
        title: blogTitle,
        permalink: permalink,
        shortDescription: shortDescription,
        categories: categories,
        keywords: keywords,
        author: author,
        content: editorContent,
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
      };

      // Add blog data to Firestore using your utility function
      const firestoreResult = await addData("blogs", permalink, blogData);

      // Check if Firestore update was successful
      if (firestoreResult.error) {
        throw firestoreResult.error;
      }

      // Show success alert for image upload
      Swal.fire({
        icon: 'success',
        title: 'Image and Data Uploaded',
        text: 'Your blog image and data have been uploaded successfully!',
      });

      // Rest of the success alert remains the same...

    } catch (error) {
      // Show error alert using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the blog post.',
      });
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <>
      <div className={styles.createPost}>
        <form onSubmit={handleFormSubmit}>
          <h1
            contentEditable="true"
            onInput={handleTitleChange}
            suppressContentEditableWarning={true}
          >
            Enter Your Blog Title.
          </h1>
          <hr />
          <input
            type="text"
            id="permalink"
            name="permalink"
            style={{ padding: "5px", color: "rgba(0,0,0,0.5)", background: 'none', border: 'none' }}
            placeholder="enter-your-blog-title"
            value={`Your Blog Permalink: http://localhost:3000/blog/${permalink}`}
            readOnly
          />
          <div className={styles.imageUpload}>
            {selectedImage ? (
              <Image
                src={selectedImage}
                width={600}
                height={400}
                alt="Selected Image"
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
            <option value="Helathcare">Healthcare</option>
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
          <input
            type="text"
            name="Author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
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
            onChange={(content) => setEditorContent(content)}
          />
          <button type="submit" className={styles.createButton}>
            Create Blog Post
          </button>
        </form>
      </div>
    </>
  );
}