"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebase_app  from "@/firebase/config";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { Button } from "@material-tailwind/react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("form");
  const [categoryName, setCategoryName] = useState("");
  const [permalink, setPermalink] = useState("");

  const db = getFirestore(firebase_app); // Initialize Firestore

  // Function to generate a slug from category name
  const generateSlug = (input) => {
    return input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handler to update permalink when category name changes
  const handleCategoryNameChange = (event) => {
    const newName = event.target.value;
    setCategoryName(newName);
    setPermalink(generateSlug(newName));
  };

  // Handler to add category data to Firestore
  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      // Prepare category data
      const categoryData = {
        name: categoryName,
        permalink: permalink,
      };

      // Add category data to Firestore
      await setDoc(doc(db, "Categories", permalink), categoryData);

      // Show success alert using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Category Added",
        text: "Category has been added successfully!",
      });

      // Clear form fields
      setCategoryName("");
      setPermalink("");
    } catch (error) {
      // Show error alert using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the category.",
      });
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white p-2">
        <h1 className="text-3xl font-semibold h1 mb-2 py-2">
          Categories Management
        </h1>
        <div className="flex gap-3 items-center border-b border-gray-300 pb-4 mt-2">
          <Button
            className={`py-2 px-4 rounded ${activeTab === "form"}`}
            onClick={() => setActiveTab("form")}
          >
            Add Category
          </Button>
          <Button
            className={`py-2 px-4 rounded ${activeTab === "datatable"}`}
            onClick={() => setActiveTab("datatable")}
          >
            Category List
          </Button>
        </div>

        {activeTab === "form" && (
          <div className="mt-6 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl h1 py-2">Create New Category</h2>
            <form
              className="border-t border-gray-300"
              onSubmit={handleAddCategory}
            >
              <div className="relative mb-2 py-4">
                <label
                  for="CategoryName"
                  class="leading-7 text-sm text-gray-600"
                >
                  Category Name*
                </label>
                <input
                  type="text"
                  id="CategoryName"
                  name="CategoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                   text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-2 py-0 text-gray-400 text-xs">
                {`Your Categories  Permalink: https://healthcare-biodiversity.vercel.app/categories/${permalink}`}
              </div>
              <Button type="submit">Add</Button>
            </form>
          </div>
        )}

        {activeTab === "datatable" && (
          <div className="mt-6 p-0 bg-white rounded-md shadow-md">
            <CategoriesTable />
          </div>
        )}
      </div>
    </div>
  );
}
