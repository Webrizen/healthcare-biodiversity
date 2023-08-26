"use client";
import React from 'react';
import styles from '@/styles/admin.module.css';
import { AuthContextProvider, useAuthContext } from '@/context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { firebase_app } from '@/firebase/config';

import Swal from 'sweetalert2';
import { DefaultSidebar } from '@/components/admin/DefaultSidebar';

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
          <DefaultSidebar />
        </div>
        <div className={styles.mainAdmin}>
          {children}
        </div>
      </section>
    </AuthContextProvider>
  );
}
