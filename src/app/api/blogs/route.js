import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

export async function GET(request) {
  const db = getFirestore(firebase_app);

  try {
    const blogsCollection = collection(db, 'blogs');
    const querySnapshot = await getDocs(blogsCollection);
    const blogPosts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      blogPosts.push({
        id: doc.id,
        ...data,
      });
    });

    return new Response(JSON.stringify({ blogPosts }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
