'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ShadowGenerator.module.scss';
import { Copy, Check, RefreshCw } from 'lucide-react';

/* ── helpers ── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}

function mixToShadowColor(bgHex, alpha) {
  const [r, g, b] = hexToRgb(bgHex);
  const dr = Math.round(r * 0.25);
  const dg = Math.round(g * 0.25);
  const db = Math.round(b * 0.25);
  return `rgba(${dr}, ${dg}, ${db}, ${alpha.toFixed(2)})`;
}

const PAD = 160;

/* ── 2-D light position pad ── */
function LightPad({ padX, padY, onChange }) {
  const padRef = useRef(null);
  const dragging = useRef(false);

  const getPos = useCallback((e) => {
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    const x = Math.max(0, Math.min(PAD, ((src.clientX - rect.left) / rect.width) * PAD));
    const y = Math.max(0, Math.min(PAD, ((src.clientY - rect.top) / rect.height) * PAD));
    onChange(x, y);
  }, [onChange]);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) getPos(e); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [getPos]);

  return (
    <div
      ref={padRef}
      className={styles.lightPad}
      onMouseDown={(e) => { dragging.current = true; getPos(e); }}
      onTouchStart={(e) => { dragging.current = true; getPos(e); }}
    >
      <div className={styles.padCrosshair} />
      <div
        className={styles.lightDot}
        style={{ left: `${(padX / PAD) * 100}%`, top: `${(padY / PAD) * 100}%` }}
      />
    </div>
  );
}

/* ── main component ── */
export default function ShadowGenerator() {
  const [padX, setPadX] = useState(PAD * 0.65);
  const [padY, setPadY] = useState(PAD * 0.3);
  const [strength, setStrength] = useState(60);
  const [crispiness, setCrispiness] = useState(25);
  const [layers, setLayers] = useState(1);
  const [bgColor, setBgColor] = useState('#f0f0f0');
  const [tintShadow, setTintShadow] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Derive shadow values from light position + sliders */
  const xOff = Math.round(((padX / PAD) - 0.5) * strength * 0.55);
  const yOff = Math.round(((padY / PAD) - 0.5) * strength * 0.55);
  const blur  = Math.round((1 - crispiness / 100) * strength * 1.1);
  const spread = Math.round((crispiness / 100) * strength * 0.14);
  const alpha = 0.12 + (strength / 100) * 0.48;

  const shadowColor = tintShadow
    ? mixToShadowColor(bgColor, alpha)
    : hexToRgba('#000000', alpha);

  const buildShadow = () => {
    if (layers <= 1) return `${xOff}px ${yOff}px ${blur}px ${spread}px ${shadowColor}`;
    return Array.from({ length: layers }, (_, i) => {
      const t = (i + 1) / layers;
      return `${Math.round(xOff * t)}px ${Math.round(yOff * t)}px ${Math.round(blur * t)}px ${Math.round(spread * t)}px ${shadowColor}`;
    }).join(',\n           ');
  };

  const shadow = buildShadow();
  const css = `box-shadow: ${shadow};`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [css]);

  const randomize = () => {
    setPadX(Math.random() * PAD);
    setPadY(Math.random() * PAD);
    setStrength(Math.floor(Math.random() * 65) + 20);
    setCrispiness(Math.floor(Math.random() * 70));
    setLayers(Math.floor(Math.random() * 3) + 1);
  };

  const Slider = ({ label, val, setter, min, max, unit }) => {
    const pct = ((val - min) / (max - min)) * 100;
    return (
      <div className={styles.sliderControl}>
        <div className={styles.sliderHeader}>
          <span className={styles.sliderLabel}>{label}</span>
          <span className={styles.sliderValue}>{val}{unit}</span>
        </div>
        <input
          type="range" min={min} max={max} value={val}
          onChange={e => setter(Number(e.target.value))}
          className={styles.slider}
          style={{ '--pct': `${pct}%` }}
        />
      </div>
    );
  };

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Shadow Generator</h1>
      <p className={styles.desc}>Design CSS box shadows with a live 2D light source.</p>

      {/* Preview board — 3 example shapes */}
      <div className={styles.previewBoard} style={{ backgroundColor: bgColor }}>
        <div className={styles.exampleSquare}  style={{ boxShadow: shadow }} />
        <div className={styles.exampleRect}    style={{ boxShadow: shadow }} />
        <div className={styles.exampleCircle}  style={{ boxShadow: shadow }} />
      </div>

      {/* Controls */}
      <div className={styles.controlsLayout}>
        {/* Light pad */}
        <div className={styles.lightSection}>
          <span className={styles.sectionLabel}>Light Source</span>
          <LightPad padX={padX} padY={padY} onChange={(x, y) => { setPadX(x); setPadY(y); }} />
          <p className={styles.lightHint}>Drag to move the light</p>
        </div>

        {/* Sliders + options */}
        <div className={styles.slidersSection}>
          <Slider label="Strength"  val={strength}  setter={setStrength}  min={0} max={100} unit="" />
          <Slider label="Crispness" val={crispiness} setter={setCrispiness} min={0} max={100} unit="" />
          <Slider label="Layers"    val={layers}     setter={setLayers}     min={1} max={5}   unit="" />

          <div className={styles.optionsRow}>
            {/* Background colour */}
            <div className={styles.optionField}>
              <span className={styles.sectionLabel}>Background</span>
              <div className={styles.colorRow}>
                <input
                  type="color" value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className={styles.colorPicker}
                />
                <input
                  type="text" value={bgColor} spellCheck={false}
                  onChange={e => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setBgColor(e.target.value)}
                  className={styles.colorInput}
                />
              </div>
            </div>

            {/* Tint shadow toggle */}
            <div className={styles.optionField}>
              <span className={styles.sectionLabel}>Tint Shadow</span>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={tintShadow}
                  onChange={e => setTintShadow(e.target.checked)}
                  className={styles.toggleInput}
                />
                <span className={styles.toggleSlider} />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className={styles.output}>
        <p className={styles.outputLabel}>CSS Output</p>
        <code className={styles.code}>{css}</code>
        <div className={styles.outputActions}>
          <button className={styles.btn} onClick={randomize}><RefreshCw size={14} /> Randomize</button>
          <button className={styles.btn} onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>
    </div>
  );
}
