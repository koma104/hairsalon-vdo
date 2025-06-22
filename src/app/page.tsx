'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { newsItems } from '@/lib/newsData';

const menuCategories = [
  {
    category: 'Haircuts',
    items: [
      { name: 'カット', price: '¥6,600' },
      { name: '前髪カット', price: '¥1,100' },
      { name: '子供カット', price: '¥3,300' },
    ],
  },
  {
    category: 'Colorring',
    items: [
      { name: 'カラー', price: '¥8,800' },
      { name: 'パーマ', price: '¥8,800' },
      { name: 'ストレートパーマ', price: '¥15,000' },
      { name: '縮毛矯正', price: '¥20,000' },
      { name: 'デジタルパーマ', price: '¥18,000' },
    ],
  },
  {
    category: 'Other',
    items: [
      { name: 'トリートメント', price: '¥4,400~' },
      { name: 'ヘッドスパ', price: '¥5,500~' },
    ],
  },
];

const topNewsItems = [
  {
    id: 'summer-hair-refresh',
    title: '夏のヘアリフレッシュ',
    excerpt: '今夏は、すべてのカラーサービスが20%オフ。今すぐご予約して、輝きを放って！',
    imageUrl: '/images/news-image-01.png',
  },
  {
    id: 'keratin-treatment',
    title: 'ケラチントリートメントの紹介',
    excerpt: 'サラサラでフリズのない髪を、サロンの新しいケラチントリートメントで実現します。今すぐご予約を！',
    imageUrl: '/images/news-image-02.png',
  },
];

export default function Home() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(2);

  const handleShowMoreNews = () => {
    setVisibleNewsCount(6);
  };

  const displayedNews = newsItems.slice(0, visibleNewsCount);

  return (
    <div>
      <div className={styles.mainVisual}>
        <Image
          src="/images/hero-photo.png"
          alt="Salon main visual"
          width={750}
          height={835}
          priority={true}
          className={styles.mainImage}
        />
      </div>

      <section className={styles.concept}>
        <div className={styles.conceptContent}>
          <h2 className={`${styles.sectionTitle} ${styles.centeredTitle}`}>Concept</h2>
          <h3 className={styles.conceptCatchphrase}>
            髪の美しさが、あなたの毎日を
            <br />
            もっと特別に。
          </h3>
          <p className={styles.conceptText}>
            一人ひとりの髪質やライフスタイルに寄り添い、ダメージを抑えた施術と心地よい空間で、理想のヘアスタイルをご提案します。髪にやさしいケアと、少しの変化で生まれる新しい自分。毎日がもっと自信に満ちて、笑顔で過ごせるよう、私たちがサポートいたします。
          </p>
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.storeCarousel}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.storeImageWrapper}>
                <Image
                  src={`/images/store-image-0${(i % 3) + 1}.png`}
                  alt={`Store view ${i + 1}`}
                  width={592}
                  height={395}
                  className={styles.storeImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className={styles.newsContent}>
          <h2 className={`${styles.sectionTitle} ${styles.centeredTitle}`}>News</h2>
          <div className={styles.newsList}>
            {displayedNews.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id} className={styles.newsItem}>
                <div className={styles.newsText}>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                </div>
                <div className={styles.newsImageWrapper}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                    className={styles.newsImage}
                  />
                </div>
              </Link>
            ))}
          </div>
          {visibleNewsCount < 6 && newsItems.length > 2 && (
            <div className={styles.moreButtonWrapper}>
              <button onClick={handleShowMoreNews} className={styles.moreButton}>
                More
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.menuSection}>
        <h2 className={`${styles.sectionTitle} ${styles.centeredTitle}`}>Menu</h2>
        <div className={styles.menuContainer}>
          {menuCategories.map((cat) => (
            <div key={cat.category} className={styles.menuCategory}>
              <h3 className={styles.menuCatTitle}>{cat.category}</h3>
              <ul className={styles.menuList}>
                {cat.items.map((item) => (
                  <li key={item.name} className={styles.menuItem}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

