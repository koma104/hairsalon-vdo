'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Nav from '../Nav/Nav'
import styles from './Header.module.css'
import Button from '../Button/Button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isReservePage = pathname === '/reserve'

  useEffect(() => {
    // クライアントサイドであることを確認
    setIsClient(true)
  }, [])

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (!isClient) return

    // ホームページ以外の場合は最初から小さいサイズにする
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
        // デバイス別にヘッダーの高さを設定
        const isMobile = window.innerWidth < 768
        const headerHeight = isMobile ? 52 : 75 // PCでは75px、SPでは52px
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
        // デバイス別にヘッダーの高さを設定
        const isMobile = window.innerWidth < 768
        const headerHeight = isMobile ? 52 : 75 // PCでは75px、SPでは52px
        // コンセプトエリアの上端が画面の上部からヘッダーの高さ分下がった時にアニメーション開始
        const shouldScroll = conceptRect.top <= headerHeight
        setIsScrolled(shouldScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient, isHomePage])

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
            <Link 
              href="/" 
              className={`${styles.logo} ${isScrolled ? styles['logo-scrolled'] : ''}`}
              onClick={(e) => {
                e.preventDefault()
                window.location.replace('/')
              }}
            >
              <Image src="/images/logo-vdo.svg" alt="美容室 VDO" width={100} height={60} priority />
            </Link>
          </h1>
        ) : (
          <Link 
            href="/" 
            className={`${styles.logo} ${styles['logo-scrolled']}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // 確実にホームページに遷移
              window.location.replace('/')
            }}
          >
            <Image src="/images/logo-vdo.svg" alt="美容室 VDO" width={100} height={60} priority />
          </Link>
        )}
        
        {/* PC表示時のナビゲーション */}
        <nav className={styles['header-nav']}>
          <ul className={styles['header-nav-list']}>
            <li>
              <Link 
                href="/" 
                onClick={(e) => {
                  e.preventDefault()
                  window.location.replace('/')
                }}
              >
                home
              </Link>
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
