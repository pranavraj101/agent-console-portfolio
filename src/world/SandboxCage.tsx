import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function SandboxCage() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()

  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(3.2, 3.2, 3.2)
    const edgeGeo = new THREE.EdgesGeometry(geo)
    geo.dispose()
    return edgeGeo
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.08 + scroll.offset * Math.PI * 2
    group.current.rotation.x = Math.sin(t * 0.15) * 0.12
    group.current.position.y = Math.sin(scroll.offset * Math.PI) * 0.4
    const s = 1 + scroll.offset * 0.35
    group.current.scale.setScalar(s)
  })

  return (
    <group ref={group} position={[0, 0, -1.5]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#34d399" transparent opacity={0.55} />
      </lineSegments>
      <mesh>
        <boxGeometry args={[3.2, 3.2, 3.2]} />
        <meshBasicMaterial
          color="#4fd1ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Corner posts — "jail" affordance */}
      {[
        [-1.6, -1.6, -1.6],
        [1.6, -1.6, -1.6],
        [-1.6, 1.6, -1.6],
        [1.6, 1.6, -1.6],
        [-1.6, -1.6, 1.6],
        [1.6, -1.6, 1.6],
        [-1.6, 1.6, 1.6],
        [1.6, 1.6, 1.6],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      ))}
    </group>
  )
}
