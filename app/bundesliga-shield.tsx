"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** Original interpretation of the Meisterschale, not an official replica. */
export default function BundesligaShield() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controls = useRef({ angle: -0.22, zoom: 5.3, rotating: false });
  const [paused, setPaused] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.touchAction = "pan-y";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    const environmentMaker = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = environmentMaker.fromScene(room);
    scene.environment = environment.texture;
    room.dispose();
    environmentMaker.dispose();
    scene.add(new THREE.HemisphereLight(0xdce7ff, 0x22110a, 2));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(2.5, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x92b9ff, 4);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const silver = new THREE.MeshStandardMaterial({ color: 0xcbd2dc, metalness: 0.95, roughness: 0.2 });
    const polished = new THREE.MeshStandardMaterial({ color: 0xf0f4f8, metalness: 0.98, roughness: 0.13 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x485260, metalness: 0.85, roughness: 0.32 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xc4a35d, metalness: 0.88, roughness: 0.25 });
    const shield = new THREE.Group();
    shield.rotation.x = -0.13;
    scene.add(shield);
    const add = (geometry: THREE.BufferGeometry, material: THREE.Material, z: number, x = 0, y = 0) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      shield.add(mesh);
      return mesh;
    };
    // A shallow circular relief with concentric engraved bands and decorative studs.
    add(new THREE.CylinderGeometry(1.56, 1.56, 0.13, 96), dark, 0).rotation.x = Math.PI / 2;
    add(new THREE.CylinderGeometry(1.5, 1.5, 0.035, 96), silver, 0.085).rotation.x = Math.PI / 2;
    for (const [radius, tube, material] of [
      [1.43, 0.038, polished], [1.22, 0.025, dark],
      [1.05, 0.026, polished], [0.74, 0.02, dark],
      [0.55, 0.035, polished]
    ] as const) {
      add(new THREE.TorusGeometry(radius, tube, 12, 112), material, 0.12);
    }
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      add(new THREE.SphereGeometry(0.052, 12, 10), i % 3 === 0 ? gold : polished, 0.14, Math.cos(a) * 1.32, Math.sin(a) * 1.32);
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const bar = add(new THREE.BoxGeometry(0.12, 0.27, 0.045), polished, 0.14, Math.cos(a) * 0.9, Math.sin(a) * 0.9);
      bar.rotation.z = a - Math.PI / 2;
    }
    add(new THREE.IcosahedronGeometry(0.4, 2), polished, 0.19);
    const pedestal = new THREE.Group();
    scene.add(pedestal);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.28, 0.2, 72), dark);
    base.position.y = -1.86;
    pedestal.add(base);

    let pointer: number | null = null;
    let previousX = 0;
    const down = (e: PointerEvent) => {
      pointer = e.pointerId;
      previousX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (pointer !== e.pointerId) return;
      controls.current.angle += (e.clientX - previousX) * 0.008;
      previousX = e.clientX;
      draw();
    };
    const up = (e: PointerEvent) => {
      if (pointer === e.pointerId) pointer = null;
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    const draw = () => {
      shield.rotation.y = controls.current.angle;
      camera.position.set(0, 0.05, controls.current.zoom);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    const resize = () => {
      const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    let visible = true;
    let frame = 0;
    const animate = () => {
      frame = 0;
      if (!visible || document.hidden || !controls.current.rotating || reduced) return;
      controls.current.angle += 0.005;
      draw();
      frame = requestAnimationFrame(animate);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (frame) cancelAnimationFrame(frame);
      if (visible) animate();
    });
    visibility.observe(host);
    const onVisibility = () => {
      if (frame) cancelAnimationFrame(frame);
      if (!document.hidden) animate();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const onLost = (e: Event) => { e.preventDefault(); setFailed(true); };
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    controls.current.rotating = !reduced;
    setPaused(reduced);
    resize();
    if (!reduced) animate();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      [silver, polished, dark, gold].forEach(m => m.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const rotate = (delta: number) => {
    controls.current.angle += delta;
    // Rotation redraws on next scheduled frame, or by a scoped custom event.
    hostRef.current?.dispatchEvent(new Event("resize"));
    setTick(v => v + 1);
  };
  const [tick, setTick] = useState(0);
  useEffect(() => {
    // Trigger an explicit render for button controls even while auto rotation is paused.
    const canvas = hostRef.current?.querySelector("canvas");
    if (canvas) canvas.dispatchEvent(new Event("pointermove"));
  }, [tick]);
  return (
    <div className="bundesliga-exhibit">
      <div className="bundesliga-exhibit-copy">
        <span className="kicker">2025 / THE WAIT IS OVER</span>
        <h3>THE FIRST <em>TEAM TROPHY.</em></h3>
        <p>After years of near misses, Kane became a Bundesliga champion with Bayern Munich in 2025.</p>
        <p className="fine-print">Original interactive silver-shield interpretation. Not an official Meisterschale replica.</p>
      </div>
      <div className="bundesliga-exhibit-stage">
        {failed ? (
          <div className="bundesliga-static" role="img" aria-label="Illustrated silver championship shield">◉<span>THE 2025 TITLE</span></div>
        ) : (
          <div ref={hostRef} className="bundesliga-canvas" role="img" aria-label="Rotatable artistic interpretation of a silver football championship shield" />
        )}
        {!failed && <div className="bundesliga-controls">
          <button type="button" onClick={() => rotate(-0.35)} aria-label="Rotate shield left">←</button>
          <button type="button" onClick={() => rotate(0.35)} aria-label="Rotate shield right">→</button>
          <button type="button" onClick={() => { controls.current.zoom = Math.max(3.8, controls.current.zoom - 0.35); setTick(v => v + 1); }} aria-label="Zoom in">+</button>
          <button type="button" onClick={() => { controls.current.zoom = Math.min(7, controls.current.zoom + 0.35); setTick(v => v + 1); }} aria-label="Zoom out">−</button>
          <button type="button" onClick={() => { controls.current.rotating = paused; setPaused(!paused); }}>{paused ? "Auto rotate" : "Pause rotation"}</button>
        </div>}
      </div>
    </div>
  );
}
