"use client";
import React from 'react';
import styles from '@/styles/admin.module.css';
import Link from 'next/link';
import { AuthContextProvider, useAuthContext } from '@/context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { firebase_app } from '@/firebase/config';
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';

export default function DashboardLayout({ children }) {
  const auth = useAuthContext();
  const firebaseAuth = getAuth(firebase_app);
  const router = useRouter()

  const handleLogout = async () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(firebaseAuth);
          router.push("/login");
        } catch (error) {
          console.error('Error signing out:', error);
        }
      }
    });
  };

  return (
    <AuthContextProvider>
      <section className={styles.admin}>
        <div className={styles.tabs}>
          <div className={styles.leftTabs}>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/new-post">New Posts</Link>
            <Link href="/admin/posts-management">Posts Management</Link>
            <Link href="/admin/categories-management">Categories Management</Link>
          </div>
          <div className={styles.RightTabs}>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        <div className={styles.mainAdmin}>
          {children}
        </div>
      </section>
    </AuthContextProvider>
  );
}
