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
      <h1 className={styles.pageTitle}>Reserve</h1>
      
      {/* Date Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Date</h2>
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      </section>

      {/* Time Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Time</h2>
        <TimeSelector selectedTime={selectedTime} onTimeSelect={setSelectedTime} />
      </section>

      {/* Service & Stylist Section */}
      <section className={styles.section}>
        <div className={styles.formGroup}>
          <label htmlFor="service-select" className={styles.label}>Service</label>
          <select id="service-select" className={styles.select}>
            <option value="">Select service</option>
            <option value="cut">Cut</option>
            <option value="color">Color</option>
            <option value="treatment">Treatment</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stylist-select" className={styles.label}>Stylist</label>
          <select id="stylist-select" className={styles.select}>
            <option value="">Select stylist</option>
            <option value="tanaka">Akari Tanaka</option>
            <option value="yamamoto">Sakura Yamamoto</option>
            <option value="nakamura">Kenji Nakamura</option>
          </select>
        </div>
      </section>

      <div className={styles.reserveButtonWrapper}>
        <button className={styles.reserveButton}>Reserve</button>
      </div>

    </div>
  );
};

export default ReservePage; 