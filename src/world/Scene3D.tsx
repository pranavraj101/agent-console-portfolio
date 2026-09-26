import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  useScroll,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SandboxCage } from './SandboxCage'

function ParticleTunnel() {
  const ref = useRef<THREE.Points>(null)
  const scroll = useScroll()

  const positions = useMemo(() => {
    const count = 4000
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * 8
      arr[i * 3] = Math.cos(t) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = Math.sin(t) * r
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03 + scroll.offset * Math.PI * 3
    ref.current.position.y = scroll.offset * 6
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#4fd1ff"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ScrollShape({
  page,
  color,
  shape,
}: {
  page: number
  color: string
  shape: 'knot' | 'ico' | 'box' | 'torus' | 'octa' | 'ring' | 'dodeca' | 'sphere'
}) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const scroll = useScroll()
  const y = -page * viewport.height

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      y + scroll.offset * viewport.height * 0.02,
      0.08,
    )
    group.current.rotation.x = t * 0.15 + page
    group.current.rotation.z = t * 0.1
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'knot':
        return <torusKnotGeometry args={[0.55, 0.16, 220, 32]} />
      case 'ico':
        return <icosahedronGeometry args={[0.85, 1]} />
      case 'box':
        return <boxGeometry args={[1.1, 1.1, 1.1]} />
      case 'torus':
        return <torusGeometry args={[0.75, 0.22, 48, 120]} />
      case 'octa':
        return <octahedronGeometry args={[0.95, 0]} />
      case 'ring':
        return <torusGeometry args={[1.1, 0.04, 16, 120]} />
      case 'dodeca':
        return <dodecahedronGeometry args={[0.8, 0]} />
      default:
        return <sphereGeometry args={[0.75, 64, 64]} />
    }
  }, [shape])

  return (
    <group ref={group} position={[page % 2 === 0 ? -1.2 : 1.4, y, -0.5]}>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh castShadow receiveShadow>
          {geometry}
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.85}
            distort={0.28}
            speed={2}
          />
        </mesh>
      </Float>
      <Sparkles count={40} scale={2.5} size={2} speed={0.35} color={color} />
    </group>
  )
}

function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()

  useFrame(() => {
    const z = 6.5 - scroll.offset * 3.5
    const y = -scroll.offset * 3
    const x = Math.sin(scroll.offset * Math.PI * 2) * 0.6
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.04)
    camera.lookAt(0, y * 0.5, 0)
  })

  return null
}

export function Scene3D() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={12} color="#4fd1ff" />
      <pointLight position={[3, -4, 2]} intensity={8} color="#a78bfa" />

      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.6} />
      <SandboxCage />
      <ParticleTunnel />

      <ScrollShape page={0} color="#4fd1ff" shape="knot" />
      <ScrollShape page={1} color="#a78bfa" shape="ico" />
      <ScrollShape page={2} color="#34d399" shape="box" />
      <ScrollShape page={3} color="#f472b6" shape="torus" />
      <ScrollShape page={4} color="#fbbf24" shape="octa" />
      <ScrollShape page={5} color="#60a5fa" shape="dodeca" />
      <ScrollShape page={6} color="#fb7185" shape="ring" />
      <ScrollShape page={7} color="#34d399" shape="box" />
      <ScrollShape page={8} color="#4fd1ff" shape="sphere" />
    </>
  )
}
