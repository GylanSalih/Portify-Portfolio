'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './GradientGenerator.module.scss';
import { Copy, Check, RefreshCw, Plus, X } from 'lucide-react';
import ColorPicker from '../../../tools/gradient-generator/Colorpicker/Colorpicker';

const PRESETS = [
  { name: 'Crimson Night', stops: [{ color: '#c0392b', pos: 0 }, { color: '#0a0a0a', pos: 100 }], angle: 135 },
  { name: 'Royal Blue', stops: [{ color: '#1a1aff', pos: 0 }, { color: '#00b4d8', pos: 100 }], angle: 135 },
  { name: 'Vermillion', stops: [{ color: '#e63946', pos: 0 }, { color: '#f4a261', pos: 55 }, { color: '#264653', pos: 100 }], angle: 135 },
  { name: 'Ocean', stops: [{ color: '#3b82f6', pos: 0 }, { color: '#06b6d4', pos: 100 }], angle: 135 },
  { name: 'Dusk', stops: [{ color: '#8b5cf6', pos: 0 }, { color: '#6366f1', pos: 100 }], angle: 135 },
  { name: 'Sunset', stops: [{ color: '#f97316', pos: 0 }, { color: '#ec4899', pos: 100 }], angle: 45 },
];

let _nextId = 3;
const makeId = () => _nextId++;

/* ── Rotary angle dial ── */
function AngleDial({ angle, onChange }) {
  const svgRef = useRef(null);
  const dragging = useRef(false);
  const cx = 50, cy = 50, r = 36;
  const rad = ((angle - 90) * Math.PI) / 180;
  const hx = cx + r * Math.cos(rad);
  const hy = cy + r * Math.sin(rad);

  const getAngle = useCallback((e) => {
    if (!svgRef.current) return angle;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 - cx;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - cy;
    return Math.round(((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360);
  }, [angle, cx, cy]);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) onChange(getAngle(e)); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [getAngle, onChange]);

  return (
    <div className={styles.angleDial}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className={styles.angleDialSvg}
        onMouseDown={(e) => { dragging.current = true; onChange(getAngle(e)); }}
      >
        <circle cx={cx} cy={cy} r={r} className={styles.dialTrack} />
        <line x1={cx} y1={cy} x2={hx} y2={hy} className={styles.dialLine} />
        <circle cx={hx} cy={hy} r={5.5} className={styles.dialHandle} />
        <circle cx={cx} cy={cy} r={3} className={styles.dialCenter} />
      </svg>
      <div className={styles.angleValue}>{Math.round(angle)}°</div>
    </div>
  );
}

