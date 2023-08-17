import React from "react";
import Image from "next/image";
import styles from "@/styles/home.module.css";
import { BsDot } from "react-icons/bs";

const LatestPost = () => {

  return (
    <>
        <div className={styles.latestPost}>
          <Image
            src={"/placeholder.svg"}
            alt={"Please Check Your Internet Connection."}
            width={600}
            height={400}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            quality={100}
          />
          <div className={styles.info}>
            <p>
            Chronic Illness Support <BsDot />{" "} Supratim Bhattacharya
            </p>
            <h1>Shocking Discovery: Long Covid Patient's Legs Turn Blue Within Minutes – What's the Hidden Connection?</h1>
            <span>Unveiling the Shocking Truth: Why Private Insurers Reject Coverage for the $26,000 Alzheimer's Treatment that's Transforming Lives. Find out the Startling Reasons Behind Their Controversial Decision.</span>
          </div>
        </div>
    </>
  );
};

export default LatestPost;