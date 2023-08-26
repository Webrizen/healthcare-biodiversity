import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '@/firebase/config';

const db = getFirestore(firebaseApp);

async function deleteCategoryFromFirestore(documentId) {
  try {
    const categoryRef = doc(collection(db, 'Categories'), documentId);
    await deleteDoc(categoryRef);
    console.log('Document deleted successfully.');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
}

export { deleteCategoryFromFirestore };