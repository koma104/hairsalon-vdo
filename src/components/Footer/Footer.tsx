import React from 'react'
import styles from './Footer.module.css'
import YouTubeIcon from '../icons/YouTubeIcon'
import InstagramIcon from '../icons/InstagramIcon'
import XIcon from '../icons/XIcon'

const snsLinks = [
  {
    href: 'https://youtube.com',
    alt: 'YouTube',
    icon: <span className={styles['youtube-fix']}><YouTubeIcon size={26} /></span>,
  },
  {
    href: 'https://instagram.com',
    alt: 'Instagram',
    icon: <InstagramIcon size={22} />,
  },
  {
    href: 'https://x.com',
    alt: 'X',
    icon: <XIcon size={18} />,
  },
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <div className={styles.info}>
          <p>
            〒150-0000
            <br />
            東京都渋谷区渋谷1-2-3 渋谷ビルディング103-A
          </p>
          <p>Tel: 03-1234-5678</p>
        </div>
        <div className={styles.hours}>
          <p>月〜金: 11:00-21:00</p>
          <p>土日祝: 10:00-19:00</p>
        </div>
        <div className={styles['sns-links']}>
          {snsLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.alt}>
              {link.icon}
            </a>
          ))}
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} VDO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
