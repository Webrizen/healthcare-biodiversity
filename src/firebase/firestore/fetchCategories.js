import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '@/firebase/config';

export async function fetchCategories() {
  const firestore = getFirestore(firebaseApp);
  const categoriesCollection = collection(firestore, 'Categories');
  const categoriesSnapshot = await getDocs(categoriesCollection);
  
  const categories = [];
  categoriesSnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });

  return categories;
}
