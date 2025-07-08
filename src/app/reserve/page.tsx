'use client'

import React, { useState } from 'react'
import styles from './reserve.module.css'
import Calendar from '@/components/Calendar/Calendar'
import TimeSelector from '@/components/TimeSelector/TimeSelector'
import Button from '@/components/Button/Button'
import SectionTitle from '@/components/SectionTitle/SectionTitle'
import Container from '@/components/Container/Container'

const ReservePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('10:30 AM')
  const [selectedService, setSelectedService] = useState('')
  const [selectedStylist, setSelectedStylist] = useState('')

  return (
    <Container>
      <SectionTitle>reserve</SectionTitle>

      <section>
        <div className={styles['reserve-wrapper']}>
          <h2 className={styles['reserve-subtitle']}>date</h2>
          <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
        </div>
        <div className={styles['reserve-wrapper']}>
          <h2 className={styles['reserve-subtitle']}>time</h2>
          <TimeSelector selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
        </div>
        <div className={styles['form-group']}>
          <h2 id="service-label" className={styles['reserve-subtitle']}>
            Service
          </h2>
          <div className={styles['select-wrapper']}>
            <select
              aria-labelledby="service-label"
              className={`${styles.select} ${!selectedService ? styles.placeholder : ''}`}
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">選択</option>
              <option value="cut">Cut</option>
              <option value="color">Color</option>
              <option value="treatment">Treatment</option>
            </select>
          </div>
        </div>
        <div className={styles['form-group']}>
          <h2 id="stylist-label" className={styles['reserve-subtitle']}>
            Stylist
          </h2>
          <div className={styles['select-wrapper']}>
            <select
              aria-labelledby="stylist-label"
              className={`${styles.select} ${!selectedStylist ? styles.placeholder : ''}`}
              value={selectedStylist}
              onChange={(e) => setSelectedStylist(e.target.value)}
            >
              <option value="">選択</option>
              <option value="tanaka">Akari Tanaka</option>
              <option value="yamamoto">Sakura Yamamoto</option>
              <option value="nakamura">Kenji Nakamura</option>
            </select>
          </div>
        </div>
      </section>

      <div className={styles['reserve-button-wrapper']}>
        <Button variant="primary">予約確認へ</Button>
      </div>
    </Container>
  )
}

export default ReservePage
