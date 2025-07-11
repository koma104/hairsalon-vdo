'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Nav from '../Nav/Nav'
import styles from './Header.module.css'
import Button from '../Button/Button'

// useSearchParamsを使用するコンポーネント
function HeaderContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isReservePage = pathname === '/reserve'

  useEffect(() => {
    // ホームページ以外では最初から小さいサイズにする
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

    // ホームページの場合、コンセプトエリアが画面の上部に付いた時にロゴアニメーションを開始
    const checkScrollPosition = () => {
      // コンセプトセクションを直接セレクターで検索
      const conceptSection = document.querySelector('section:first-of-type')
      
      if (conceptSection) {
        const conceptRect = conceptSection.getBoundingClientRect()
        const headerHeight = 52 // ヘッダーの高さ
        // コンセプトエリアの上端が画面の上部からヘッダーの高さ分下がった時にアニメーション開始
        setIsScrolled(conceptRect.top <= headerHeight)
      }
    }

    // 初回実行で現在のスクロール位置を確認
    checkScrollPosition()

    const handleScroll = () => {
      // コンセプトセクションを直接セレクターで検索
      const conceptSection = document.querySelector('section:first-of-type')
      
      if (conceptSection) {
        const conceptRect = conceptSection.getBoundingClientRect()
        const headerHeight = 52 // ヘッダーの高さ
        // コンセプトエリアの上端が画面の上部からヘッダーの高さ分下がった時にアニメーション開始
        const shouldScroll = conceptRect.top <= headerHeight
        setIsScrolled(shouldScroll)
      }
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
        
        {/* PC表示時のナビゲーション */}
        <nav className={styles['header-nav']}>
          <ul className={styles['header-nav-list']}>
            <li>
              <Link href="/" onClick={() => window.scrollTo(0, 0)}>home</Link>
            </li>
            <li>
              <Link href="/news">news</Link>
            </li>
            <li>
              <Link href="/reserve">reserve</Link>
            </li>
            <li>
              <Link href="/staff">staff</Link>
            </li>
          </ul>
        </nav>
      </header>
        {!isReservePage && (
          <div className={styles['header-reserve-button']}>
            <Link href="/reserve">
              <Button variant="secondary">reserve</Button>
            </Link>
          </div>
        )}

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

// メインのHeaderコンポーネント（Suspenseでラップ）
export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  )
}
