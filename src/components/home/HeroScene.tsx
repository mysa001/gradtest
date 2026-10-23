import { useEffect, useRef } from "react";
import { Link } from "react-router";
import "./HeroScene.css";

type Vec3 = readonly [number, number, number];

interface Segment {
  a: Vec3;
  b: Vec3;
  tone: 0 | 1 | 2;
}

const TONES = [
  "rgba(150, 173, 165, 0.16)",
  "rgba(150, 173, 165, 0.42)",
  "rgba(20, 184, 166, 0.92)",
] as const;

function buildScene(): Segment[] {
  const segments: Segment[] = [];

  const line = (a: Vec3, b: Vec3, tone: 0 | 1 | 2 = 1) => {
    segments.push({ a, b, tone });
  };

  const extent = 4;
  for (let i = -extent; i <= extent; i += 1) {
    line([i, 0, -extent], [i, 0, extent], i === 0 ? 1 : 0);
    line([-extent, 0, i], [extent, 0, i], i === 0 ? 1 : 0);
  }

  const post = 3.1;
  const corner = 3.25;
  const corners: ReadonlyArray<readonly [number, number]> = [
    [-corner, -corner],
    [corner, -corner],
    [corner, corner],
    [-corner, corner],
  ];

  for (const [x, z] of corners) {
    line([x, 0, z], [x, post, z], 2);
    line([x, post, z], [x * 0.7, post, z * 0.7], 0);
  }

  line([-corner, post, -corner], [corner, post, -corner], 1);
  line([corner, post, -corner], [corner, post, corner], 1);
  line([corner, post, corner], [-corner, post, corner], 1);
  line([-corner, post, corner], [-corner, post, -corner], 1);

  line([-corner, 0.2, -corner], [corner, post - 0.25, -corner], 0);
  line([corner, 0.2, -corner], [-corner, post - 0.25, -corner], 0);
  line([-corner, 0.2, corner], [corner, post - 0.25, corner], 0);

  const ring = (y: number, radius: number, tone: 0 | 1 | 2) => {
    const steps = 28;
    for (let i = 0; i < steps; i += 1) {
      const a0 = (i / steps) * Math.PI * 2;
      const a1 = ((i + 1) / steps) * Math.PI * 2;
      line(
        [Math.cos(a0) * radius, y, Math.sin(a0) * radius],
        [Math.cos(a1) * radius, y, Math.sin(a1) * radius],
        tone,
      );
    }
  };

  ring(0.01, 1.2, 2);
  ring(0.7, 1.2, 1);

  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const x = Math.cos(angle) * 1.2;
    const z = Math.sin(angle) * 1.2;
    line([x, 0, z], [x, 0.7, z], 1);
  }

  const box = (cx: number, cy: number, cz: number, size: number, tone: 0 | 1 | 2) => {
    const h = size / 2;
    const p: Vec3[] = [
      [cx - h, cy - h, cz - h],
      [cx + h, cy - h, cz - h],
      [cx + h, cy - h, cz + h],
      [cx - h, cy - h, cz + h],
      [cx - h, cy + h, cz - h],
      [cx + h, cy + h, cz - h],
      [cx + h, cy + h, cz + h],
      [cx - h, cy + h, cz + h],
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    for (const [i, j] of edges) {
      line(p[i], p[j], tone);
    }
  };

  box(0, 2.25, 0, 0.5, 2);
  line([0, 2.0, 0], [0, 0.7, 0], 0);

  return segments;
}

const scene = buildScene();

