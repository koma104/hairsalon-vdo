import React from 'react'
import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  children: React.ReactNode
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const SectionTitle = ({ children, tag: Tag = 'h1' }: SectionTitleProps) => {
  return <Tag className={styles['section-title']}>{children}</Tag>
}

export default SectionTitle 