import React from "react";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import { BsDot } from "react-icons/bs";

const LatestPost = ({ imageUrl, categories, author, title, shortDescription }) => {
  return (
    <div className={styles.latestPost}>
      <Image
        src={imageUrl || '/placeholder.svg'}
        alt={title || 'Loading...'}
        width={600}
        height={400}
        quality={100}
      />
      <div className={styles.info}>
        <p>
          {categories || 'Loading...'} <BsDot /> {author || 'Loading...'}
        </p>
        <h1 className="text-3xl">{title || 'Loading...'}</h1>
        <span className="truncate">{shortDescription || 'Loading...'}</span>
      </div>
    </div>
  );
};

export default LatestPost;
