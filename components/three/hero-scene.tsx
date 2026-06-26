"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Sparkles, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

function InkBlob() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.15
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.3
  })
  return (
    <mesh ref={ref} scale={1.35}>
      <icosahedronGeometry args={[1, 24]} />
      <MeshDistortMaterial
        color="#0a0a0a"
        roughness={0.05}
        metalness={1}
        distort={0.38}
        speed={1.4}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}

function ChromeKnot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t / 4) / 2
    ref.current.rotation.y = t / 3
    ref.current.rotation.z = Math.cos(t / 4) / 2
  })
  return (
    <mesh ref={ref} scale={0.42} position={[0, 0, 0.2]}>
      <torusKnotGeometry args={[1.6, 0.34, 220, 24]} />
      <meshPhysicalMaterial
        color="#111111"
        roughness={0.15}
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.6}
      />
    </mesh>
  )
}

function OrbitRing({ radius = 2.4, tilt = 0.5, speed = 0.3, color = "#ea580c" }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0.3, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 200]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  )
}

function GlassDrop({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.4}
          color="#ffffff"
          attenuationColor="#ea580c"
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  )
}

function MetalShard({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial color="#1a1a1a" metalness={1} roughness={0.1} clearcoat={1} envMapIntensity={1.5} />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 900
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return arr
  }, [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#57534e" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Rig() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const x = state.pointer.x * 0.3
    const y = state.pointer.y * 0.2
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.05)
  })
  return (
    <group ref={group}>
      <InkBlob />
      <ChromeKnot />
      <OrbitRing radius={2.3} tilt={0.6} speed={0.25} color="#ea580c" />
      <OrbitRing radius={2.8} tilt={-0.4} speed={-0.18} color="#44403c" />
      <GlassDrop position={[2.6, 1.1, 0.5]} scale={0.34} />
      <GlassDrop position={[-2.8, -0.9, 0.2]} scale={0.24} />
      <MetalShard position={[2.4, -1.4, 0.4]} scale={0.28} />
      <MetalShard position={[-2.5, 1.3, -0.2]} scale={0.22} />
      <Sparkles count={60} scale={8} size={2} speed={0.3} color="#ea580c" opacity={0.4} />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true }}>
      <color attach="background" args={["#070707"]} />
      <fog attach="fog" args={["#070707", 7, 14]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 10, 10]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-10, -8, -5]} intensity={0.8} color="#ea580c" />
      <pointLight position={[0, 3, 3]} intensity={1.2} color="#ffffff" />
      <Suspense fallback={null}>
        <Rig />
        <ParticleField />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