function rotate(point: Vec3, yaw: number, pitch: number): Vec3 {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  const x = point[0] * cy - point[2] * sy;
  const z = point[0] * sy + point[2] * cy;
  const y = point[1] * cp - z * sp;
  const z2 = point[1] * sp + z * cp;

  return [x, y, z2];
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yawRef = useRef<HTMLSpanElement>(null);
  const pitchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let yaw = 0.7;
    let pitch = -0.4;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let active = true;
    let frame = 0;
    let lastReadout = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      const scale = Math.min(width, height) * 1.42;
      const originX = width / 2;
      const originY = height / 2;
      const depth = 9.6;
      const horizon = 1.35;

      const project = (point: Vec3) => {
        const rotated = rotate(point, yaw, pitch);
        const factor = scale / (depth + rotated[2]);
        return [
          originX + rotated[0] * factor,
          originY - (rotated[1] - horizon) * factor,
        ] as const;
      };

      context.lineWidth = 1;

      for (const segment of scene) {
        const [x1, y1] = project(segment.a);
        const [x2, y2] = project(segment.b);
        context.strokeStyle = TONES[segment.tone];
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }

      const scanY = reduceMotion ? 1.1 : 1.1 + Math.sin(time / 2600) * 0.75;
      const scanRadius = 1.2;
      const steps = 28;
      context.strokeStyle = "rgba(20, 184, 166, 0.55)";
      context.beginPath();
      for (let i = 0; i <= steps; i += 1) {
        const angle = (i / steps) * Math.PI * 2;
        const point: Vec3 = [
          Math.cos(angle) * scanRadius,
          scanY,
          Math.sin(angle) * scanRadius,
        ];
        const [x, y] = project(point);
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();

      const now = performance.now();
      if (now - lastReadout > 120) {
        lastReadout = now;
        if (yawRef.current) {
          const degrees = Math.round(((yaw * 180) / Math.PI) % 360);
          yawRef.current.textContent = `YAW ${String(degrees).padStart(3, "0")}°`;
        }
        if (pitchRef.current) {
          pitchRef.current.textContent = `PITCH ${Math.round(
            (-pitch * 180) / Math.PI,
          )}°`;
        }
      }
    };

    const tick = (time: number) => {
      if (!active) return;
      if (!reduceMotion) targetYaw += 0.0021;
      yaw += (targetYaw - yaw) * 0.075;
      pitch += (targetPitch - pitch) * 0.075;
      draw(time);
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      targetYaw += dx * 0.006;
      targetPitch = Math.min(
        -0.06,
        Math.max(-0.95, targetPitch + dy * 0.004),
      );
      if (reduceMotion) {
        yaw = targetYaw;
        pitch = targetPitch;
        draw(performance.now());
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      canvas.classList.remove("is-dragging");
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          active = entry.isIntersecting && !document.hidden;
        }
        if (active && !reduceMotion) {
          window.cancelAnimationFrame(frame);
          frame = window.requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      active = !document.hidden;
      if (active && !reduceMotion) frame = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (!reduceMotion) frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <figure className="hero-scene">
      <div className="hero-scene__bar">
        <span className="hero-scene__code">Scene 01</span>
        <span className="hero-scene__name">Confined space — entry bay</span>
        <span className="hero-scene__state">
          <i aria-hidden="true" />
          web preview
        </span>
      </div>

      <div className="hero-scene__stage">
        <canvas
          ref={canvasRef}
          className="hero-scene__canvas"
          role="img"
          aria-label="Wireframe view of a confined space entry bay with a floor grid, four corner posts, and a scanner ring. Drag to orbit."
        />
        <span className="hero-scene__corner hero-scene__corner--tl" aria-hidden="true" />
        <span className="hero-scene__corner hero-scene__corner--tr" aria-hidden="true" />
        <span className="hero-scene__corner hero-scene__corner--bl" aria-hidden="true" />
        <span className="hero-scene__corner hero-scene__corner--br" aria-hidden="true" />

        <span className="hero-scene__hint" aria-hidden="true">
          Drag to orbit
        </span>

        <div className="hero-scene__readout" aria-hidden="true">
          <span ref={yawRef}>YAW 000°</span>
          <span ref={pitchRef}>PITCH 000°</span>
        </div>
      </div>

      <figcaption className="hero-scene__foot">
        <span>Wireframe preview — not the simulation</span>
        <Link to="/catalog" className="hero-scene__link">
          Open catalog
          <span aria-hidden="true">→</span>
        </Link>
      </figcaption>
    </figure>
  );
}
