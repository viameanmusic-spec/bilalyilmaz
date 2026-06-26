"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

const DARK = "#141414"
const STEEL = "#2a2a2a"
const ORANGE = "#ea580c"

function Coil({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* coil core */}
      <mesh castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.62, 32]} />
        <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.35} />
      </mesh>
      {/* copper wrap */}
      <mesh>
        <cylinderGeometry args={[0.175, 0.175, 0.5, 32]} />
        <meshStandardMaterial color={ORANGE} metalness={0.85} roughness={0.3} emissive={ORANGE} emissiveIntensity={0.15} />
      </mesh>
      {/* caps */}
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.06, 32]} />
        <meshStandardMaterial color={DARK} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.06, 32]} />
        <meshStandardMaterial color={DARK} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

function MachineModel() {
  const needle = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!needle.current) return
    // rapid needle oscillation
    const t = state.clock.getElapsedTime()
    needle.current.position.y = -1.05 + Math.sin(t * 40) * 0.05
  })

  return (
    <group rotation={[0, -0.5, 0.15]} position={[0, 0.2, 0]} scale={1.1}>
      {/* frame back plate */}
      <mesh castShadow position={[0, 0.2, -0.18]}>
        <boxGeometry args={[0.55, 1.1, 0.12]} />
        <meshPhysicalMaterial color={DARK} metalness={1} roughness={0.25} clearcoat={1} />
      </mesh>

      {/* top bridge */}
      <mesh castShadow position={[0, 0.85, 0.1]}>
        <boxGeometry args={[0.85, 0.16, 0.5]} />
        <meshStandardMaterial color={STEEL} metalness={0.95} roughness={0.3} />
      </mesh>

      {/* two coils */}
      <Coil position={[-0.18, 0.2, 0.05]} />
      <Coil position={[0.18, 0.2, 0.05]} />

      {/* armature bar */}
      <mesh position={[0, 0.65, 0.18]} rotation={[0, 0, 0.05]}>
        <boxGeometry args={[0.5, 0.05, 0.12]} />
        <meshStandardMaterial color={ORANGE} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* tube / grip */}
      <mesh castShadow position={[0, -0.45, 0.28]}>
        <cylinderGeometry args={[0.11, 0.11, 1.1, 32]} />
        <meshStandardMaterial color={STEEL} metalness={0.95} roughness={0.25} />
      </mesh>

      {/* grip knurl ring */}
      <mesh position={[0, -0.4, 0.28]}>
        <cylinderGeometry args={[0.13, 0.13, 0.35, 32]} />
        <meshStandardMaterial color={DARK} metalness={0.7} roughness={0.6} />
      </mesh>

      {/* tip */}
      <mesh position={[0, -1.02, 0.28]}>
        <cylinderGeometry args={[0.06, 0.04, 0.18, 24]} />
        <meshStandardMaterial color={STEEL} metalness={1} roughness={0.2} />
      </mesh>

      {/* moving needle */}
      <group ref={needle} position={[0, -1.05, 0.28]}>
        <mesh>
          <cylinderGeometry args={[0.008, 0.008, 0.3, 12]} />
          <meshStandardMaterial color="#d6d3d1" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* binding post */}
      <mesh position={[0, 0.55, -0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color={ORANGE} metalness={0.8} roughness={0.3} emissive={ORANGE} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function TattooMachine() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]} shadows gl={{ antialias: true }}>
      <color attach="background" args={["#0b0b0b"]} />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 6, 5]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={1} color="#ea580c" />
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <MachineModel />
        </Float>
        <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={6} blur={2.5} far={4} color="#000000" />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}
