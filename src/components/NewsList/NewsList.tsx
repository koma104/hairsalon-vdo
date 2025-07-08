'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './NewsList.module.css'
import { NewsItem } from '@/lib/newsData'

interface NewsListProps {
  items: NewsItem[]
  maxItems?: number
  showMoreButton?: boolean
  showViewAllButton?: boolean
  onItemClick?: (item: NewsItem) => void
}

const NewsList = ({ 
  items, 
  maxItems, 
  showMoreButton = false, 
  showViewAllButton = false,
  onItemClick 
}: NewsListProps) => {
  const [visibleCount, setVisibleCount] = useState(maxItems || 2)
  const router = useRouter()

  const displayedItems = items.slice(0, visibleCount)

  const handleItemClick = (item: NewsItem) => {
    if (onItemClick) {
      onItemClick(item)
    } else {
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        router.push(`/news/${item.id}`)
      } else {
        router.push(`/?news=${item.id}`)
      }
    }
  }

  const handleShowMore = () => {
    setVisibleCount(5)
  }

  return (
    <>
      <div className={styles['news-list']}>
        {displayedItems.map((item) => (
          <button 
            key={item.id} 
            className={styles['news-item']}
            onClick={() => handleItemClick(item)}
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
      
      {showMoreButton && visibleCount < 5 && visibleCount < items.length && (
        <div className={styles['more-button-wrapper']}>
          <button onClick={handleShowMore} className={styles['more-button']}>
            more
          </button>
        </div>
      )}
      
      {showViewAllButton && visibleCount >= 5 && (
        <div className={styles['more-button-wrapper']}>
          <Link href="/news" className={styles['news-list-button']}>
            すべて見る
          </Link>
        </div>
      )}
    </>
  )
}

export default NewsList 