'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
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
import NewsList from '@/components/NewsList/NewsList'
import Container from '@/components/Container/Container'
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
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null)
  const { currentPage, setCurrentPage } = usePageContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // アニメーション用のref
  const conceptSectionRef = useRef<HTMLElement>(null)
  const conceptTitleRef = useRef<HTMLHeadingElement>(null)
  const conceptCatchphraseRef = useRef<HTMLHeadingElement>(null)
  const conceptTextRef = useRef<HTMLParagraphElement>(null)
  
  // ニュースセクション用のref
  const newsSectionRef = useRef<HTMLElement>(null)
  const newsTitleRef = useRef<HTMLHeadingElement>(null)
  const newsListRef = useRef<HTMLDivElement>(null)
  const newsMoreButtonRef = useRef<HTMLDivElement>(null)
  
  // メニューセクション用のref
  const menuSectionRef = useRef<HTMLElement>(null)
  const menuTitleRef = useRef<HTMLHeadingElement>(null)
  const menuWrapperRef = useRef<HTMLDivElement>(null)

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

          // コンセプトセクションのアニメーション
      if (conceptSectionRef.current) {
        // 初期状態を設定（p要素は除外）
        gsap.set([conceptTitleRef.current, conceptCatchphraseRef.current], {
          opacity: 0,
          y: 15
        })

      // 下からふわっと表示アニメーション
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: conceptSectionRef.current,
          start: 'top bottom-=200',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse'
        }
      })

      // h2タイトル（opacity + 下から移動）
      if (conceptTitleRef.current) {
        tl.to(conceptTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out'
        }, 0.3)
      }

      // h3キャッチフレーズ（opacity + 下から移動）
      if (conceptCatchphraseRef.current) {
        tl.to(conceptCatchphraseRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'power2.out'
        }, '-=0.9')
      }

      // コンセプトテキスト（行ごとに表示）
      if (conceptTextRef.current) {
        // span要素を取得
        const spans = conceptTextRef.current.querySelectorAll('span')
        
        // 初期状態を設定
        spans.forEach(span => {
          gsap.set(span, {
            opacity: 0
          })
        })
        
        // 各行を順番にアニメーション
        spans.forEach((span, index) => {
          tl.to(span, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          }, `-=${index === 0 ? 0.7 : 0.4}`)
        })
      }
    }

    // ニュースセクションのアニメーション
    if (newsSectionRef.current) {
      // 初期状態を設定
      gsap.set([newsTitleRef.current, newsListRef.current, newsMoreButtonRef.current], {
        opacity: 0
      })
      gsap.set(newsTitleRef.current, {
        y: 15
      })

      // ニュースタイトルのアニメーション
      const newsTl = gsap.timeline({
        scrollTrigger: {
          trigger: newsSectionRef.current,
          start: 'top bottom-=200',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse'
        }
      })

      // h2タイトル（opacity + 下から移動）
      if (newsTitleRef.current) {
        newsTl.to(newsTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }, 0.2) // 0.2秒遅延
      }

      // ニュースリスト（opacityのみ）
      if (newsListRef.current) {
        newsTl.to(newsListRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.5') // タイトルと少し重複
      }

      // moreボタン（opacityのみ）
      if (newsMoreButtonRef.current) {
        newsTl.to(newsMoreButtonRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.3') // リストと少し重複
      }
    }

    // メニューセクションのアニメーション
    if (menuSectionRef.current) {
      // 初期状態を設定
      gsap.set([menuTitleRef.current, menuWrapperRef.current], {
        opacity: 0
      })
      gsap.set(menuTitleRef.current, {
        y: 15
      })

      // メニュータイトルのアニメーション
      const menuTl = gsap.timeline({
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: 'top bottom-=200',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse'
        }
      })

      // h2タイトル（opacity + 下から移動）
      if (menuTitleRef.current) {
        menuTl.to(menuTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }, 0.2) // 0.2秒遅延
      }

      // メニューラッパー（opacityのみ）
      if (menuWrapperRef.current) {
        menuTl.to(menuWrapperRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.5') // タイトルと少し重複
      }
    }

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
            <section ref={conceptSectionRef} className={styles['content-section']}>
              <Container>
                <SectionTitle ref={conceptTitleRef} tag="h2">concept</SectionTitle>
                <h3 ref={conceptCatchphraseRef} className={styles['concept-catchphrase']}>
                  髪の美しさが、あなたの毎日を
                  <br />
                  もっと特別に。
                </h3>
                <p ref={conceptTextRef} className={styles['concept-text']}>
                  <span>一人ひとりの髪質やライフスタイルに寄り添い、ダメージを抑えた施術と心地よい空間で、理想のヘアスタイルをご提案します。</span>
                  <span>髪にやさしいケアと、少しの変化で生まれる新しい自分。</span>
                  <span>毎日がもっと自信に満ちて、笑顔で過ごせるよう、私たちがサポートいたします。</span>
                </p>
              </Container>
              <div className={styles['carousel-container']}>
                <div className={styles['store-carousel']}>
                  <div className={styles['carousel-group']}>
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-01.png"
                        alt="Store view 1"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-02.png"
                        alt="Store view 2"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-03.png"
                        alt="Store view 3"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                  </div>
                  <div className={styles['carousel-group']} aria-hidden="true">
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-01.png"
                        alt="Store view 1"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-02.png"
                        alt="Store view 2"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                    <div className={styles['store-image-wrapper']}>
                      <Image
                        src="/images/store-image-03.png"
                        alt="Store view 3"
                        width={592}
                        height={395}
                        className={styles['store-image']}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section ref={newsSectionRef} className={styles['content-section']}>
              <Container>
                <SectionTitle ref={newsTitleRef} tag="h2">news</SectionTitle>
                <NewsList
                  ref={newsListRef}
                  items={newsItems}
                  maxItems={2}
                  showMoreButton={true}
                  showViewAllButton={true}
                  moreButtonRef={newsMoreButtonRef}
                  onItemClick={(item) => {
                    const isMobile = window.innerWidth < 768
                    if (isMobile) {
                      router.push(`/news/${item.id}`)
                    } else {
                      setCurrentArticleId(item.id)
                      setCurrentPage('news')
                    }
                  }}
                />
              </Container>
            </section>

            <section ref={menuSectionRef} className={styles['content-section']}>
              <Container>
                <SectionTitle ref={menuTitleRef} tag="h2">menu</SectionTitle>
                <div ref={menuWrapperRef} className={styles['menu-wrapper']}>
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
              </Container>
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
