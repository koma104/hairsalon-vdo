'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './staff.module.css'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Container from '@/components/Container/Container'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import Lenis from 'lenis'

const staffMembers = [
  {
    name: 'akari tanaka',
    title: 'senior stylist',
    specialty: 'specializes in color and highlights',
    imageUrl: '/images/staff-image-01.png',
  },
  {
    name: 'sakura yamamoto',
    title: 'stylist',
    specialty: 'expert in cutting and styling',
    imageUrl: '/images/staff-image-02.png',
  },
  {
    name: 'kenji nakamura',
    title: 'barber',
    specialty: "specializes in men's grooming",
    imageUrl: '/images/staff-image-03.png',
  },
  {
    name: 'yuki sato',
    title: 'junior stylist',
    specialty: 'focuses on modern cuts and treatments',
    imageUrl: '/images/staff-image-04.png',
  },
]

const StaffPage = () => {
  const staffRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // デバイス判定
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768

    // Lenisインスタンスを作成（慣性スクロール）
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile,
      wheelMultiplier: isMobile ? 0.8 : 1,
    })

    // requestAnimationFrameループでLenisを更新
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ScrollTriggerにLenisのスクロールを連携
    lenis.on('scroll', ScrollTrigger.update)

    // パララックス効果：スタッフ画像のアニメーション（より強い効果）
    staffRefs.current.forEach((ref) => {
      if (ref) {
        const image = ref.querySelector(`.${styles['staff-image']}`) as HTMLImageElement
        if (image) {
          gsap.to(image, {
            yPercent: isMobile ? -15 : -25, // より強いパララックス効果
            ease: 'none',
            scrollTrigger: {
              trigger: ref,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isMobile ? 0.5 : 1,
            },
          })
        }
      }
    })

    // クリップパスアニメーション用のIntersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const staffCard = entry.target as HTMLDivElement
            const image = staffCard.querySelector(`.${styles['staff-image']}`) as HTMLImageElement
            
            // 画像アニメーションのみ
            if (image) {
              image.classList.add(styles.animate)
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    staffRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      observer.disconnect()
      lenis.destroy()
    }
  }, [])

  return (
    <Container>
      <SectionTitle>Staff</SectionTitle>
      <div className={styles['staff-list']}>
        {staffMembers.map((staff, index) => (
          <div 
            key={index} 
            className={styles['staff-card']}
            ref={(el) => {
              staffRefs.current[index] = el
            }}
          >
            <div className={styles['image-wrapper']}>
              <Image
                src={staff.imageUrl}
                alt={staff.name}
                width={160}
                height={213}
                className={styles['staff-image']}
              />
            </div>
            <div className={styles['staff-info']}>
              <h2 className={styles['staff-name']}>{staff.name}</h2>
              <p className={styles['staff-title']}>{staff.title}</p>
              <p className={styles['staff-specialty']}>{staff.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default StaffPage
