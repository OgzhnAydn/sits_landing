import { useEffect, useRef } from 'react';
import { LAND_DOTS_B64 } from '@/lib/land-dots';

type P = { lat: number; lon: number };
const RAD = Math.PI / 180;
const HOME: P = { lat: 41.01, lon: 28.98 }; // İstanbul
const THREATS: P[] = [
  { lat: 52.37, lon: 4.9 }, { lat: 55.75, lon: 37.62 }, { lat: 25.2, lon: 55.27 }, { lat: 50.11, lon: 8.68 },
  { lat: 1.35, lon: 103.82 }, { lat: 40.71, lon: -74.0 }, { lat: 59.33, lon: 18.07 }, { lat: 30.04, lon: 31.24 },
  { lat: 41.72, lon: 44.79 }, { lat: 35.69, lon: 51.39 }, { lat: 48.86, lon: 2.35 }, { lat: 22.32, lon: 114.17 },
];

function decode(): Float32Array {
  const bin = atob(LAND_DOTS_B64);
  const n = bin.length / 4;
  const out = new Float32Array(n * 3);
  const view = new DataView(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) view.setUint8(i, bin.charCodeAt(i));
  for (let i = 0; i < n; i++) {
    const lat = (view.getInt16(i * 4, true) / 100) * RAD;
    const lon = (view.getInt16(i * 4 + 2, true) / 100) * RAD;
    out[i * 3] = Math.cos(lat) * Math.sin(lon);
    out[i * 3 + 1] = Math.sin(lat);
    out[i * 3 + 2] = Math.cos(lat) * Math.cos(lon);
  }
  return out;
}

const toVec = (p: P) => [Math.cos(p.lat * RAD) * Math.sin(p.lon * RAD), Math.sin(p.lat * RAD), Math.cos(p.lat * RAD) * Math.cos(p.lon * RAD)] as const;
const inTurkey = (x: number, y: number, z: number) => {
  const lat = Math.asin(y) / RAD, lon = Math.atan2(x, z) / RAD;
  return lat > 35.8 && lat < 42.2 && lon > 25.8 && lon < 44.9;
};

