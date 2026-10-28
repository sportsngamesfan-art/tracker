"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function TrophyScene() {
  const mount = useRef<HTMLDivElement>(null);
  const control = useRef({ spin: true, angle: 0, type: "ball" });
  const [spin, setSpin] = useState(true);
  const [type, setType] = useState("ball");
  const [error, setError] = useState(false);
  useEffect(() => {
    const host = mount.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setError(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.7, 6.2);
    camera.lookAt(0, 0.3, 0);
    const gold = new THREE.MeshStandardMaterial({
      color: "#e9b953",
      metalness: 0.83,
      roughness: 0.24,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: "#151619",
      metalness: 0.6,
      roughness: 0.3,
    });
    const silver = new THREE.MeshStandardMaterial({
      color: "#c7d4e6",
      metalness: 0.85,
      roughness: 0.2,
    });
    scene.add(new THREE.HemisphereLight("#e3ecff", "#55330e", 2.4));
    const light = (color: string, intensity: number, position: number[]) => {
      const l = new THREE.DirectionalLight(color, intensity);
      l.position.set(position[0], position[1], position[2]);
      scene.add(l);
      return l;
    };
    light("#fff1cd", 5, [3, 4, 4]);
    light("#adbeff", 3, [-4, 2, 1]);
    light("#ffba3f", 5, [0, 1, -3]);
    const key = light("#fff3d0", 2, [2, 5, 3]);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const stadium = new THREE.Group();
    scene.add(stadium);
    const standMaterial = new THREE.MeshStandardMaterial({
      color: "#192735",
      metalness: 0.45,
      roughness: 0.6,
    });
    for (let level = 0; level < 4; level++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.1 + level * 0.3, 0.1, 8, 80),
        standMaterial,
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, -1.5 + level * 0.24, -0.6);
      stadium.add(ring);
    }
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(5, 64),
      new THREE.MeshStandardMaterial({ color: "#101c19", roughness: 0.8 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.49;
    floor.receiveShadow = true;
    scene.add(floor);
    for (const x of [-2.5, 2.5]) {
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 2.8, 8),
        dark,
      );
      mast.position.set(x, -0.1, -2);
      scene.add(mast);
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.18, 0.08),
        new THREE.MeshBasicMaterial({ color: "#e7e6d7" }),
      );
      panel.position.set(x, 1.3, -2);
      scene.add(panel);
    }
    const root = new THREE.Group();
    scene.add(root);
    const ball = new THREE.Group();
    const cup = new THREE.Group();
    root.add(ball, cup);
    const add = (
      parent: THREE.Group,
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      y: number,
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = y;
      parent.add(mesh);
      return mesh;
    };
    for (const group of [ball, cup]) {
      add(group, new THREE.CylinderGeometry(0.85, 0.95, 0.24, 64), dark, -1.35);
      add(group, new THREE.CylinderGeometry(0.86, 0.86, 0.05, 64), gold, -1.2);
    }
    add(ball, new THREE.IcosahedronGeometry(0.68, 1), gold, -0.9);
    add(ball, new THREE.SphereGeometry(1.05, 64, 48), gold, 0.42);
    const edgeSource = new THREE.EdgesGeometry(
      new THREE.DodecahedronGeometry(1),
    );
    const position = edgeSource.getAttribute("position");
    const arcs: number[] = [];
    for (let i = 0; i < position.count; i += 2) {
      const a = new THREE.Vector3().fromBufferAttribute(position, i),
        b = new THREE.Vector3().fromBufferAttribute(position, i + 1);
      for (let j = 0; j < 12; j++) {
        for (const t of [j / 12, (j + 1) / 12]) {
          const v = a.clone().lerp(b, t).normalize().multiplyScalar(1.054);
          arcs.push(v.x, v.y, v.z);
        }
      }
    }
    edgeSource.dispose();
    const seams = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(arcs, 3),
      ),
      new THREE.LineBasicMaterial({ color: "#704715" }),
    );
    seams.position.y = 0.42;
    ball.add(seams);
    add(cup, new THREE.CylinderGeometry(0.2, 0.4, 0.8, 32), silver, -0.75);
    const points = [
      new THREE.Vector2(0.2, -0.4),
      new THREE.Vector2(0.35, -0.2),
      new THREE.Vector2(0.65, 0.05),
      new THREE.Vector2(0.85, 0.6),
      new THREE.Vector2(0.88, 0.95),
      new THREE.Vector2(0.8, 1),
      new THREE.Vector2(0.76, 0.6),
      new THREE.Vector2(0.55, 0.1),
      new THREE.Vector2(0.25, -0.2),
    ];
    add(cup, new THREE.LatheGeometry(points, 64), silver, 0.1);
    for (const side of [-1, 1]) {
      const handle = add(
        cup,
        new THREE.TorusGeometry(0.48, 0.065, 16, 48, Math.PI * 1.7),
        silver,
        0.55,
      );
      handle.position.x = side * 0.88;
      handle.rotation.z = side > 0 ? -Math.PI * 0.85 : Math.PI * 0.15;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.traverse((o) => {
      if (o instanceof THREE.Mesh) o.castShadow = true;
    });
    const dustPositions = new Float32Array(75 * 3);
    for (let i = 0; i < 75; i++) {
      dustPositions[i * 3] = Math.sin(i * 2.4) * 3;
      dustPositions[i * 3 + 1] = ((i * 17) % 50) / 10 - 1.5;
      dustPositions[i * 3 + 2] = Math.cos(i * 1.7) * 2 - 1;
    }
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(dustPositions, 3),
      ),
      new THREE.PointsMaterial({
        color: "#d6ad60",
        size: 0.018,
        transparent: true,
        opacity: 0.5,
      }),
    );
    scene.add(dust);
    let dragging = false,
      previousX = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      previousX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        control.current.angle += (e.clientX - previousX) * 0.012;
        previousX = e.clientX;
      }
    };
    const up = () => {
      dragging = false;
    };
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    control.current.spin = !reduced;
    setSpin(!reduced);
    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    let visible = true,
      frame = 0,
      last = 0;
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    observer.observe(host);
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden || time - last < 32) return;
      last = time;
      if (control.current.spin) control.current.angle += 0.012;
      root.rotation.y = control.current.angle;
      root.rotation.x = 0.08;
      ball.visible = control.current.type === "ball";
      cup.visible = !ball.visible;
      const rect = host.getBoundingClientRect();
      const target = 0.4 + (rect.top / innerHeight) * 0.15;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, target, 0.04);
      camera.lookAt(0, 0.1, 0);
      if (!reduced && control.current.spin) dust.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      scene.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.LineSegments ||
          o instanceof THREE.Points
        ) {
          o.geometry.dispose();
          const materials = Array.isArray(o.material)
            ? o.material
            : [o.material];
          materials.forEach((m) => m.dispose());
        }
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  const choose = (value: string) => {
    setType(value);
    control.current.type = value;
  };
  return (
    <div className="trophy-experience">
      <div
        ref={mount}
        className="trophy-canvas"
        role="img"
        aria-label={`Stylised ${type === "ball" ? "golden football" : "silver cup"} trophy`}
      >
        {error && (
          <div style={{ textAlign: "center" }}>
            <svg
              width="150"
              height="180"
              viewBox="0 0 150 180"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="fallback-gold" cx="30%" cy="25%">
                  <stop stopColor="#fff1bd" />
                  <stop offset="1" stopColor="#9d6f28" />
                </radialGradient>
              </defs>
              <circle cx="75" cy="65" r="52" fill="url(#fallback-gold)" />
              <path
                d="m75 30 30 22-12 35H57L45 52Z"
                fill="none"
                stroke="#79501a"
                strokeWidth="2"
              />
              <path d="M55 117h40l12 28H43Z" fill="#ae813c" />
              <path d="M30 145h90v18H30Z" fill="#292b30" />
            </svg>
            <p style={{ fontSize: 14 }}>
              Static preview · WebGL is unavailable in this browser.
            </p>
            <a href="#career-quiz">Try the career quiz instead ↗</a>
          </div>
        )}
      </div>
      {!error && (
        <div className="trophy-controls">
          <button aria-pressed={type === "ball"} onClick={() => choose("ball")}>
            Golden football
          </button>
          <button aria-pressed={type === "cup"} onClick={() => choose("cup")}>
            European cup
          </button>
          <button
            onClick={() => {
              control.current.spin = !spin;
              setSpin(!spin);
            }}
          >
            {spin ? "Pause rotation" : "Auto rotate"}
          </button>
          <button
            aria-label="Rotate trophy left"
            onClick={() => {
              control.current.angle -= 0.4;
            }}
          >
            ←
          </button>
          <button
            aria-label="Rotate trophy right"
            onClick={() => {
              control.current.angle += 0.4;
            }}
          >
            →
          </button>
        </div>
      )}
      <p className="model-note">
        Original 3D interpretations, not official trophy replicas. The cup
        represents ambition, not a claim of a Champions League title.
      </p>
    </div>
  );
}
