import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = ({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) => (
  <nav className={`${styles.nav} ${isOpen ? styles['is-open'] : ''}`}>
    <div className={styles['nav-inner']}>
      <ul className={styles['nav-list']}>
        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
        <li><Link href="/news" onClick={closeMenu}>News</Link></li>
        <li><Link href="/reserve" onClick={closeMenu}>Reserve</Link></li>
        <li><Link href="/staff" onClick={closeMenu}>Staff</Link></li>
      </ul>
      <div className={styles['sns-links']}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-facebook.svg" alt="Facebook" width={24} height={24} className={styles['sns-icon']} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-instagram.svg" alt="Instagram" width={24} height={24} className={styles['sns-icon']} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon-x.svg" alt="X" width={24} height={24} className={styles['sns-icon']} />
        </a>
      </div>
    </div>
  </nav>
);

export default Nav; 