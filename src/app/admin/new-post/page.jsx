"use client";
import React, { useState } from "react";
import styles from "@/styles/admin.module.css";
import Placeholder from "@/assets/placeholder.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [permalink, setPermalink] = useState("enter-your-blog-title");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleTitleChange = (event) => {
    const title = event.target.textContent; // Use textContent to get the actual content
    setBlogTitle(title);

    // Generate permalink from title
    const formattedPermalink = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove special characters and replace with "-"
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
    setPermalink(formattedPermalink);
  };

  return (
    <>
      <div className={styles.createPost}>
        <form>
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
          <label htmlFor="categories">Categories*</label>
          <select name="categories">
            <option value="">Select</option>
            <option value="Helathcare">Healthcare</option>
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
          />
        </form>
      </div>
    </>
  );
}
