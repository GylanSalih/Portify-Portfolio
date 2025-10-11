'use client';

import { useState, useCallback, memo, useMemo } from 'react';
import {
  Globe,
  Palette,
  Code,
  ShoppingCart,
  Settings,
  Grid3X3,
} from 'lucide-react';
import styles from './Testimonials.module.scss';

const filterIcons = {
  1: Grid3X3,
  2: Palette,
  3: Globe,
  4: Code,
  5: ShoppingCart,
  6: Settings,
};

const categories = [
  { id: 1, name: 'All Projects', icon: Grid3X3 },
  { id: 2, name: 'Design & Branding', icon: Palette },
  { id: 3, name: 'Websites', icon: Globe },
  { id: 4, name: 'Web Applications', icon: Code },
  { id: 5, name: 'E-Commerce', icon: ShoppingCart },
  { id: 6, name: 'Custom Solutions', icon: Settings },
];

const testimonials = [
  {
    id: 1,
    img: '/assets/images/testimonials/testimonial-07.jpg',
    clientImg: '/assets/images/testimonials/client-logo-07.svg',
    name: 'Pierre-Gilles Laurent',
    company: 'Binance',
    role: 'Senior Product Manager',
    content:
      'The attention to detail and technical expertise delivered exceeded our expectations. Within just a few hours, we had a professional platform that impressed our entire team and stakeholders.',
    categories: [1, 3],
    rating: 5,
  },
  {
    id: 2,
    img: '/assets/images/testimonials/testimonial-02.jpg',
    clientImg: '/assets/images/testimonials/client-logo-02.svg',
    name: 'Andrew Kim',
    company: 'Samsung',
    role: 'Design Director',
    content:
      'Outstanding work that perfectly captured our brand vision. The solution is not only visually stunning but also incredibly functional. Truly world-class quality.',
    categories: [1, 2],
    rating: 5,
  },
  {
    id: 3,
    img: '/assets/images/testimonials/testimonial-05.jpg',
    clientImg: '/assets/images/testimonials/client-logo-05.svg',
    name: 'Miriam Evans',
    company: 'Cadbury',
    role: 'Marketing Lead',
    content:
      'This has been a game-changer for our marketing operations. The efficiency and quality delivered has transformed how we approach digital campaigns across multiple markets.',
    categories: [1, 3, 6],
    rating: 5,
  },
  {
    id: 4,
    img: '/assets/images/testimonials/testimonial-01.jpg',
    clientImg: '/assets/images/testimonials/client-logo-01.svg',
    name: 'MaKayla Parker',
    company: 'Disney',
    role: 'Creative Producer',
    content:
      'Exceptional creativity combined with technical precision. The deliverables not only met our high standards but elevated our entire digital presence. Truly impressive work.',
    categories: [1, 2, 4],
    rating: 5,
  },
  {
    id: 5,
    img: '/assets/images/testimonials/testimonial-09.jpg',
    clientImg: '/assets/images/testimonials/client-logo-09.svg',
    name: 'Mary Peterson',
    company: 'Ray-Ban',
    role: 'Digital Strategy Lead',
    content:
      "Perfect balance of innovation and usability. The solution requires no technical expertise to manage, yet delivers enterprise-level functionality. Couldn't be happier.",
    categories: [1, 3, 5],
    rating: 5,
  },
  {
    id: 6,
    img: '/assets/images/testimonials/testimonial-04.jpg',
    clientImg: '/assets/images/testimonials/client-logo-04.svg',
    name: 'Pavel Martinez',
    company: 'Canon',
    role: 'Product Development Manager',
    content:
      'Outstanding technical execution that has elevated our digital marketing capabilities. The quality and attention to detail is evident in every aspect of the final product.',
    categories: [1, 4, 6],
    rating: 5,
  },
  {
    id: 7,
    img: '/assets/images/testimonials/testimonial-06.jpg',
    clientImg: '/assets/images/testimonials/client-logo-06.svg',
    name: 'Eloise Vance',
    company: 'Maffell',
    role: 'Operations Director',
    content:
      'Incredibly versatile solution that adapts to our diverse needs. From content management to user engagement, everything works seamlessly. Highly recommended.',
    categories: [1, 4, 6],
    rating: 5,
  },
  {
    id: 8,
    img: '/assets/images/testimonials/testimonial-08.jpg',
    clientImg: '/assets/images/testimonials/client-logo-08.svg',
    name: 'Danielle Knox',
    company: 'Forbes Inc.',
    role: 'Technology Editor',
    content:
      "Elegant simplicity that doesn't compromise on functionality. The minimalist approach combined with powerful features makes this solution stand out in the market.",
    categories: [1, 2, 4],
    rating: 5,
  },
  {
    id: 9,
    img: '/assets/images/testimonials/testimonial-03.jpg',
    clientImg: '/assets/images/testimonials/client-logo-03.svg',
    name: 'Lucy Davis',
    company: 'Rio',
    role: 'Creative Director',
    content:
      'Transformed our entire workflow and creative process. The intuitive design and robust functionality feels like having an additional team member who never rests. Exceptional.',
    categories: [1, 2, 3],
    rating: 5,
  },
];

const TestimonialCard = memo(({ testimonial, index }) => {
  return (
    <article className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.logoWrapper}>
          <img
            src={testimonial.clientImg}
            alt={`${testimonial.company} logo`}
            className={styles.logo}
            loading="lazy"
          />
        </div>

        <blockquote className={styles.content}>
          {testimonial.content}
        </blockquote>

        <footer className={styles.author}>
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className={styles.avatar}
            loading="lazy"
          />
          <div className={styles.authorInfo}>
            <cite className={styles.name}>
              {testimonial.name}
            </cite>
            <span className={styles.role}>
              {testimonial.role}
            </span>
            <a
              href="#"
              className={styles.company}
              aria-label={`Visit ${testimonial.company} website`}
            >
              {testimonial.company}
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default memo(function Testimonials() {
  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryChange = useCallback((categoryId) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
  }, [activeCategory]);

  const filteredTestimonials = useMemo(() => 
    activeCategory === 1
      ? testimonials
      : testimonials.filter(testimonial =>
          testimonial.categories.includes(activeCategory)
        ), [activeCategory]);

  return (
    <section className={styles.section} aria-label="Client Testimonials">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h2 className={styles.title}>Trusted to Deliver Excellence</h2>
          <p className={styles.subtitle}>
            Empowering businesses with innovative solutions that drive growth,
            enhance user experience, and create lasting digital impact across
            industries.
          </p>
        </header>

        {/* Filter Navigation */}
        <nav className={styles.filters} aria-label="Project Categories">
          <div className={styles.filterWrapper}>
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`${styles.filterBtn} ${
                    activeCategory === category.id
                      ? styles.active
                      : ''
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={activeCategory === category.id}
                >
                  <IconComponent
                    className={styles.filterIcon}
                    size={18}
                  />
                  <span className={styles.filterText}>
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Results Counter */}
        <div className={styles.counter}>
          <span className={styles.counterText}>
            Showing {filteredTestimonials.length} of {testimonials.length}{' '}
            testimonials
          </span>
        </div>
      </div>
    </section>
  );
});
