"use client";
import React, { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Spinner,
} from "@material-tailwind/react";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import Swal from "sweetalert2";
import Link from "next/link";

const TABLE_HEAD = ["Thumbnail", "Title", "Date", "views", "Author", "Edit", "Delete"];
const POSTS_PER_PAGE = 4;

export default function page() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPostIndex = currentPage * POSTS_PER_PAGE;
  const firstPostIndex = lastPostIndex - POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const db = getFirestore(firebase_app);
    const blogsCollection = collection(db, "blogs");

    // Initialize the listener
    const unsubscribe = onSnapshot(blogsCollection, (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogPosts(blogData);
      setLoading(false);
    });

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Filter the blog posts based on search term
    const filtered = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, blogPosts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const db = getFirestore(firebase_app);

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Delete Blog Post",
      text: "Are you sure you want to delete this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "blogs", postId));
          // Remove the deleted post from the state
          setBlogPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          Swal.fire("Deleted!", "The blog post has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    });
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Blog Posts
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last Blog Posts.
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(
                ({ imageUrl, title, timestamp, views, author, id }) => (
                  <tr key={id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={imageUrl}
                          alt={title}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="p-4 w-52">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timestamp && timestamp.seconds
                          ? new Date(
                              timestamp.seconds * 1000
                            ).toLocaleDateString()
                          : ""}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {views}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {author}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Edit Blog">
                        <Link href={`/admin/edit-post/${id}`}>
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Edit Blog">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeletePost(id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <IconButton
              key={index}
              variant={currentPage === index + 1 ? "filled" : "text"}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
