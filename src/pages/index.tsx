import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Head from 'next/head'
import Waves from '@/components/Water'
import Island from '@/components/Island'

import { PerspectiveCamera, CameraControls } from '@react-three/drei'
import { Bloom, EffectComposer, Select, Selection, Noise } from '@react-three/postprocessing'

export function ThreeD() {
  const rotateRef   = useRef<any>()
  const cameraRef   = useRef<any>()
  const controlsRef = useRef<any>()

  useFrame(() => {
    if (!rotateRef.current) return
    rotateRef.current.rotation.x += 0.01
    rotateRef.current.rotation.y += 0.01
  })

  const IslandProps:any = {
    rotation: [0, 0, 0],
    position: [0, -2.1, 0],
    scale   : 0.5
  }

  const islands = Island()
  const BloomRef = useRef<any>()

  return (
    <>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef} />
          <CameraControls ref={controlsRef} camera={cameraRef.current} /> 
          <ambientLight intensity={0.1} />
          <spotLight
            position  = {[0, 100, 0]}
            angle     = {0.1}
            penumbra  = {1}
            intensity = {0.75}
            castShadow
          />
          <mesh ref={rotateRef} position={[0, 5, 0]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color={'white'} />
          </mesh>

          {/* This is for the island (no rotation)                                            */}
          <group {...IslandProps}>
            <islands.Island/>
          </group> 

          {/* This is the group for items that are rotated that need to be rotated (for waves) */}
          <group rotation={[-(Math.PI / 2), 0, 0]} position={[0, -3, 0]}>
            <Waves position={[0, 0, 0]} rotation={[0, 0, 0]} />
          </group>



            <group {...IslandProps}>
              <islands.Bloom/>
            </group>



          <EffectComposer>
            <Bloom
              intensity          = {1.0}    // The bloom intensity.
              luminanceThreshold = {0.9}    // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing = {0.025}  // smoothness of the luminance threshold. Range is [0, 1]
            />

        </EffectComposer>
    </>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Chance Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>Wats Up</p>
      </div>
      <div
        style={{
          background: 'linear-gradient(90deg, #FF008C 0%, #FF8C00 100%)',
          height    : '100vh',
          width     : '100vw',
          position  : 'absolute',
          top       : 0,
          left      : 0,
          zIndex    : -1,
        }}
      >
        <Canvas>
          <ThreeD />
        </Canvas>
      </div>
    </>
  )
}
