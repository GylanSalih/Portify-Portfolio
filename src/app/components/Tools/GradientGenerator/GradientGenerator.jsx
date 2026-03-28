'use client';
import { useState, useCallback, useRef } from 'react';
import styles from './GradientGenerator.module.scss';
import { Copy, Check, RefreshCw } from 'lucide-react';
import ColorPicker from '../../../tools/gradient-generator/Colorpicker/Colorpicker';

const PRESETS = [
  { name: 'Sunset', from: '#f97316', to: '#ec4899', dir: '135deg' },
  { name: 'Ocean', from: '#3b82f6', to: '#06b6d4', dir: '135deg' },
  { name: 'Forest', from: '#22c55e', to: '#16a34a', dir: '180deg' },
  { name: 'Dusk', from: '#8b5cf6', to: '#6366f1', dir: '135deg' },
  { name: 'Rose', from: '#fb7185', to: '#f43f5e', dir: '135deg' },
  { name: 'Slate', from: '#64748b', to: '#334155', dir: '180deg' },
];

export default function GradientGenerator() {
  const [from, setFrom] = useState('#3b82f6');
  const [to, setTo] = useState('#8b5cf6');
  const [dir, setDir] = useState('135deg');
  const [copied, setCopied] = useState(false);
  // Increment to force ColorPicker remount when preset is selected
  const [pickerKey, setPickerKey] = useState(0);

  const css = `background: linear-gradient(${dir}, ${from}, ${to});`;
  const gradient = `linear-gradient(${dir}, ${from}, ${to})`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [css]);

  const randomize = () => {
    const rand = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const angles = ['0deg','45deg','90deg','135deg','180deg','225deg','270deg','315deg'];
    setFrom(rand());
    setTo(rand());
    setDir(angles[Math.floor(Math.random() * angles.length)]);
    setPickerKey(k => k + 1);
  };

  const applyPreset = (p) => {
    setFrom(p.from);
    setTo(p.to);
    setDir(p.dir);
    setPickerKey(k => k + 1);
  };

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Gradient Generator</h1>
      <p className={styles.desc}>Build beautiful CSS gradients visually.</p>

      <div className={styles.generatorLayout}>
        {/* Left: Large preview */}
        <div className={styles.generatorLeft}>
          <div className={styles.preview} style={{ background: gradient }} />

          <div className={styles.presets}>
            <p className={styles.presetsLabel}>Presets</p>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button
                  key={p.name}
                  className={styles.presetBtn}
                  style={{ background: `linear-gradient(${p.dir}, ${p.from}, ${p.to})` }}
                  onClick={() => applyPreset(p)}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className={styles.generatorRight}>
          {/* Color pickers */}
          <div className={styles.pickersCol}>
            <div className={styles.pickerWrapper}>
              <span className={styles.pickerLabel}>From</span>
              <ColorPicker
                key={`from-${pickerKey}`}
                initialColor={from}
                onChange={setFrom}
              />
            </div>
            <div className={styles.pickerWrapper}>
              <span className={styles.pickerLabel}>To</span>
              <ColorPicker
                key={`to-${pickerKey}`}
                initialColor={to}
                onChange={setTo}
              />
            </div>
          </div>

          {/* Direction */}
          <div className={styles.controls}>
            <label className={styles.control}>
              <span>Direction</span>
              <select value={dir} onChange={e => setDir(e.target.value)} className={styles.select}>
                {['0deg','45deg','90deg','135deg','180deg','225deg','270deg','315deg'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Output */}
          <div className={styles.output}>
            <p className={styles.outputLabel}>Your Gradient</p>
            <code className={styles.code}>{css}</code>
            <div className={styles.outputActions}>
              <button className={styles.btn} onClick={randomize} title="Randomize">
                <RefreshCw size={14} /> Randomize
              </button>
              <button className={styles.btn} onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
