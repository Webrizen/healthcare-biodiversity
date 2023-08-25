"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from '@/styles/admin.module.css';
import Link from 'next/link';

export default function page() {
  const { user } = useAuthContext()
  const router = useRouter()

  React.useEffect(() => {
      if (user == null) router.push("/login")
  }, [user])
  return (
    <>
     <h1>Admin</h1>
    </>
  )
}
