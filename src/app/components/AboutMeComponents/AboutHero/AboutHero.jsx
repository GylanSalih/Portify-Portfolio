'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutHero.module.scss';

const AboutHero = () => {
  const images = [
    {
      id: 1,
      src: "/assets/images/portfolio/New3.png",
      alt: "About Me - Main Image",
      title: "About Me",
      description: "Passionate Developer & Designer"
    },
    {
      id: 2,
      src: "/assets/images/portfolio/New1.png",
      alt: "Coding Skills",
      title: "Development",
      description: "Full-Stack Development"
    },
    {
      id: 3,
      src: "/assets/images/portfolio/New2.png",
      alt: "Design Skills",
      title: "Design",
      description: "UI/UX Design"
    }
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Hauptbild - nimmt die volle Breite ein */}
          <div className={styles.heroImageLarge}>
            <div className={styles.imageWrapper}>
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={800}
                height={400}
                className={styles.image}
                priority
              />
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <h2 className={styles.title}>{images[0].title}</h2>
                  <p className={styles.description}>{images[0].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zwei Bilder nebeneinander */}
          <div className={styles.heroImagesSmall}>
            <div className={styles.heroImageSmall}>
              <div className={styles.imageWrapper}>
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={400}
                  height={200}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <h3 className={styles.subtitle}>{images[1].title}</h3>
                    <p className={styles.subdescription}>{images[1].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroImageSmall}>
              <div className={styles.imageWrapper}>
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  width={400}
                  height={200}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <h3 className={styles.subtitle}>{images[2].title}</h3>
                    <p className={styles.subdescription}>{images[2].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
