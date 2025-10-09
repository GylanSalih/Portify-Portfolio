import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { Sun, Moon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: isDarkMode ? 180 : 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      rotate: isDarkMode ? 0 : -180,
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.button
      className={`darkmode-toggle ${className}`}
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
      variants={toggleVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
    >
      <motion.div
        className="toggle-container"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="icon-wrapper"
            >
              <Sun size={18} className="text-gray-600 dark:text-gray-300" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="icon-wrapper"
            >
              <Moon size={18} className="text-gray-600 dark:text-gray-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
