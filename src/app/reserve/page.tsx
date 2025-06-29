'use client';

import React, { useState } from 'react';
import styles from './reserve.module.css';
import Calendar from '@/components/Calendar/Calendar';
import TimeSelector from '@/components/TimeSelector/TimeSelector';

const ReservePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:30 AM');

  return (
    <div className={styles.container}>
      <h1 className={styles['section-title']}>reserve</h1>
      
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
          <label htmlFor="service-select" className={styles.label}>Service</label>
          <select id="service-select" className={styles.select}>
            <option value="">Select service</option>
            <option value="cut">Cut</option>
            <option value="color">Color</option>
            <option value="treatment">Treatment</option>
          </select>
        </div>
        <div className={styles['form-group']}>
            <label htmlFor="stylist-select" className={styles.label}>Stylist</label>
            <select id="stylist-select" className={styles.select}>
              <option value="">Select stylist</option>
              <option value="tanaka">Akari Tanaka</option>
              <option value="yamamoto">Sakura Yamamoto</option>
              <option value="nakamura">Kenji Nakamura</option>
            </select>
        </div>
      </section>

      <div className={styles['reserve-button-wrapper']}>
        <button className={styles['reserve-button']}>Reserve</button>
      </div>

    </div>
  );
};

export default ReservePage; 