import { NextResponse } from 'next/server';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

export async function GET(request) {
  const db = getFirestore(firebase_app);

  try {
    const authorsRef = collection(db, 'authors');
    const authorsSnapshot = await getDocs(authorsRef);
    const authors = [];
    
    authorsSnapshot.forEach((doc) => {
      const authorData = doc.data();
      authors.push({
        id: doc.id,
        name: authorData.name,
        bio: authorData.bio,
        profileImageUrl: authorData.imageUrl,
      });
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json({ error: 'Error fetching authors' }, { status: 500 });
  }
}