/** Orthographic dotted globe. Rotates continuously and slows to a dwell while Türkiye faces the viewer. */
export function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dots = decode();
    const n = dots.length / 3;
    const tr = new Uint8Array(n);
    for (let i = 0; i < n; i++) tr[i] = inTurkey(dots[i * 3]!, dots[i * 3 + 1]!, dots[i * 3 + 2]!) ? 1 : 0;
    const home = toVec(HOME);
    const threats = THREATS.map(toVec);

    const css = getComputedStyle(canvas);
    const col = (v: string, f: string) => css.getPropertyValue(v).trim() || f;
    const C = {
      dot: col('--globe-dot', '#1f3f8f'), hot: col('--globe-hot', '#0c6b8a'), danger: col('--danger', '#c0362c'),
      sphere: col('--globe-sphere', '#eef3fb'), rim: col('--globe-rim', 'rgba(31,63,143,.18)'), arc: col('--globe-arc', '#2f5bd3'),
    };

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lon0 = HOME.lon + 6, raf = 0, last = performance.now(), visible = true, t0 = last;
    const tilt = 24 * RAD; // shows Türkiye above the equator, slightly toward the viewer
    const ct = Math.cos(tilt), st = Math.sin(tilt);

    let dragging = false, dragX = 0, inertia = 0;
    const down = (e: PointerEvent) => { dragging = true; dragX = e.clientX; canvas.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - dragX; dragX = e.clientX; lon0 -= dx * 0.25; inertia = -dx * 0.25; };
    const up = () => { dragging = false; };
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);

    const project = (x: number, y: number, z: number, cl: number, sl: number) => {
      const x1 = x * cl - z * sl, z1 = x * sl + z * cl; // rotate around Y
      const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct; // tilt around X
      return [x1, y2, z2] as const;
    };

    const frame = (now: number) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      if (!reduce && !dragging) {
        const d = (((lon0 - HOME.lon - 6) % 360) + 540) % 360 - 180; // distance from Türkiye
        const speed = 1.2 + 11 * Math.pow( (1 - Math.cos(d * RAD)) / 2, 1.6);
        lon0 += speed * dt + inertia; inertia *= 0.92;
      }
      const R = Math.min(w, h * 2) * 0.5 * 0.98, cx = w / 2, cy = R + 2;
      const cl = Math.cos(lon0 * RAD), sl = Math.sin(lon0 * RAD);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // sphere body
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.45, R * 0.1, cx, cy, R);
      g.addColorStop(0, '#ffffff'); g.addColorStop(1, C.sphere);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = C.rim; ctx.stroke();

      // land dots in depth buckets
      const s = Math.max(0.9, R / 380);
      const buckets: number[][] = [[], [], [], []];
      const hot: number[] = [];
      for (let i = 0; i < n; i++) {
        const [x, y, z] = project(dots[i * 3]!, dots[i * 3 + 1]!, dots[i * 3 + 2]!, cl, sl);
        if (z <= 0.02) continue;
        const px = cx + x * R, py = cy - y * R;
        if (py > h + 4) continue;
        if (tr[i]) { hot.push(px, py); continue; }
        buckets[Math.min(3, Math.floor(z * 4))]!.push(px, py);
      }
      ctx.fillStyle = C.dot;
      buckets.forEach((b, k) => {
        ctx.globalAlpha = 0.22 + k * 0.2;
        const r = s * (0.9 + k * 0.22);
        ctx.beginPath();
        for (let j = 0; j < b.length; j += 2) { ctx.moveTo(b[j]! + r, b[j + 1]!); ctx.arc(b[j]!, b[j + 1]!, r, 0, Math.PI * 2); }
        ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.fillStyle = C.hot;
      ctx.beginPath();
      for (let j = 0; j < hot.length; j += 2) { const r = s * 1.7; ctx.moveTo(hot[j]! + r, hot[j + 1]!); ctx.arc(hot[j]!, hot[j + 1]!, r, 0, Math.PI * 2); }
      ctx.fill();

      // arcs threat -> İstanbul
      const time = (now - t0) / 1000;
      const [hx, hy, hz] = home;
      threats.forEach((tv, k) => {
        const dot = tv[0] * hx + tv[1] * hy + tv[2] * hz;
        const om = Math.acos(Math.max(-1, Math.min(1, dot)));
        const so = Math.sin(om) || 1;
        const phase = ((time * 0.22 + k * 0.37) % 1.6);
        ctx.lineWidth = 1.2;
        let prev: [number, number] | null = null;
        const steps = 48;
        for (let q = 0; q <= steps; q++) {
          const t = q / steps;
          const a = Math.sin((1 - t) * om) / so, b = Math.sin(t * om) / so;
          const lift = 1 + Math.sin(t * Math.PI) * 0.12 * Math.min(1, om * 1.4);
          const [x, y, z] = project((tv[0] * a + hx * b) * lift, (tv[1] * a + hy * b) * lift, (tv[2] * a + hz * b) * lift, cl, sl);
          const visibleP = z > 0 || x * x + y * y > 1;
          const p: [number, number] = [cx + x * R, cy - y * R];
          if (prev && visibleP) {
            const head = Math.max(0, 1 - Math.abs(t - phase) * 3.2);
            ctx.globalAlpha = 0.12 + head * 0.8;
            ctx.strokeStyle = head > 0.05 ? C.danger : C.arc;
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
          }
          prev = visibleP ? p : null;
        }
        // origin pin
        const [ox, oy, oz] = project(tv[0], tv[1], tv[2], cl, sl);
        if (oz > 0) {
          const px = cx + ox * R, py = cy - oy * R, pr = ((time * 0.6 + k * 0.23) % 1);
          ctx.globalAlpha = 1 - pr; ctx.strokeStyle = C.danger; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(px, py, 3 + pr * 14 * s, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1; ctx.fillStyle = C.danger; ctx.beginPath(); ctx.arc(px, py, 2.6 * s, 0, Math.PI * 2); ctx.fill();
        }
      });

      // İstanbul home marker
      const [ix, iy, iz] = project(hx, hy, hz, cl, sl);
      if (iz > 0) {
        const px = cx + ix * R, py = cy - iy * R, pr = (time * 0.45) % 1;
        ctx.globalAlpha = 0.9 - pr * 0.9; ctx.strokeStyle = C.hot; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(px, py, 6 + pr * 34 * s, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(px, py, 6 * s, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.hot; ctx.beginPath(); ctx.arc(px, py, 3.6 * s, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = !!e?.isIntersecting;
      if (visible && !was && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); };
  }, []);

  return <canvas ref={ref} className={className} role="img" aria-label="Türkiye merkezli, dönen noktalı dünya küresi; dünyanın farklı noktalarından İstanbul'a yönelen tehdit izleri" />;
}
