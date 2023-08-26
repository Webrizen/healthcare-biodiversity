"use client";
import React from 'react';
import styles from '@/styles/admin.module.css';
import { AuthContextProvider } from '@/context/AuthContext';
import { DefaultSidebar } from '@/components/admin/DefaultSidebar';

export default function DashboardLayout({ children }) {
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
