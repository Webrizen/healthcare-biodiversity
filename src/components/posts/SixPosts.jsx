import React from "react";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import { BsDot } from "react-icons/bs";


const SixPosts = async () => {

  return (
    <div className={styles.SixPosts}>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src={"/placeholder.svg"}
                alt={"Something Went Wrong!"}
                width={600}
                placeholder="blur"
        blurDataURL="/placeholder.svg"
                quality={100}
                height={400}
              />
            </div>
            <div className={styles.info}>
              <p>
                {"Loading..."} <BsDot />{" "}{"Loading..."}
              </p>
              <h1>{"Loading..."}</h1>
              <span>{"Loading..."}</span>
            </div>
          </div>
    </div>
  );
};

export default SixPosts;
