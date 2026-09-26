import { Loader, Preload, Scroll, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { HtmlScroll } from './HtmlScroll'
import { Scene3D } from './Scene3D'

const PAGES = 9

export function PortfolioCanvas() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        className="!fixed inset-0"
      >
        <color attach="background" args={['#050508']} />
        <fog attach="fog" args={['#050508', 10, 32]} />

        <Suspense fallback={null}>
          <ScrollControls pages={PAGES} damping={0.18} distance={1}>
            <Scroll>
              <Scene3D />
            </Scroll>
            <Scroll html style={{ width: '100%' }}>
              <HtmlScroll />
            </Scroll>
          </ScrollControls>
          <Preload all />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: '#050508' }}
        innerStyles={{ width: 280, height: 2, background: '#1a1a22' }}
        barStyles={{ height: 2, background: '#4fd1ff' }}
        dataStyles={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: 12,
          color: '#8b92a8',
        }}
      />
    </>
  )
}
