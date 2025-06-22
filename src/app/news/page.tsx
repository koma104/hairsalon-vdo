'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './news.module.css';
import { newsItems } from '@/lib/newsData';

const ITEMS_PER_PAGE = 12;

const NewsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, newsItems.length);
  const displayedItems = newsItems.slice(startIndex, endIndex);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>News</h1>
      <p className={styles.pageDescription}>
        最新のトレンドやアドバイス、サロンからの限定オファーをお届けします。
      </p>

      <div className={styles.newsList}>
        {displayedItems.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className={styles.newsItem}>
            <div className={styles.newsText}>
              <h2 className={styles.newsTitle}>{item.title}</h2>
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
      
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lt;
          </button>
          <span>
            {currentPage} / {totalPages} ページ
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsListPage; 