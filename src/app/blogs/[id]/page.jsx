import SingleBlog from "@/components/posts/SingleBlog";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";

async function fetchBlogData(blogId) {
  const db = getFirestore(firebase_app);
  const blogRef = doc(db, "blogs", blogId);

  try {
    const snapshot = await getDoc(blogRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blogData = await fetchBlogData(params.id);

  if (blogData) {
    const dynamicMetadata = {
      title: blogData.title || "Default Title",
      description: blogData.shortDescription || "Default Description",
      category: blogData.categories || ["Default Category"],
      authors: blogData.author || [{ name: "Default Author" }],
      keywords: blogData.keywords || ["Default Keyword"],
      creator: blogData.author || "Default Creator",
      publisher: blogData.author || "Default Publisher",
      openGraph: {
        title: blogData.title || "Default Open Graph Title",
        description:
          blogData.shortDescription || "Default Open Graph Description",
        images: blogData.imageUrl || "/placeholder.svg",
        url:
          `https://healthcarebiodiversity.com/blogs/${blogData.id}` ||
          "https://healthcarebiodiversity.com",
        siteName: "healthcare biodiversity",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: blogData.title || "Default Twitter Card Title",
        description:
          blogData.shortDescription || "Default Twitter Card Description",
        image: blogData.imageUrl || "/placeholder.svg",
        creator: "@Healthcarebiodi",
      },
    };

    return dynamicMetadata;
  }

  return {
    title: "Default Title",
    description: "Default Description",
  };
}

export default function Page({ params }) {
  return (
    <>
      <SingleBlog id={params.id} />
    </>
  );
}
