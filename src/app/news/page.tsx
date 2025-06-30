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
      <h1 className={styles['section-title']}>news</h1>
      <p className={styles['page-description']}>
        最新のトレンドやアドバイス、サロンからの限定オファーをお届けします。
      </p>

      <div className={styles['news-list']}>
        {displayedItems.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className={styles['news-item']}>
            <div className={styles['news-text']}>
              <h2 className={styles['news-subtitle']}>{item.title}</h2>
              <p className={styles['news-excerpt']}>{item.excerpt}</p>
            </div>
            <div>
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
      
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles['page-button']}
          >
            &lt;
          </button>
          <span>
            {currentPage} / {totalPages} ページ
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles['page-button']}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsListPage; 