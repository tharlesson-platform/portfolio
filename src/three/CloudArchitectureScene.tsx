import { useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  CircleGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  FogExp2,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  RingGeometry,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
} from "three";
import { ArchitectureFallback } from "./ArchitectureFallback";

type NavigatorWithConnection = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const NODE_POSITIONS = [
  [-2.2, 0.2, 0.4],
  [-1.25, 1.65, -0.2],
  [0.55, 2.0, -0.7],
  [2.0, 1.15, 0.2],
  [2.25, -0.55, -0.3],
  [1.15, -1.75, 0.35],
  [-0.7, -1.95, -0.45],
  [-2.0, -1.1, 0.2],
] as const;

export default function CloudArchitectureScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = media.matches;
    const device = navigator as NavigatorWithConnection;
    const compact = window.matchMedia("(max-width: 720px)").matches || (device.deviceMemory ?? 8) <= 4;
    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: !compact,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !compact;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    scene.fog = new FogExp2(0x05070b, 0.075);

    const camera = new PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0.15, compact ? 7.7 : 6.8);

    const rig = new Group();
    rig.rotation.x = -0.08;
    scene.add(rig);

    const coreMaterial = new MeshPhysicalMaterial({
      color: 0x16283a,
      emissive: 0x0d3850,
      emissiveIntensity: 0.72,
      metalness: 0.62,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      transparent: true,
      opacity: 0.96,
    });
    const core = new Mesh(new IcosahedronGeometry(0.83, compact ? 1 : 2), coreMaterial);
    core.castShadow = !compact;
    core.receiveShadow = !compact;
    rig.add(core);

    const wire = new Mesh(
      new IcosahedronGeometry(1.09, 1),
      new MeshBasicMaterial({ color: 0x58d6ff, wireframe: true, transparent: true, opacity: 0.22 }),
    );
    rig.add(wire);

    const haloMaterial = new MeshBasicMaterial({
      color: 0x7c82ff,
      transparent: true,
      opacity: 0.12,
      side: DoubleSide,
      depthWrite: false,
    });
    const halo = new Mesh(new RingGeometry(1.2, 1.55, 64), haloMaterial);
    halo.rotation.x = Math.PI / 2;
    rig.add(halo);

    const ringMaterial = new MeshStandardMaterial({
      color: 0x88dfff,
      emissive: 0x245e78,
      emissiveIntensity: 0.45,
      metalness: 0.68,
      roughness: 0.3,
      transparent: true,
      opacity: 0.56,
    });
    const rings = [
      new Mesh(new TorusGeometry(1.52, 0.012, 6, 84), ringMaterial),
      new Mesh(new TorusGeometry(1.92, 0.009, 6, 96), ringMaterial.clone()),
      new Mesh(new TorusGeometry(2.35, 0.007, 6, 108), ringMaterial.clone()),
    ];
    rings[0].rotation.set(1.05, 0.12, 0.32);
    rings[1].rotation.set(0.35, 0.88, -0.24);
    rings[2].rotation.set(1.35, -0.45, 0.18);
    rings.forEach((ring) => rig.add(ring));

    const nodes = new InstancedMesh(
      new SphereGeometry(0.085, compact ? 8 : 14, compact ? 6 : 10),
      new MeshStandardMaterial({
        color: 0xe8f8ff,
        emissive: 0x58d6ff,
        emissiveIntensity: 1.4,
        metalness: 0.3,
        roughness: 0.22,
      }),
      NODE_POSITIONS.length,
    );
    const dummy = new Object3D();
    NODE_POSITIONS.forEach(([x, y, z], index) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      nodes.setMatrixAt(index, dummy.matrix);
    });
    nodes.instanceMatrix.needsUpdate = true;
    rig.add(nodes);

    const connectionPoints: number[] = [];
    NODE_POSITIONS.forEach(([x, y, z]) => connectionPoints.push(0, 0, 0, x, y, z));
    const connections = new LineSegments(
      new BufferGeometry().setAttribute(
        "position",
        new Float32BufferAttribute(connectionPoints, 3),
      ),
      new LineBasicMaterial({ color: 0x58d6ff, transparent: true, opacity: 0.2 }),
    );
    rig.add(connections);

    const pulseMaterial = new MeshBasicMaterial({ color: 0xffb45c });
    const pulses = [0, 2, 4, 6].map((nodeIndex) => {
      const pulse = new Mesh(new SphereGeometry(0.045, 8, 6), pulseMaterial);
      pulse.userData.nodeIndex = nodeIndex;
      rig.add(pulse);
      return pulse;
    });

    const floor = new Mesh(
      new CircleGeometry(2.8, 64),
      new ShadowMaterial({ color: 0x000000, transparent: true, opacity: 0.32 }),
    );
    floor.position.set(0, -2.35, -0.35);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !compact;
    scene.add(floor);

    scene.add(new HemisphereLight(0x9adfff, 0x05070b, 1.5));
    const key = new DirectionalLight(0xf1fbff, 3.4);
    key.position.set(3.5, 4.5, 5);
    key.castShadow = !compact;
    key.shadow.mapSize.set(512, 512);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 12;
    scene.add(key);
    const cyan = new PointLight(0x58d6ff, 5.5, 8, 2);
    cyan.position.set(-3.2, 0.6, 2.2);
    scene.add(cyan);
    const iris = new PointLight(0x7c82ff, 4.2, 8, 2);
    iris.position.set(2.8, -1.4, 1.5);
    scene.add(iris);

    const pointer = new Vector2();
    const target = new Vector2();
    let visible = true;
    let documentVisible = !document.hidden;
    let frameId = 0;
    let lastTime = performance.now();
    let frameSample = 0;
    let frameTotal = 0;
    let qualityReduced = compact;

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, qualityReduced ? 1 : 1.5));
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.32;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.2;
    };

    const render = (now: number) => {
      frameId = requestAnimationFrame(render);
      if (!visible || !documentVisible) return;

      const elapsed = now * 0.001;
      const delta = Math.min(now - lastTime, 50);
      lastTime = now;

      if (!reducedMotion) {
        pointer.lerp(target, 0.045);
        rig.rotation.y = elapsed * 0.075 + pointer.x;
        rig.rotation.x = -0.08 - pointer.y;
        core.rotation.y = elapsed * 0.16;
        core.rotation.x = elapsed * 0.08;
        wire.rotation.y = -elapsed * 0.11;
        rings[0].rotation.z += 0.00055 * delta;
        rings[1].rotation.y -= 0.00035 * delta;
        rings[2].rotation.x += 0.00022 * delta;
        pulses.forEach((pulse, index) => {
          const node = NODE_POSITIONS[pulse.userData.nodeIndex as number];
          const progress = (elapsed * 0.22 + index * 0.24) % 1;
          pulse.position.set(node[0] * progress, node[1] * progress, node[2] * progress);
          pulse.scale.setScalar(0.7 + Math.sin(progress * Math.PI) * 0.8);
        });
      }

      renderer.render(scene, camera);

      if (!qualityReduced && frameSample < 100) {
        frameSample += 1;
        frameTotal += delta;
        if (frameSample === 100 && frameTotal / frameSample > 22) {
          qualityReduced = true;
          renderer.shadowMap.enabled = false;
          resize();
        }
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { rootMargin: "120px" });
    observer.observe(host);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", move, { passive: true });
    const onVisibilityChange = () => {
      documentVisible = !document.hidden;
      lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    renderer.render(scene, camera);
    if (!reducedMotion) frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.traverse((object) => {
        if (object instanceof Mesh || object instanceof LineSegments) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material?.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (failed) return <ArchitectureFallback />;

  return <div ref={hostRef} className="architecture-canvas" />;
}
