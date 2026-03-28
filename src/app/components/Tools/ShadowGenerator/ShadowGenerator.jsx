'use client';
import { useState, useCallback } from 'react';
import styles from '../GradientGenerator/GradientGenerator.module.scss';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function ShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(40);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${(alpha / 100).toFixed(2)})`;
  };

  const shadow = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [css]);

  const randomize = () => {
    setX(Math.floor(Math.random() * 20) - 10);
    setY(Math.floor(Math.random() * 30) + 2);
    setBlur(Math.floor(Math.random() * 60) + 4);
    setSpread(Math.floor(Math.random() * 20) - 10);
    setOpacity(Math.floor(Math.random() * 60) + 10);
  };

  const Slider = ({ label, val, setter, min, max }) => (
    <div className={styles.sliderControl}>
      <span>{label}</span>
      <div className={styles.sliderRow}>
        <input
          type="range" min={min} max={max} value={val}
          onChange={e => setter(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>{val}px</span>
      </div>
    </div>
  );

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Shadow Generator</h1>
      <p className={styles.desc}>Design CSS box shadows with live preview.</p>

      <div className={styles.shadowPreview}>
        <div className={styles.shadowBox} style={{ boxShadow: shadow }} />
      </div>

      <Slider label="X Offset" val={x} setter={setX} min={-60} max={60} />
      <Slider label="Y Offset" val={y} setter={setY} min={-60} max={60} />
      <Slider label="Blur" val={blur} setter={setBlur} min={0} max={100} />
      <Slider label="Spread" val={spread} setter={setSpread} min={-50} max={50} />
      <Slider label="Opacity" val={opacity} setter={setOpacity} min={0} max={100} />

      <div className={styles.controls}>
        <label className={styles.control}>
          <span>Color</span>
          <div className={styles.colorRow}>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorPicker} />
            <input type="text" value={color} onChange={e => setColor(e.target.value)} className={styles.colorInput} spellCheck={false} />
          </div>
        </label>
        <label className={styles.control}>
          <span>Inset</span>
          <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer', marginTop: '0.5rem' }} />
        </label>
      </div>

      <div className={styles.output}>
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
