'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Nav from '../Nav/Nav'
import styles from './Header.module.css'
import Button from '../Button/Button'
import { usePageContext } from '@/contexts/PageContext'
import { useRouter, useSearchParams } from 'next/navigation'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isReservePage = pathname === '/reserve'
  const { setCurrentPage, isSPAEnabled } = usePageContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // PC表示時（768px以上）ではロゴアニメーションを無効化
    const isPC = window.innerWidth >= 768
    if (isPC) {
      setIsScrolled(false)
      return
    }

    // SPでのみ、ホームページ以外では最初から小さいサイズにする
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
        // PC表示時（768px以上）ではロゴアニメーションを無効化
        const isPC = window.innerWidth >= 768
        if (isPC) {
          setIsScrolled(false)
          return
        }
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
        // PC表示時（768px以上）ではロゴアニメーションを無効化
        const isPC = window.innerWidth >= 768
        if (isPC) {
          setIsScrolled(false)
          return
        }
        // コンセプトエリアの上端が画面の上部からヘッダーの高さ分下がった時にアニメーション開始
        const shouldScroll = conceptRect.top <= headerHeight
        setIsScrolled(shouldScroll)
        
        // デバッグ用ログ（開発時のみ）
        if (process.env.NODE_ENV === 'development') {
          console.log('Concept section top:', conceptRect.top, 'Header height:', headerHeight, 'Should scroll:', shouldScroll)
        }
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

  const handleNewsClick = () => {
    setCurrentPage('news')
    // クエリパラメータをクリアしてニュース一覧を表示
    if (searchParams.has('news')) {
      router.replace('/')
    }
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
              {isHomePage && isSPAEnabled ? (
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={styles['nav-button']}
                >
                  home
                </button>
              ) : (
                <Link href="/">home</Link>
              )}
            </li>
            <li>
              {isHomePage && isSPAEnabled ? (
                <button 
                  onClick={handleNewsClick}
                  className={styles['nav-button']}
                >
                  news
                </button>
              ) : (
                <Link href="/news">news</Link>
              )}
            </li>
            <li>
              {isHomePage && isSPAEnabled ? (
                <button 
                  onClick={() => setCurrentPage('reserve')}
                  className={styles['nav-button']}
                >
                  reserve
                </button>
              ) : (
                <Link href="/reserve">reserve</Link>
              )}
            </li>
            <li>
              {isHomePage && isSPAEnabled ? (
                <button 
                  onClick={() => setCurrentPage('staff')}
                  className={styles['nav-button']}
                >
                  staff
                </button>
              ) : (
                <Link href="/staff">staff</Link>
              )}
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

export default Header
