'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import styles from './page.module.css'
import { newsItems } from '@/lib/newsData'
import Button from '@/components/Button/Button'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Lenis from 'lenis'
import NewsListPage from './news/page'
import NewsDetail from '@/components/NewsDetail/NewsDetail'
import ReservePage from './reserve/page'
import StaffPage from './staff/page'
import { usePageContext } from '@/contexts/PageContext'

const menuCategories = [
  {
    category: 'cuts',
    items: [
      { name: 'カット', price: '¥6,600' },
      { name: '前髪カット', price: '¥1,100' },
      { name: '子供カット', price: '¥3,300' },
    ],
  },
  {
    category: 'color',
    items: [
      { name: 'カラー', price: '¥8,800' },
      { name: 'パーマ', price: '¥8,800' },
      { name: 'ストレートパーマ', price: '¥15,000' },
      { name: '縮毛矯正', price: '¥20,000' },
      { name: 'デジタルパーマ', price: '¥18,000' },
    ],
  },
  {
    category: 'other',
    items: [
      { name: 'トリートメント', price: '¥4,400~' },
      { name: 'ヘッドスパ', price: '¥5,500~' },
    ],
  },
]

// useSearchParamsを使用するコンポーネント
function HomeContent() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(2)
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null)
  const { currentPage, setCurrentPage } = usePageContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URLパラメータを監視してニュース詳細を表示
  useEffect(() => {
    const newsDetailMatch = pathname.match(/^\/news\/(.+)$/)
    const newsQueryParam = searchParams.get('news')
    
    if (newsDetailMatch) {
      const articleId = newsDetailMatch[1]
      setCurrentArticleId(articleId)
      setCurrentPage('news')
    } else if (newsQueryParam) {
      setCurrentArticleId(newsQueryParam)
      setCurrentPage('news')
    } else {
      setCurrentArticleId(null)
    }
  }, [pathname, searchParams, setCurrentPage])

  // PCでの直接アクセス時の処理
  useEffect(() => {
    const newsDetailMatch = pathname.match(/^\/news\/(.+)$/)
    if (newsDetailMatch && typeof window !== 'undefined' && window.innerWidth >= 768) {
      // PCで直接アクセスした場合は即座にリダイレクト
      const articleId = newsDetailMatch[1]
      router.replace(`/?news=${articleId}`)
    }
  }, [pathname, router])

  useEffect(() => {
    // デバイス判定
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768

    // Lenisインスタンスを作成（慣性スクロール）
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // スマホではより短いduration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile, // スマホではsmoothWheelを無効化
      wheelMultiplier: isMobile ? 0.8 : 1, // スマホではホイール感度を調整
    })

    // requestAnimationFrameループでLenisを更新
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ScrollTriggerにLenisのスクロールを連携
    lenis.on('scroll', ScrollTrigger.update)
    
    // ScrollTriggerインスタンスを個別管理
    const scrollTriggers: ScrollTrigger[] = []

    // パララックス効果：ヒーロー画像のアニメーション
    let heroParallaxAnimation: gsap.core.Tween | null = null
    
    // パララックス効果：ヒーロー画像のアニメーション（PC・スマホ両方で適用）
    heroParallaxAnimation = gsap.to(`.${styles['main-image']}`, {
      yPercent: isMobile ? -5 : -10, // スマホでは軽微な効果
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles['main-visual']}`,
        start: 'top top',
        end: 'bottom top',
        scrub: isMobile ? 0.5 : 1, // スマホではより滑らかなスクラブ
      },
    })

    // ズームアウト効果を両方のデバイスで適用
    // 初期状態を明示的に設定
    gsap.set(`.${styles['main-image']}`, { scale: 1.1 })
    
    gsap.fromTo(`.${styles['main-image']}`, 
      { scale: 1.1 },
      { 
        scale: 1, 
        duration: 4, 
        delay: 0.3, 
        ease: 'power2.out' 
      }
    )

    gsap.set(`.${styles['content-wrapper']}`, {
      y: '0vh',
    })

    const contentAnimation = gsap.to(`.${styles['content-wrapper']}`, {
      scrollTrigger: {
        trigger: `.${styles['content-wrapper']}`,
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        scrub: 1,
      },
      y: 0,
    })

    if (heroParallaxAnimation?.scrollTrigger) {
      scrollTriggers.push(heroParallaxAnimation.scrollTrigger)
    }
    if (contentAnimation.scrollTrigger) {
      scrollTriggers.push(contentAnimation.scrollTrigger)
    }

    // ページ遷移やリロード時にもkillAll
    const handleUnload = () => {
      ScrollTrigger.killAll()
    }
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('popstate', handleUnload)

    // クリーンアップ
    return () => {
      // Lenisインスタンスを破棄
      if (lenis) {
        lenis.destroy()
      }
      
      // まず全てのScrollTriggerをkill
      ScrollTrigger.killAll()
      window.removeEventListener('beforeunload', handleUnload)
      window.removeEventListener('popstate', handleUnload)
      // 個別に管理したScrollTriggerを安全にクリーンアップ
      scrollTriggers.forEach((trigger) => {
        if (trigger && trigger.kill) {
          try {
            if (!trigger.pin || trigger.pin.parentNode) {
              trigger.kill()
            }
          } catch (error) {
            console.warn('ScrollTrigger cleanup error:', error)
          }
        }
      })
      if (heroParallaxAnimation) {
        try {
          heroParallaxAnimation.kill()
        } catch (error) {
          console.warn('Hero parallax animation cleanup error:', error)
        }
      }
      if (contentAnimation) {
        try {
          contentAnimation.kill()
        } catch (error) {
          console.warn('Content animation cleanup error:', error)
        }
      }
    }
  }, [])

  const handleShowMoreNews = () => {
    setVisibleNewsCount(5)
  }



  const displayedNews = newsItems.slice(0, visibleNewsCount)

  return (
    <div className={styles['main-container']}>
      <div className={styles['main-visual']}>
        <div className={styles['main-visual-inner']}>
          <Image
            src="/images/hero-photo.png"
            alt="Salon main visual"
            width={750}
            height={835}
            priority={true}
            className={styles['main-image']}
          />
        </div>
      </div>

              <div className={styles['content-wrapper']}>
        {currentPage === 'home' && (
          <>
            <section className={styles['content-section']}>
              <div className={styles.container}>
                <SectionTitle tag="h2">concept</SectionTitle>
                <h3 className={styles['concept-catchphrase']}>
                  髪の美しさが、あなたの毎日を
                  <br />
                  もっと特別に。
                </h3>
                <p className={styles['concept-text']}>
                  一人ひとりの髪質やライフスタイルに寄り添い、ダメージを抑えた施術と心地よい空間で、理想のヘアスタイルをご提案します。髪にやさしいケアと、少しの変化で生まれる新しい自分。毎日がもっと自信に満ちて、笑顔で過ごせるよう、私たちがサポートいたします。
                </p>
              </div>
              <div className={styles['carousel-container']}>
                <div className={styles['store-carousel']}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles['store-image-wrapper']}>
                      <Image
                        src={`/images/store-image-0${(i % 3) + 1}.png`}
                        alt={`Store view ${i + 1}`}
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles['content-section']}>
              <div className={styles.container}>
                <SectionTitle tag="h2">news</SectionTitle>
                <div className={styles['news-list']}>
                  {displayedNews.map((item) => (
                    <button 
                      key={item.id} 
                      className={styles['news-item']}
                      onClick={() => {
                        const isMobile = window.innerWidth < 768
                        if (isMobile) {
                          // SPの場合は独立したページに遷移
                          router.push(`/news/${item.id}`)
                        } else {
                          // PCの場合はホームページのcontent-wrapper内で表示
                          setCurrentArticleId(item.id)
                          setCurrentPage('news')
                        }
                      }}
                    >
                      <div className={styles['news-text']}>
                        <h3 className={styles['news-subtitle']}>{item.title}</h3>
                        <p className={styles['news-excerpt']}>{item.excerpt}</p>
                      </div>
                      <div className={styles['news-image-wrapper']}>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={100}
                          height={100}
                          className={styles['news-image']}
                        />
                      </div>
                    </button>
                  ))}
                </div>
                {visibleNewsCount < 5 && newsItems.length > 2 && (
                  <div className={styles['more-button-wrapper']}>
                    <button onClick={handleShowMoreNews} className={styles['more-button']}>
                      more
                    </button>
                  </div>
                )}
                {visibleNewsCount >= 5 && (
                  <div className={styles['more-button-wrapper']}>
                    <Link href="/news" className={styles['news-list-button']}>
                      すべて見る
                    </Link>
                  </div>
                )}
              </div>
            </section>

            <section className={styles['content-section']}>
              <div className={styles.container}>
                <SectionTitle tag="h2">menu</SectionTitle>
                <div className={styles['menu-wrapper']}>
                  {menuCategories.map((cat) => (
                    <div key={cat.category} className={styles['menu-category']}>
                      <h3 className={styles['menu-subtitle']}>{cat.category}</h3>
                      <ul className={styles['menu-list']}>
                        {cat.items.map((item) => (
                          <li key={item.name} className={styles['menu-item']}>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className={styles['menu-button-wrapper']}>
                  <Link href="/reserve">
                    <Button variant="secondary">reserve</Button>
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'news' && !currentArticleId && (
          <NewsListPage />
        )}

        {currentPage === 'news' && currentArticleId && (
          <NewsDetail id={currentArticleId} />
        )}

        {currentPage === 'reserve' && (
          <ReservePage />
        )}

        {currentPage === 'staff' && (
          <StaffPage />
        )}
      </div>
    </div>
  )
}

// メインのHomeコンポーネント（Suspenseでラップ）
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
