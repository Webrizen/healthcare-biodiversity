import React from 'react';
import styles from '@/styles/admin.module.css';
import Link from 'next/link';

export default function DashboardLayout({
    children,
  }) {
    return (
        <section className={styles.admin}>
        <div className={styles.tabs}>
          <div className={styles.leftTabs}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/new-post">New Posts</Link>
          <Link href="/admin/posts-management">Posts Management</Link>
          <Link href="/admin/create-management">Categories Management</Link>
          </div>
          <div className={styles.RightTabs}>
            <button>Logout</button>
          </div>
        </div>
        <div className={styles.mainAdmin}>
          {children}
        </div>
       </section>
    )
  }