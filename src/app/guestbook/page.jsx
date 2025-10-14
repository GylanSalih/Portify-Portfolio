'use client';
import InfinityCarousel from '../components/InfinityCarousel/InfinityCarousel';
import styles from './guestbook.module.scss';

export default function Guestbook() {
  // Carousel items with OniGirl images
  const carouselItems = [
    { id: 1, image: '/assets/images/landing/OniGirl1.webp', title: 'OniGirl 1' },
    { id: 2, image: '/assets/images/landing/OniGirl3.jpg', title: 'OniGirl 3' },
    { id: 3, image: '/assets/images/landing/OniGirl4.jpg', title: 'OniGirl 4' },
    { id: 4, image: '/assets/images/landing/OniGirl5.webp', title: 'OniGirl 5' },
    { id: 5, image: '/assets/images/landing/OniGirl6.webp', title: 'OniGirl 6' },
    { id: 6, image: '/assets/images/landing/OniGirl7.webp', title: 'OniGirl 7' },
    { id: 7, image: '/assets/images/landing/OniGirl11.webp', title: 'OniGirl 11' },
    { id: 8, image: '/assets/images/landing/OniGirl13.webp', title: 'OniGirl 13' },
    { id: 9, image: '/assets/images/landing/OniBoy1.webp', title: 'OniBoy 1' },
    { id: 10, image: '/assets/images/landing/OniBoy2.webp', title: 'OniBoy 2' },
  ];

  return (
    <div className={styles.container}>
      <InfinityCarousel items={carouselItems} />
    </div>
  );
}
