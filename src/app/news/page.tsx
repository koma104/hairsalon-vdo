'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './news.module.css'
import { newsItems } from '@/lib/newsData'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Container from '@/components/Container/Container'
import NewsList from '@/components/NewsList/NewsList'

const ITEMS_PER_PAGE = 10

const NewsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // デバイス判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ページが変更された時にトップにスクロール
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, newsItems.length)
  const displayedItems = newsItems.slice(startIndex, endIndex)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      // ページトップにスクロール
      window.scrollTo(0, 0)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      // ページトップにスクロール
      window.scrollTo(0, 0)
    }
  }

  return (
    <Container>
      <SectionTitle>news</SectionTitle>
      <p className={styles['page-description']}>
        最新のトレンドやアドバイス、サロンからの限定オファーをお届けします。
      </p>

      <NewsList
        items={displayedItems}
        maxItems={ITEMS_PER_PAGE}
        onItemClick={(item) => {
          if (isMobile) {
            // SPの場合は独立したページに遷移
            router.push(`/news/${item.id}`)
          } else {
            // PCの場合はホームページのcontent-wrapper内で表示
            router.push(`/?news=${item.id}`)
          }
        }}
      />

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
    </Container>
  )
}

export default NewsListPage
