"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface DimensionCanvas3DProps {
  mind: number;
  energy: number;
  nature: number;
  tactics: number;
}

function Shape({ mind, energy, nature, tactics }: DimensionCanvas3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (0.2 + energy / 200);
      meshRef.current.rotation.y += delta * (0.3 + tactics / 200);
      
      const scale = 1 + (mind - 50) / 200;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Material and geometry change smoothly
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, Math.max(0, Math.floor(nature / 15))]} />
        <MeshDistortMaterial
          color={nature > 50 ? "#10b981" : "#8b5cf6"}
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={tactics / 100}
          roughness={0.2}
          distort={mind / 200}
          speed={energy / 10}
        />
      </mesh>
    </Float>
  );
}

export default function DimensionCanvas3D(props: DimensionCanvas3DProps) {
  return (
    <div className="hidden lg:block absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Shape {...props} />
      </Canvas>
    </div>
  );
}
