import React from "react";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

const SixPosts = ({ data }) => {
  return (
    <div className={styles.SixPosts}>
      {data.map((post) => (
        <div key={post.id} className={styles.card}>
          <Link href={`/blogs/${post.id}`}>
          <div className={styles.image}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={600}
              height={400}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              quality={100}
            />
          </div>
          <div className={`${styles.info} backdrop-blur-3xl`} >
            <p>
              {post.categories} <BsDot /> {post.author}
            </p>
            <h1>{post.title}</h1>
            <span className="truncate">{post.shortDescription}</span>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SixPosts;