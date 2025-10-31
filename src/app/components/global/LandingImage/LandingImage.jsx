import React from 'react';
import styles from './LandingImage.module.scss';

const LandingImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  objectFit = 'cover'
}) => {
  const containerStyle = {
    width: width || '100%',
    height: height || 'auto',
  };

  const imageStyle = {
    objectFit: objectFit,
  };

  return (
    <div 
      className={`${styles.landingImage} ${className || ''}`}
      style={containerStyle}
    >
      <img 
        src={src} 
        alt={alt || 'Landing image'} 
        className={styles.image}
        style={imageStyle}
        loading="lazy"
      />
    </div>
  );
};

export default LandingImage;

