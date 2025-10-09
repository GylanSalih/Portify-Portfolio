'use client';

import React, { useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import '../../../styles/fancybox-custom.css'; // import erst nach default -> von fancybox custom css um default zu überschreiben
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  // Initialize Fancybox for this gallery
  useEffect(() => {
    if (images && images.length > 0) {
      try {
        Fancybox.bind('[data-fancybox="gallery"]', {
          Thumbs: {
            type: 'modern',
          },
          Toolbar: {
            display: {
              middle: ['zoomIn', 'zoomOut', 'toggle1:1'],
              right: ['slideshow', 'thumbs', 'close'],
            },
          },
          Carousel: {
            Navigation: true,
          },
          // Ensure proper image display
          Image: {
            zoom: true,
            click: 'close',
            wheel: 'slide',
          },
        });
      } catch (error) {
        console.error('Error initializing Fancybox:', error);
      }
    }

    return () => {
      try {
        Fancybox.destroy();
      } catch (error) {
        console.error('Error destroying Fancybox:', error);
      }
    };
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>Galerie</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {images.map((image, index) => (
            <a
              key={`image-${index}`}
              data-fancybox="gallery"
              href={image.url}
              data-caption={image.caption}
              className={styles.thumbnail}
            >
              <img
                src={image.url}
                alt={image.caption}
                loading="lazy"
                className={styles.image}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
