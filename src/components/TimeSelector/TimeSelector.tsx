'use client';

import React, { useState } from 'react';
import styles from './TimeSelector.module.css';

interface TimeSelectorProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const timeSlots = {
  AM: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  PM: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
};

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect }) => {
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');

  return (
    <div className={styles.timeSelector}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'AM' ? styles.active : ''}`}
          onClick={() => setActiveTab('AM')}
        >
          AM
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'PM' ? styles.active : ''}`}
          onClick={() => setActiveTab('PM')}
        >
          PM
        </button>
      </div>
      <div className={styles.timeGrid}>
        {timeSlots[activeTab].map(time => (
          <button
            key={time}
            className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''}`}
            onClick={() => onTimeSelect(time)}
          >
            {time.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector; 