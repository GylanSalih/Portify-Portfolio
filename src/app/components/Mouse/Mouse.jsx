'use client'; // Direktive, um diese Datei nur auf der Client-Seite auszuführen

import React, { useEffect, useState } from 'react';
import styles from './Mouse.module.scss';

const Mouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    let animationFrameId;

    // Update Cursor und Follower Position
    const updateCursorPosition = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) / 9,
        y: prev.y + (mousePosition.y - prev.y) / 9,
      }));

      // Request next animation frame
      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };

    // Starte die Cursor-Bewegung
    animationFrameId = requestAnimationFrame(updateCursorPosition);

    // MEMORY LEAK FIX - Cleanup animation frame
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition]);

  // SEPARATE useEffect for event listeners - MEMORY LEAK FIX
  useEffect(() => {
    // Mausbewegungs-Event-Listener
    const updateMousePosition = e => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Mouse down/up handlers
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners - runs only once
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []); // Empty dependency array - only run once!

  return (
    <>
      <div
        className={`${styles.cursor} ${isMouseDown ? styles.active : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
      <div
        className={`${styles.follower} ${isMouseDown ? styles.active : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
        }}
      ></div>
    </>
  );
};

export default Mouse;
