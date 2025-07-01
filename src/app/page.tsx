'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { newsItems } from '@/lib/newsData'

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

export default function Home() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(2)

  const handleShowMoreNews = () => {
    setVisibleNewsCount(5)
  }

  const displayedNews = newsItems.slice(0, visibleNewsCount)

  return (
    <>
      <div className={styles['main-visual']}>
        <Image
          src="/images/hero-photo.png"
          alt="Salon main visual"
          width={750}
          height={835}
          priority={true}
          className={styles['main-image']}
        />
      </div>

      <section>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>concept</h2>
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

      <section>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>news</h2>
          <div className={styles['news-list']}>
            {displayedNews.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className={styles['news-item']}>
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
              </Link>
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

      <section>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>menu</h2>
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
        </div>
      </section>
    </>
  )
}
