import React from 'react';
import styles from '@/styles/navbar.module.css';
import Image from 'next/image';
import Logo from '@/assets/logo.webp';
import { BiSearch } from 'react-icons/bi';
import { MdNotificationsActive } from 'react-icons/md';

export default function Navbar() {
  return (
    <>
    <header className={styles.header}>
    <div className={styles.logo}>
        <Image src={Logo} alt='Healthcare Biodiversity' width={45} height={45} />
        <span>Healthcarebiodiversity</span>
    </div>
    <div className={styles.links}>
        <div className={styles.ico}>
            <MdNotificationsActive />
        </div>
        <div className={styles.ico}>
            <BiSearch />
        </div>
    </div>
    </header> 
    </>
  )
}
