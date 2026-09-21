"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DimensionCanvas3DProps {
  mind: number;
  energy: number;
  nature: number;
  tactics: number;
}

/**
 * Lightweight, low-overhead 3D faceted crystal core.
 * Replaces expensive MeshDistortMaterial vertex noise with a clean low-poly
 * dual-layer polyhedral crystal that rotates smoothly with zero CPU/GPU heating.
 */
function CrystalCore({ mind, energy, nature, tactics }: DimensionCanvas3DProps) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Dynamic role palette based on MBTI dimensions
  const roleColor = useMemo(() => {
    const isN = energy <= 50;
    const isT = nature <= 50;
    if (isN && isT) return "#a855f7"; // Analysts Purple
    if (isN && !isT) return "#10b981"; // Diplomats Emerald
    if (!isN && isT) return "#0ea5e9"; // Sentinels Sky
    return "#f59e0b"; // Explorers Amber
  }, [energy, nature]);

  useFrame((_, delta) => {
    // Gentle, steady rotation with minimal delta calculation
    const speedMultiplier = 0.5 + (tactics / 100) * 0.5;
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.2 * speedMultiplier;
      outerRef.current.rotation.y += delta * 0.3 * speedMultiplier;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.25 * speedMultiplier;
      innerRef.current.rotation.y -= delta * 0.2 * speedMultiplier;
    }
  });

  const baseScale = 0.85 + (mind - 50) * 0.002;

  return (
    <group scale={baseScale}>
      {/* Outer subtle wireframe cage (Octahedron - 8 faces) */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color={roleColor}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner faceted crystal gem (Icosahedron - 20 faces) */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={roleColor}
          roughness={0.25}
          metalness={0.4}
          flatShading
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function DimensionCanvas3D(props: DimensionCanvas3DProps) {
  const { energy, nature } = props;

  const roleGlow = useMemo(() => {
    const isN = energy <= 50;
    const isT = nature <= 50;
    if (isN && isT) return "rgba(168, 85, 247, 0.18)";
    if (isN && !isT) return "rgba(16, 185, 129, 0.18)";
    if (!isN && isT) return "rgba(14, 165, 233, 0.18)";
    return "rgba(245, 158, 11, 0.18)";
  }, [energy, nature]);

  return (
    <div
      className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft ambient aura glow behind the crystal */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl transition-colors duration-700 pointer-events-none"
        style={{ background: roleGlow }}
      />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} />
        <directionalLight position={[-5, -5, -3]} intensity={0.8} />
        <CrystalCore {...props} />
      </Canvas>
    </div>
  );
}
