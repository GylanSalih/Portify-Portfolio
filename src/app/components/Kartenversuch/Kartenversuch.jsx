'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Kartenversuch.module.css';

const Kartenversuch = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    // exakt wie im „roots“-Snippet: gleiche Masken-/Asset-URLs möglich
    const foilMaskUrl = 'url(/assets/images/cardHoloEffect/mask.png)';

    const EDGE_MARGIN = 12;   // px Hysterese um die Karte
    const LEAVE_DELAY = 15;   // ms – glättet schnelle Flips (50% schneller: 30ms → 15ms)
    const PARALLAX_PX = 35;   // Übersetzung der Foil/Glow (50% mehr: 25px → 35px)
    const ALPHA = 0.55;       // Low-pass Smoothing (0..1) (50% schneller: 0.35 → 0.55)

    const listeners = [];
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const initInteractivity = (card) => {
      if (!card) return;
      card.style.setProperty('--foil-mask', foilMaskUrl);

      let hovering = false;
      let leaveTimer = null;

      // RAF + Smoothing
      let animId = null;
      const last = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };

      const getMaxTilt = () => {
        const fromCard = parseFloat(getComputedStyle(card).getPropertyValue('--tilt'));
        if (!Number.isNaN(fromCard)) return fromCard;
        const fromRoot = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tilt'));
        return Number.isNaN(fromRoot) ? 22 : fromRoot;
      };

      const setCardVars = (cx, cy) => {
        const rect = card.getBoundingClientRect();
        const nx = clamp01((cx - rect.left) / rect.width);
        const ny = clamp01((cy - rect.top) / rect.height);

        const maxTilt = getMaxTilt();
        const rx = (0.5 - ny) * (maxTilt * 2);
        const ry = (nx - 0.5) * (maxTilt * 2);

        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);

        const tx = (nx - 0.5) * PARALLAX_PX;
        const ty = (ny - 0.5) * PARALLAX_PX;

        card.style.setProperty('--tx', `${tx}px`);
        card.style.setProperty('--ty', `${ty}px`);
        card.style.setProperty('--gx', `${nx * 100}%`);
        card.style.setProperty('--gy', `${ny * 100}%`);

        // „roots“-Look: Hue hängt nur an X
        card.style.setProperty('--hue', `${(nx * 360).toFixed(1)}deg`);
      };

      const rafSet = (cx, cy) => {
        last.x = cx; last.y = cy;
        if (animId == null) {
          animId = requestAnimationFrame(() => {
            animId = null;
            // weiches Low-pass Smoothing gegen „Glitch“
            smooth.x += (last.x - smooth.x) * ALPHA;
            smooth.y += (last.y - smooth.y) * ALPHA;
            setCardVars(smooth.x, smooth.y);
          });
        }
      };

      const onEnter = () => {
        hovering = true;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
        card.removeAttribute('idle');
        window.addEventListener('pointermove', onWindowPointerMove);
        listeners.push({ target: window, type: 'pointermove', handler: onWindowPointerMove });
      };

      const doLeave = () => {
        hovering = false;
        card.setAttribute('idle', '');
        // zurück in neutralen Zustand
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
        card.style.removeProperty('--tx');
        card.style.removeProperty('--ty');
        card.style.removeProperty('--gx');
        card.style.removeProperty('--gy');
        card.style.removeProperty('--hue');
        window.removeEventListener('pointermove', onWindowPointerMove);
      };

      const scheduleLeave = () => {
        if (leaveTimer) return;
        leaveTimer = setTimeout(() => {
          leaveTimer = null;
          if (!hovering) doLeave();
        }, LEAVE_DELAY);
      };

      const withinMargin = (cx, cy) => {
        const r = card.getBoundingClientRect();
        return (
          cx >= r.left - EDGE_MARGIN &&
          cx <= r.right + EDGE_MARGIN &&
          cy >= r.top - EDGE_MARGIN &&
          cy <= r.bottom + EDGE_MARGIN
        );
      };

      // Element-lokal
      const onPointerEnter = (e) => { onEnter(); rafSet(e.clientX, e.clientY); };
      const onPointerMove  = (e) => { rafSet(e.clientX, e.clientY); };
      const onPointerLeave = () => { hovering = false; scheduleLeave(); };

      // Global, solange in der Nähe
      const onWindowPointerMove = (e) => {
        if (withinMargin(e.clientX, e.clientY)) {
          if (!hovering) {
            hovering = true;
            if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
          }
          rafSet(e.clientX, e.clientY);
        } else if (hovering) {
          hovering = false;
          scheduleLeave();
        }
      };

      // Touch
      const onTouchStart = (e) => { const t = e.touches[0]; onEnter(); rafSet(t.clientX, t.clientY); };
      const onTouchMove  = (e) => {
        const t = e.touches[0]; if (!t) return;
        if (withinMargin(t.clientX, t.clientY)) {
          hovering = true;
          if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
          rafSet(t.clientX, t.clientY);
        } else {
          hovering = false; scheduleLeave();
        }
      };
      const onTouchEnd   = () => { hovering = false; scheduleLeave(); };

      // (optional) Gyro – nur auf Tap aktivieren
      const onEnableGyroClick = async () => {
        try {
          if (window.DeviceOrientationEvent &&
              typeof window.DeviceOrientationEvent.requestPermission === 'function') {
            const perm = await window.DeviceOrientationEvent.requestPermission();
            if (perm !== 'granted') return;
          }
          const rectForGyro = () => card.getBoundingClientRect();
          const onDeviceOrientation = (ev) => {
            const r = rectForGyro();
            const x = (ev.gamma ?? 0) / 45; // -1..1
            const y = (ev.beta  ?? 0) / 90; // -1..1
            const cx = r.left + r.width  * (0.5 + x * 0.25);
            const cy = r.top  + r.height * (0.5 + y * 0.25);
            onEnter();
            rafSet(cx, cy);
          };
          window.addEventListener('deviceorientation', onDeviceOrientation);
          listeners.push({ target: window, type: 'deviceorientation', handler: onDeviceOrientation });
        } catch (e) {
          console.warn('Error enabling gyroscope:', e);
        }
      };

      // Listener registrieren
      card.addEventListener('pointerenter', onPointerEnter);
      card.addEventListener('pointermove',  onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);
      listeners.push({ target: card, type: 'pointerenter', handler: onPointerEnter });
      listeners.push({ target: card, type: 'pointermove',  handler: onPointerMove });
      listeners.push({ target: card, type: 'pointerleave', handler: onPointerLeave });

      card.addEventListener('touchstart', onTouchStart, { passive: true });
      card.addEventListener('touchmove',  onTouchMove,  { passive: true });
      card.addEventListener('touchend',   onTouchEnd);
      listeners.push({ target: card, type: 'touchstart', handler: onTouchStart, opts: { passive: true } });
      listeners.push({ target: card, type: 'touchmove',  handler: onTouchMove,  opts: { passive: true } });
      listeners.push({ target: card, type: 'touchend',   handler: onTouchEnd });

      card.addEventListener('click', onEnableGyroClick);
      listeners.push({ target: card, type: 'click', handler: onEnableGyroClick });
    };

    // CSS-Module-Selektor (gehashter Name)
    container.querySelectorAll('.' + styles.card).forEach(initInteractivity);

    // Cleanup
    return () => {
      listeners.forEach(({ target, type, handler, opts }) => {
        try { target.removeEventListener(type, handler, opts); } catch (e) {
          console.warn('Error removing event listener:', e);
        }
      });
    };
  }, []);

  return (
    <div className={styles.kartenversuchWrapper}>
      <div
        ref={rootRef}
        style={{
          ['--card-w']: '285px',
          ['--card-h']: '400px',
          ['--radius']: '18px',
          ['--shadow']: '0 12px 30px rgba(0,0,0,.25)',
          ['--tilt']: '22',        // nur Zahl; JS ergänzt "deg" (50% mehr: 15° → 22°)
          ['--glow']: 0.35,        // Stärke des Hotspots
        }}
      >
        <div className={styles.stage}>
          <div className={styles.row}>
            {/* Card A – mit deinen Assets (beliebig anpassen) */}
            <div className={styles.card} id="card-a" idle="">
              <div className={`${styles.layer} ${styles.base}`}>
                <Image
                  alt="Base Artwork"
                  src="/assets/images/cardHoloEffect/baseartwork.png"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <div className={`${styles.layer} ${styles.foil}`}>
                <Image
                  alt="Foil Texture"
                  src="/assets/images/cardHoloEffect/foilTexture.jpg"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className={`${styles.layer} ${styles.text}`}>
                <Image
                  alt="Text Overlay"
                  src="/assets/images/cardHoloEffect/textOverlay.png"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className={`${styles.layer} ${styles.glow}`} />
            </div>

            {/* Card B – Fallback ohne Bild-Assets */}
            <div className={styles.card} id="card-b" idle="">
              <div
                className={`${styles.layer} ${styles.base}`}
                style={{
                  background:
                    'radial-gradient(120% 120% at 10% 15%, #3f1a6b 0%, #12121a 40%), linear-gradient(135deg, #2940a8 10%, #0b132b 40%, #1b998b 100%)',
                  backgroundBlendMode: 'screen, normal',
                }}
              />
              <div className={`${styles.layer} ${styles.foil}`}>
                <Image
                  alt="Foil Noise"
                  src="/assets/images/cardHoloEffect/foilTexture.jpg"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                className={`${styles.layer} ${styles.text}`}
                style={{ display: 'grid', placeItems: 'center', color: '#fff' }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    fontSize: '28px',
                    textShadow: '0 2px 8px rgba(0,0,0,.55)',
                  }}
                >
                  Holo Foil
                </div>
              </div>
              <div className={`${styles.layer} ${styles.glow}`} />
            </div>

            {/* Card C – Experimentelle Karte */}
            <div className={styles.card} id="card-c" idle="">
              <div
                className={`${styles.layer} ${styles.base}`}
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 20%, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%), linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                  backgroundBlendMode: 'multiply, screen',
                }}
              />
              <div className={`${styles.layer} ${styles.foil}`}>
                <Image
                  alt="Foil Noise"
                  src="/assets/images/cardHoloEffect/foilTexture.jpg"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div
                className={`${styles.layer} ${styles.text}`}
                style={{ display: 'grid', placeItems: 'center', color: '#fff' }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    fontSize: '28px',
                    textShadow: '0 2px 8px rgba(0,0,0,.55)',
                  }}
                >
                  Experiment
                </div>
              </div>
              <div className={`${styles.layer} ${styles.glow}`} />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Kartenversuch;
