'use client';
import { useState, useCallback, useEffect } from 'react';
import styles from './LikeButton.module.scss';

/* ── SVG hearts ── */
const HeartIdle = () => (
  <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#idle_blur)">
      <path
        d="M56 15.51C56 33.01 30.0525 47.175 28.9475 47.76C28.6563 47.9167 28.3307 47.9987 28 47.9987C27.6693 47.9987 27.3437 47.9167 27.0525 47.76C25.9475 47.175 0 33.01 0 15.51C0.00463184 11.4006 1.63915 7.46078 4.54496 4.55497C7.45077 1.64916 11.3906 0.0146416 15.5 0.0100098C20.6625 0.0100098 25.1825 2.23001 28 5.98251C30.8175 2.23001 35.3375 0.0100098 40.5 0.0100098C44.6094 0.0146416 48.5492 1.64916 51.455 4.55497C54.3609 7.46078 55.9954 11.4006 56 15.51Z"
        fill="url(#idle_radial)"
        fillOpacity="0.1"
      />
      <path
        d="M28.7135 47.3181L28.7106 47.3197C28.4922 47.4372 28.248 47.4987 28 47.4987C27.752 47.4987 27.5078 47.4372 27.2894 47.3197L27.2864 47.3181C26.7509 47.0346 20.0253 43.368 13.4413 37.602C6.83094 31.8129 0.500135 24.0262 0.5 15.5103C0.504559 11.5334 2.0864 7.72064 4.89851 4.90852C7.71063 2.09641 11.5234 0.514569 15.5003 0.51001C20.5165 0.510087 24.8837 2.66474 27.6002 6.28272L28 6.81525L28.3998 6.28272C31.1163 2.66474 35.4835 0.510088 40.4997 0.51001C44.4766 0.514569 48.2894 2.09641 51.1015 4.90852C53.9137 7.7207 55.4955 11.5336 55.5 15.5106C55.4997 24.0264 49.169 31.813 42.5587 37.602C35.9747 43.368 29.2491 47.0346 28.7135 47.3181Z"
        stroke="url(#idle_stroke)"
      />
    </g>
    <defs>
      <filter id="idle_blur" x="-240" y="-239.99" width="536" height="527.989" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="120" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset /><feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
      </filter>
      <radialGradient id="idle_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28 24.32) rotate(-0.646017) scale(28.0018 68.0613)">
        <stop stopColor="#707070" /><stop offset="1" stopColor="#0A0A0A" />
      </radialGradient>
      <linearGradient id="idle_stroke" x1="0.365912" y1="0.18073" x2="65.1989" y2="25.9249" gradientUnits="userSpaceOnUse">
        <stop stopColor="#171717" /><stop offset="0.62" stopColor="#525252" /><stop offset="1" stopColor="#171717" />
      </linearGradient>
    </defs>
  </svg>
);

const HeartActive = () => (
  <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#active_blur)">
      <path
        d="M56 15.5523C56 32.9534 30.0525 47.0384 28.9475 47.6201C28.6563 47.7759 28.3307 47.8574 28 47.8574C27.6693 47.8574 27.3437 47.7759 27.0525 47.6201C25.9475 47.0384 0 32.9534 0 15.5523C0.00463184 11.4661 1.63915 7.54857 4.54496 4.65918C7.45077 1.76978 11.3906 0.144498 15.5 0.139893C20.6625 0.139893 25.1825 2.34735 28 6.07865C30.8175 2.34735 35.3375 0.139893 40.5 0.139893C44.6094 0.144498 48.5492 1.76978 51.455 4.65918C54.3608 7.54857 55.9954 11.4661 56 15.5523Z"
        fill="url(#active_radial)"
      />
      <path
        d="M28.7146 47.1777L28.7117 47.1792C28.4931 47.2962 28.2485 47.3574 28 47.3574C27.7515 47.3574 27.5069 47.2962 27.2883 47.1792L27.2854 47.1777C26.7498 46.8957 20.0242 43.2498 13.4402 37.5164C6.82942 31.7597 0.500138 24.0179 0.5 15.5526C0.504557 11.5998 2.08571 7.80964 4.89751 5.01373C7.70941 2.21772 11.5224 0.644427 15.5003 0.639893C20.5177 0.639968 24.8849 2.78299 27.601 6.37995L28 6.90838L28.399 6.37995C31.1151 2.78299 35.4823 0.639969 40.4997 0.639893C44.4775 0.644427 48.2906 2.21772 51.1025 5.01373C53.9144 7.80971 55.4955 11.6 55.5 15.5529C55.4997 24.0181 49.1705 31.7598 42.5598 37.5164C35.9758 43.2498 29.2502 46.8957 28.7146 47.1777Z"
        stroke="url(#active_stroke)"
      />
    </g>
    <defs>
      <filter id="active_blur" x="-8" y="-7.86011" width="72" height="63.7175" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="8" /><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="-12" /><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow" />
      </filter>
      <radialGradient id="active_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.2385 48.7531) rotate(89.8959) scale(25.095 29.4511)">
        <stop stopColor="#4CFFB4" /><stop offset="0.959063" stopColor="#2E996C" />
      </radialGradient>
      <linearGradient id="active_stroke" x1="0.365912" y1="0.309648" x2="65.0984" y2="26.1599" gradientUnits="userSpaceOnUse">
        <stop stopColor="#171717" /><stop offset="0.62" stopColor="#525252" /><stop offset="1" stopColor="#171717" />
      </linearGradient>
    </defs>
  </svg>
);

/* ── Component ── */
export default function LikeButton({ slug, stats, statsLoading, incrementLikes }) {
  const [liked, setLiked]   = useState(false);
  const [ripple, setRipple] = useState(false);

  // Restore liked state from localStorage
  useEffect(() => {
    if (!slug) return;
    try {
      if (localStorage.getItem(`liked_${slug}`) === 'true') setLiked(true);
    } catch { /* noop */ }
  }, [slug]);

  const count = statsLoading ? 0 : (stats?.likes ?? 0);

  const handleClick = useCallback(() => {
    if (liked) return;
    setLiked(true);
    try { localStorage.setItem(`liked_${slug}`, 'true'); } catch { /* noop */ }
    incrementLikes?.();
    setRipple(false);
    requestAnimationFrame(() => setRipple(true));
    setTimeout(() => setRipple(false), 600);
  }, [liked, slug, incrementLikes]);

  const digits = String(count).split('');

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${liked ? styles.liked : ''}`}
        onClick={handleClick}
        aria-pressed={liked}
        aria-label={liked ? 'Unlike' : 'Like'}
      >

        {/* floating counter */}
        <span className={styles.counter} aria-hidden="true">
          {digits.map((d, i) => (
            <span key={i} className={styles.digit}>{d}</span>
          ))}
        </span>

        {/* gradient border ring */}
        <div className={styles.ring}>
          {ripple && <span className={styles.ripple} />}

          {/* idle heart */}
          <span className={styles.heartIdle}>
            <HeartIdle />
          </span>

          {/* active (green) heart */}
          <span className={styles.heartActive}>
            <HeartActive />
          </span>
        </div>
      </button>
    </div>
  );
}
