'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Float, Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 700;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.02;
      ref.current.rotation.x += d * 0.01;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#2DD4BF" size={0.025} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
    // gentle mouse parallax
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, state.pointer.y * 0.3, 0.05);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.4, 0.05);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Icosahedron ref={ref} args={[1.6, 6]}>
        <MeshDistortMaterial
          color="#14B8A6"
          roughness={0.18}
          metalness={0.65}
          distort={0.38}
          speed={1.6}
          emissive="#0F766E"
          emissiveIntensity={0.25}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#5EEAD4" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#14B8A6" />
      <Blob />
      <ParticleField />
    </Canvas>
  );
}
