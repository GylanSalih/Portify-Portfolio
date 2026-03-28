import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Colorpicker.module.scss';

const PRESETS = [
  '#FF6B6B','#FF9F43','#FECA57','#48DBFB','#1DD1A1',
  '#A29BFE','#FD79A8','#E17055','#00CEC9','#6C5CE7',
  '#0984E3','#FFFFFF','#B2BEC3','#636E72','#2D3436','#000000',
];

/* ── color math helpers ── */
function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    if (max === r)      h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return [h, s, v];
}

function hexToRgba(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length === 6) hex += 'ff';
  const n = parseInt(hex, 16);
  return [(n >> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, (n & 255) / 255];
}

function rgbToHex(r, g, b, a = 1) {
  const ah = Math.round(a * 255).toString(16).padStart(2, '0');
  const hex = [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  return '#' + hex + (ah === 'ff' ? '' : ah);
}

/* ── canvas draw helpers ── */
function drawGradient(canvas, hue) {
  if (!canvas) return;
  const { width: w, height: h } = canvas;
  const ctx = canvas.getContext('2d');
  const gH = ctx.createLinearGradient(0, 0, w, 0);
  gH.addColorStop(0, '#fff');
  gH.addColorStop(1, `hsl(${hue}deg, 100%, 50%)`);
  ctx.fillStyle = gH;
  ctx.fillRect(0, 0, w, h);
  const gV = ctx.createLinearGradient(0, 0, 0, h);
  gV.addColorStop(0, 'rgba(0,0,0,0)');
  gV.addColorStop(1, '#000');
  ctx.fillStyle = gV;
  ctx.fillRect(0, 0, w, h);
}

function drawHue(canvas) {
  if (!canvas) return;
  const { width: w, height: h } = canvas;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, w, 0);
  for (let i = 0; i <= 360; i += 10) g.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawAlpha(canvas, r, g, b) {
  if (!canvas) return;
  const { width: w, height: h } = canvas;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const g2 = ctx.createLinearGradient(0, 0, w, 0);
  g2.addColorStop(0, `rgba(${r},${g},${b},0)`);
  g2.addColorStop(1, `rgba(${r},${g},${b},1)`);
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

/* ── component ── */
export default function ColorPicker({ initialColor = '#A7A7ED', onChange }) {
  const [hsv, setHsv] = useState(() => {
    const [r, g, b] = hexToRgba(initialColor);
    return rgbToHsv(r, g, b);
  });
  const [alpha, setAlpha] = useState(1);
  const [copied, setCopied] = useState(false);
  const [hexVal, setHexVal] = useState(initialColor.toUpperCase());

  const gradRef  = useRef(null);
  const gradCRef = useRef(null);
  const hueRef   = useRef(null);
  const hueCRef  = useRef(null);
  const alphaTRef = useRef(null);
  const alphaCRef = useRef(null);

  const dragging = useRef(null);

  const [hue, sat, val] = hsv;
  const [r, g, b] = hsvToRgb(hue, sat, val);

  /* sync hex + onChange */
  useEffect(() => {
    const hex = rgbToHex(r, g, b, alpha).toUpperCase();
    setHexVal(hex);
    onChange?.(hex);
  }, [hue, sat, val, alpha]);

  /* draw canvases */
  useEffect(() => {
    if (!gradRef.current) return;
    const el = gradRef.current;
    gradCRef.current.width  = el.clientWidth;
    gradCRef.current.height = el.clientHeight;
    drawGradient(gradCRef.current, hue);
  }, [hue]);

  useEffect(() => {
    if (!hueRef.current || !hueCRef.current) return;
    hueCRef.current.width  = hueRef.current.clientWidth;
    hueCRef.current.height = hueRef.current.clientHeight;
    drawHue(hueCRef.current);
  }, []);

  useEffect(() => {
    if (!alphaTRef.current || !alphaCRef.current) return;
    alphaCRef.current.width  = alphaTRef.current.clientWidth;
    alphaCRef.current.height = alphaTRef.current.clientHeight;
    drawAlpha(alphaCRef.current, r, g, b);
  }, [r, g, b]);

  /* pointer helpers */
  const getXY = e => {
    const src = e.touches ? e.touches[0] : e;
    return { clientX: src.clientX, clientY: src.clientY };
  };

  const onGradMove = useCallback((e) => {
    if (!gradRef.current) return;
    const rect = gradRef.current.getBoundingClientRect();
    const { clientX, clientY } = getXY(e);
    const newSat = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newVal = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    setHsv([hue, newSat, newVal]);
  }, [hue]);

  const onHueMove = useCallback((e) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const { clientX } = getXY(e);
    const newHue = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360));
    setHsv(prev => [newHue, prev[1], prev[2]]);
  }, []);

  const onAlphaMove = useCallback((e) => {
    if (!alphaTRef.current) return;
    const rect = alphaTRef.current.getBoundingClientRect();
    const { clientX } = getXY(e);
    setAlpha(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current === 'grad')  onGradMove(e);
      if (dragging.current === 'hue')   onHueMove(e);
      if (dragging.current === 'alpha') onAlphaMove(e);
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [onGradMove, onHueMove, onAlphaMove]);

  /* hex input handler */
  const handleHexInput = (e) => {
    const v = e.target.value;
    setHexVal(v);
    if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)) {
      const [pr, pg, pb, pa] = hexToRgba(v);
      setHsv(rgbToHsv(pr, pg, pb));
      setAlpha(pa);
    }
  };

  /* rgb input handlers */
  const handleRgb = (channel, v) => {
    const clamped = Math.max(0, Math.min(255, Number(v) || 0));
    const current = hsvToRgb(hue, sat, val);
    current[channel] = clamped;
    setHsv(rgbToHsv(...current));
  };

  /* copy */
  const handleCopy = () => {
    navigator.clipboard.writeText(hexVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  /* preset click */
  const applyPreset = (hex) => {
    const [pr, pg, pb, pa] = hexToRgba(hex);
    setHsv(rgbToHsv(pr, pg, pb));
    setAlpha(pa);
  };

  /* derived positions */
  const gradW = gradRef.current?.clientWidth  || 260;
  const gradH = gradRef.current?.clientHeight || 220;
  const hueW  = hueRef.current?.clientWidth   || 260;
  const alpW  = alphaTRef.current?.clientWidth || 260;

  const swatchColor = `rgba(${r},${g},${b},${alpha})`;

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>

        {/* hex row */}
        <div className={styles.hexRow}>
          <div className={styles.swatch} style={{ background: swatchColor }} />
          <input
            className={styles.hexInput}
            value={hexVal}
            onChange={handleHexInput}
            maxLength={9}
            spellCheck={false}
          />
          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* gradient box */}
        <div
          ref={gradRef}
          className={styles.gradBox}
          onMouseDown={(e) => { dragging.current = 'grad'; onGradMove(e); }}
          onTouchStart={(e) => { dragging.current = 'grad'; onGradMove(e); e.preventDefault(); }}
        >
          <canvas ref={gradCRef} className={styles.gradCanvas} />
          <div
            className={styles.gradCursor}
            style={{
              left: sat * gradW,
              top: (1 - val) * gradH,
              background: `rgb(${r},${g},${b})`,
            }}
          />
        </div>

        {/* hue slider */}
        <div
          ref={hueRef}
          className={styles.hueTrack}
          onMouseDown={(e) => { dragging.current = 'hue'; onHueMove(e); }}
          onTouchStart={(e) => { dragging.current = 'hue'; onHueMove(e); e.preventDefault(); }}
        >
          <canvas ref={hueCRef} className={styles.hueCanvas} />
          <div
            className={styles.hueThumb}
            style={{ left: (hue / 360) * hueW, background: `hsl(${hue},100%,50%)` }}
          />
        </div>

        {/* alpha slider */}
        <div
          ref={alphaTRef}
          className={styles.alphaTrack}
          onMouseDown={(e) => { dragging.current = 'alpha'; onAlphaMove(e); }}
          onTouchStart={(e) => { dragging.current = 'alpha'; onAlphaMove(e); e.preventDefault(); }}
        >
          <div className={styles.alphaBg} />
          <div className={styles.alphaCanvasWrap}>
            <canvas ref={alphaCRef} />
          </div>
          <div
            className={styles.alphaThumb}
            style={{ left: alpha * alpW, background: swatchColor }}
          />
        </div>

        {/* rgba inputs */}
        <div className={styles.values}>
          {[['R', r, 0], ['G', g, 1], ['B', b, 2]].map(([label, val, ch]) => (
            <div key={label} className={styles.valGroup}>
              <span className={styles.valLabel}>{label}</span>
              <input
                className={styles.valInput}
                type="number"
                min={0}
                max={255}
                value={val}
                onChange={(e) => handleRgb(ch, e.target.value)}
              />
            </div>
          ))}
          <div className={styles.valGroup}>
            <span className={styles.valLabel}>A%</span>
            <input
              className={styles.valInput}
              type="number"
              min={0}
              max={100}
              value={Math.round(alpha * 100)}
              onChange={(e) => setAlpha(Math.max(0, Math.min(100, Number(e.target.value) || 0)) / 100)}
            />
          </div>
        </div>

        {/* presets */}
        <div className={styles.presets}>
          {PRESETS.map((hex) => (
            <button
              key={hex}
              className={styles.preset}
              style={{ background: hex }}
              title={hex}
              onClick={() => applyPreset(hex)}
              aria-label={`Pick ${hex}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}