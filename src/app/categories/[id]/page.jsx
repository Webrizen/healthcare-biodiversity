import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import CategoriesCard from "@/components/CategoriesCard";

async function fetchcategoriesData(categoriesId) {
  const db = getFirestore(firebase_app);
  const blogRef = doc(db, "Categories", categoriesId);

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
  const categoriesData = await fetchcategoriesData(params.id);

  if (categoriesData) {
    const dynamicMetadata = {
      title: categoriesData.name || "Default Title",
      description: `Explore a diverse range of health care and biodiversity topics on our blog website's Categories page. Discover insightful content covering various aspects of these vital niches.`,
      category: categoriesData.name || ["Default Category"],
      authors: [{ name: "Supratim Bhattacharya" }],
    };

    return dynamicMetadata;
  }

  return {
    title: "Default Title",
    description: "Default Description",
  };
}



export default async function Page({ params }) {
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <CategoriesCard params={params.id} />
          </div>
        </div>
      </section>
    </>
  );
}