export default function GradientGenerator() {
  const [stops, setStops] = useState([
    { id: 1, color: '#3b82f6', pos: 0 },
    { id: 2, color: '#8b5cf6', pos: 100 },
  ]);
  const [angle, setAngle] = useState(135);
  const [easing, setEasing] = useState('linear');
  const [activeStopId, setActiveStopId] = useState(null);
  const [copied, setCopied] = useState(false);
  const stopRowRefs = useRef({});

  const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);

  const buildGradient = useCallback(() => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    let cssStops;
    if (easing === 'ease') {
      cssStops = sorted.flatMap((s, i) => {
        if (i === sorted.length - 1) return [`${s.color} ${s.pos}%`];
        const next = sorted[i + 1];
        const mid = (s.pos + next.pos) / 2;
        return [`${s.color} ${s.pos}%`, `${s.color} ${mid - 7}%`, `${next.color} ${mid + 7}%`];
      });
    } else {
      cssStops = sorted.map(s => `${s.color} ${s.pos}%`);
    }
    return `linear-gradient(${angle}deg, ${cssStops.join(', ')})`;
  }, [stops, angle, easing]);

  const gradient = buildGradient();
  const css = `background: ${gradient};`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [css]);

  const randomize = () => {
    const rand = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const count = Math.floor(Math.random() * 3) + 2;
    setStops(Array.from({ length: count }, (_, i) => ({
      id: makeId(), color: rand(), pos: Math.round((i / (count - 1)) * 100),
    })));
    setAngle(Math.round(Math.random() * 360));
    setActiveStopId(null);
  };

  const applyPreset = (p) => {
    setStops(p.stops.map(s => ({ id: makeId(), color: s.color, pos: s.pos })));
    setAngle(p.angle);
    setActiveStopId(null);
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    let maxGap = 0, insertPos = 50;
    for (let i = 0; i < sorted.length - 1; i++) {
      const gap = sorted[i + 1].pos - sorted[i].pos;
      if (gap > maxGap) { maxGap = gap; insertPos = (sorted[i].pos + sorted[i + 1].pos) / 2; }
    }
    setStops(prev => [...prev, { id: makeId(), color: '#ffffff', pos: Math.round(insertPos) }]);
  };

  const removeStop = (id) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
    if (activeStopId === id) setActiveStopId(null);
  };

  // Close picker on outside click
  useEffect(() => {
    if (!activeStopId) return;
    const handleClick = (e) => {
      const el = stopRowRefs.current[activeStopId];
      if (el && !el.contains(e.target)) setActiveStopId(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeStopId]);

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Gradient Generator</h1>
      <p className={styles.desc}>Build beautiful multi-stop CSS gradients visually.</p>

      <div className={styles.generatorLayout}>
        {/* Left: Large preview + presets */}
        <div className={styles.generatorLeft}>
          <div className={styles.preview} style={{ background: gradient }} />
          <div className={styles.presets}>
            <p className={styles.presetsLabel}>Presets</p>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button
                  key={p.name}
                  className={styles.presetBtn}
                  style={{ background: `linear-gradient(${p.angle}deg, ${p.stops.map(s => s.color).join(', ')})` }}
                  onClick={() => applyPreset(p)}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className={styles.generatorRight}>

          {/* Color stops section */}
          <div className={styles.stopsSection}>
            <div className={styles.stopsHeader}>
              <span className={styles.sectionLabel}>Color Stops</span>
              {stops.length < 5 && (
                <button className={styles.addStopBtn} onClick={addStop} title="Add color stop">
                  <Plus size={12} />
                </button>
              )}
            </div>

            {/* Gradient bar with position markers */}
            <div className={styles.gradientBar} style={{ background: gradient }}>
              {sortedStops.map(stop => (
                <button
                  key={stop.id}
                  className={`${styles.stopMarker} ${activeStopId === stop.id ? styles.stopMarkerActive : ''}`}
                  style={{ left: `${stop.pos}%`, background: stop.color }}
                  onClick={() => setActiveStopId(activeStopId === stop.id ? null : stop.id)}
                />
              ))}
            </div>

            {/* Stop list rows */}
            <div className={styles.stopsList}>
              {sortedStops.map(stop => (
                <div
                  key={stop.id}
                  className={styles.stopRow}
                  ref={el => { stopRowRefs.current[stop.id] = el; }}
                >
                  <button
                    className={styles.stopSwatch}
                    style={{ background: stop.color }}
                    onClick={() => setActiveStopId(activeStopId === stop.id ? null : stop.id)}
                  />
                  <span className={styles.stopColorValue}>{stop.color.slice(0,7).toUpperCase()}</span>
                  <div className={styles.stopPosWrapper}>
                    <input
                      type="range" min={0} max={100} value={stop.pos}
                      onChange={e => setStops(prev => prev.map(s => s.id === stop.id ? { ...s, pos: Number(e.target.value) } : s))}
                      className={styles.stopPosSlider}
                    />
                    <span className={styles.stopPosValue}>{stop.pos}%</span>
                  </div>
                  {stops.length > 2 && (
                    <button className={styles.removeStopBtn} onClick={() => removeStop(stop.id)} title="Remove">
                      <X size={11} />
                    </button>
                  )}

                  {/* Inline color picker popover */}
                  {activeStopId === stop.id && (
                    <div className={styles.stopPickerPopover}>
                      <ColorPicker
                        key={`picker-${stop.id}`}
                        initialColor={stop.color}
                        onChange={color => setStops(prev => prev.map(s => s.id === stop.id ? { ...s, color } : s))}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Angle + Easing row */}
          <div className={styles.angleEasingRow}>
            <div className={styles.angleSection}>
              <span className={styles.sectionLabel}>Angle</span>
              <AngleDial angle={angle} onChange={setAngle} />
            </div>
            <div className={styles.easingSection}>
              <span className={styles.sectionLabel}>Easing</span>
              <div className={styles.easingBtns}>
                {['linear', 'ease'].map(mode => (
                  <button
                    key={mode}
                    className={`${styles.easingBtn} ${easing === mode ? styles.easingBtnActive : ''}`}
                    onClick={() => setEasing(mode)}
                  >
                    {mode === 'linear' ? 'Linear' : 'S-Curve'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className={styles.output}>
            <p className={styles.outputLabel}>CSS Output</p>
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
