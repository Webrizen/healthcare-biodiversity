"use client";
import React from "react";
import styles from "@/styles/login.module.css";
import { BsGoogle, BsGithub } from "react-icons/bs";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase_app } from "@/firebase/config";
import Swal from 'sweetalert2';

export default function page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while signing in.',
      });
    } else {
      router.push("/admin");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      router.push("/admin");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <section className={styles.loginSection}>
        <h2>Welcome Back!</h2>
        <p>Login to your account</p>
        <form className={styles.loginForm} onSubmit={handleForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button className={styles.loginButton}>Login</button>
        </form>
        <div className={styles.separator}>or</div>
        <div className={styles.socialLogin}>
          <button className={styles.googleLogin} onClick={signInWithGoogle}>
            <BsGoogle className={styles.icon} /> Continue with Google
          </button>
        </div>
      </section>
    </div>
  );
}
