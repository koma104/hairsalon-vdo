'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Nav from '../Nav/Nav'
import styles from './Header.module.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    // ホームページ以外では最初から小さいサイズにする
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

    // ホームページの場合、現在のスクロール位置を確認
    const checkScrollPosition = () => {
      const scrollY = window.scrollY
      const threshold = 52 // ヘッダーの高さ（52px）
      setIsScrolled(scrollY > threshold)
    }

    // 初回実行で現在のスクロール位置を確認
    checkScrollPosition()

    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 52 // ヘッダーの高さ（52px）
      setIsScrolled(scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <header className={styles.header}>
        {isHomePage ? (
          <h1 className={styles['logo-title']}>
            <Link href="/" className={`${styles.logo} ${isScrolled ? styles['logo-scrolled'] : ''}`}>
              <Image src="/images/logo-vdo.svg" alt="美容室 VDO" width={100} height={60} priority />
            </Link>
          </h1>
        ) : (
          <Link href="/" className={`${styles.logo} ${isScrolled ? styles['logo-scrolled'] : ''}`}>
            <Image src="/images/logo-vdo.svg" alt="美容室 VDO" width={100} height={60} priority />
          </Link>
        )}
      </header>

      <button
        onClick={toggleMenu}
        className={`${styles['menu-button']} ${isOpen ? styles['is-open'] : ''}`}
        aria-label="Menu"
      >
        <span className={styles['menu-line']}></span>
        <span className={styles['menu-line']}></span>
      </button>

      <Nav isOpen={isOpen} closeMenu={closeMenu} />
    </>
  )
}

export default Header
