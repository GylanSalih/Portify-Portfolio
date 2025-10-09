import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import './AudioIndicator.css';

const AudioIndicator = ({
  isAudioPlaying,
  toggleAudioIndicator,
  className = '',
}) => {
  const audioElementRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play().catch(err => {
        console.error('Audio play failed:', err);
      });
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying, hasMounted]);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: isAudioPlaying ? 360 : 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const waveVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (!hasMounted) return null; // vermeidet Hydration-Mismatch

  return (
    <div className={`audio-indicator ${className}`}>
      <motion.button
        onClick={toggleAudioIndicator}
        className="audio-btn"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
        aria-label={`${isAudioPlaying ? 'Pause' : 'Play'} audio`}
      >
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/assets/audio/mhinpang_sound.mp3"
          loop
        />

        <motion.div
          className="audio-icon"
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {isAudioPlaying ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2
                  size={18}
                  className="text-gray-600 dark:text-gray-300"
                />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX
                  size={18}
                  className="text-gray-600 dark:text-gray-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Audio Wave Animation */}
        <AnimatePresence>
          {isAudioPlaying && (
            <motion.div
              className="audio-wave"
              variants={waveVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {[1, 2, 3, 4].map((bar, index) => (
                <motion.div
                  key={bar}
                  className="wave-bar"
                  initial={{ height: 0 }}
                  animate={{
                    height: [0, 16, 0],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: 'easeInOut',
                    },
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AudioIndicator;
