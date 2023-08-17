import { getAuth, signOut } from "firebase/auth";
import { firebase_app } from "../config";

const auth = getAuth(firebase_app);

export default async function signOutUser() {
  let success = false,
    error = null;
  try {
    await signOut(auth);
    success = true;
  } catch (e) {
    error = e;
  }

  return { success, error };
}
