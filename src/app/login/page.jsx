"use client";
import React from "react";
import styles from "@/styles/login.module.css";
import { BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import Swal from 'sweetalert2';
import { Button, Spinner } from "@material-tailwind/react";

export default function page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { result, error } = await signIn(email, password);

    if (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while signing in.',
        });
       setIsLoading(false);
    } else{
      return router.push("/admin");
      setIsLoading(false);
    }
}
  

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
        <h1 className="text-5xl">Welcome Back!</h1>
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
          <Button type="submit">{isLoading ? <Spinner /> : "Login"}</Button>
        </form>
        <div className={styles.separator}>or</div>
        <div className={styles.socialLogin}>
          <Button className={styles.googleLogin} onClick={signInWithGoogle}>
            <BsGoogle className={styles.icon} /> Continue with Google
          </Button>
        </div>
      </section>
    </div>
  );
}

