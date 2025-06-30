import Image from 'next/image';
import styles from './staff.module.css';

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
];

const StaffPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles['section-title']}>Staff</h2>
      <div className={styles['staff-list']}>
        {staffMembers.map((staff, index) => (
          <div key={index} className={styles['staff-card']}>
            <div className={styles['image-wrapper']}>
              <Image
                src={staff.imageUrl}
                alt={staff.name}
                width={128}
                height={170}
                className={styles['staff-image']}
              />
            </div>
            <div className={styles['staff-info']}>
              <h3 className={styles['staff-name']}>{staff.name}</h3>
              <p className={styles['staff-title']}>{staff.title}</p>
              <p className={styles['staff-specialty']}>{staff.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage; 