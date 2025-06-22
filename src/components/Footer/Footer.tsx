import React from 'react';
import styles from './Footer.module.css';

const snsLinks = [
  { href: 'https://facebook.com', src: '/images/icon-facebook.svg', alt: 'Facebook' },
  { href: 'https://instagram.com', src: '/images/icon-instagram.svg', alt: 'Instagram' },
  { href: 'https://x.com', src: '/images/icon-x.svg', alt: 'X' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>VDO</div>
        <div className={styles.info}>
          <p>〒150-0000 東京都渋谷区渋谷1-2-3 渋谷ビルディング103-A</p>
          <p>Tel: 03-1234-5678</p>
        </div>
        <div className={styles.hours}>
          <p>月〜金: 11:00-21:00</p>
          <p>土日祝: 10:00-19:00</p>
        </div>
        <div className={styles.snsLinks}>
          {snsLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              <img src={link.src} alt={link.alt} width={24} height={24} className={styles.snsIcon} />
            </a>
          ))}
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} VDO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 