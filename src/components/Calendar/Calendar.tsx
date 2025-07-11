'use client'

import React, { useState } from 'react'
import styles from './Calendar.module.css'

interface CalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1))
  }

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day)
    onDateSelect(newSelectedDate)
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)} className={styles['nav-button']}>
          &lt;
        </button>
        <div className={styles['month-year']}>
          {monthNames[month]} {year}
        </div>
        <button onClick={() => changeMonth(1)} className={styles['nav-button']}>
          &gt;
        </button>
      </div>
      <div className={styles['days-of-week']}>
        {daysOfWeek.map((day, index) => (
          <div key={`${day}-${index}`}>{day}</div>
        ))}
      </div>
      <div className={styles['days-grid']}>
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isSelected =
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year
          return (
            <button
              key={day}
              className={`${styles.day} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
