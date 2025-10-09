'use client';

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import styles from './ImageModal.module.css';

const ImageModal = ({ 
  isOpen, 
  onClose, 
  currentImage, 
  onPrevImage, 
  onNextImage, 
  hasMultipleImages 
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <X className="icon" />
        </button>
        
        <Image
          src={currentImage?.url || '/images/placeholder.jpg'}
          alt={currentImage?.caption || 'Project Image'}
          width={1200}
          height={800}
          className={styles.image}
        />
        
        {hasMultipleImages && (
          <>
            <button className={`${styles.nav} ${styles.prev}`} onClick={onPrevImage}>
              <ChevronLeft className="icon" />
            </button>
            <button className={`${styles.nav} ${styles.next}`} onClick={onNextImage}>
              <ChevronRight className="icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
