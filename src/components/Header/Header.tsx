'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const snsLinks = [
  { href: 'https://facebook.com', src: '/images/icon-facebook.svg', alt: 'Facebook' },
  { href: 'https://instagram.com', src: '/images/icon-instagram.svg', alt: 'Instagram' },
  { href: 'https://x.com', src: '/images/icon-x.svg', alt: 'X' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }

  return (
    <>
      <header className={styles.header}>
        {pathname === '/' && (
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo-vdo.svg"
              alt="VDO logo"
              width={120}
              height={60}
              priority
            />
          </Link>
        )}
      </header>

      <button onClick={toggleMenu} className={`${styles.menuButton} ${isOpen ? styles.isOpen : ''}`} aria-label="Menu">
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
        <span className={styles.menuLine}></span>
      </button>

      <div className={`${styles.nav} ${isOpen ? styles.isOpen : ''}`}>
        <nav className={styles.navInner}>
          <ul className={styles.navList}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/news" onClick={closeMenu}>News</Link></li>
            <li><Link href="/reserve" onClick={closeMenu}>Reserve</Link></li>
            <li><Link href="/staff" onClick={closeMenu}>Staff</Link></li>
          </ul>
          <div className={styles.snsLinks}>
            {snsLinks.map((link) => (
              <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
                <img src={link.src} alt={link.alt} width={24} height={24} className={styles.snsIcon} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header; 