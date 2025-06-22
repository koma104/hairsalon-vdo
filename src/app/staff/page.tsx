import Image from 'next/image';
import styles from './staff.module.css';

const staffMembers = [
  {
    name: 'Akari Tanaka',
    title: 'Senior Stylist',
    specialty: 'Specializes in color and highlights',
    imageUrl: '/images/staff-image-01.png',
  },
  {
    name: 'Sakura Yamamoto',
    title: 'Stylist',
    specialty: 'Expert in cutting and styling',
    imageUrl: '/images/staff-image-02.png',
  },
  {
    name: 'Kenji Nakamura',
    title: 'Barber',
    specialty: "Specializes in men's grooming",
    imageUrl: '/images/staff-image-03.png',
  },
  {
    name: 'Yuki Sato',
    title: 'Junior Stylist',
    specialty: 'Focuses on modern cuts and treatments',
    imageUrl: '/images/staff-image-04.png',
  },
];

const StaffPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Staff</h1>
      <div className={styles.staffGrid}>
        {staffMembers.map((staff, index) => (
          <div key={index} className={styles.staffCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={staff.imageUrl}
                alt={staff.name}
                width={128}
                height={170}
                className={styles.staffImage}
              />
            </div>
            <div className={styles.staffInfo}>
              <h2 className={styles.staffName}>{staff.name}</h2>
              <p className={styles.staffTitle}>{staff.title}</p>
              <p className={styles.staffSpecialty}>{staff.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage; 