import {useCallback, useContext, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {CameraControls, PerspectiveCamera, Sky} from "@react-three/drei";
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import {RiseBasedOnTime, Stars} from "@/three/components/Sky";
import Island from "@/three/components/Island";
import Water from "@/three/components/Water";
import CameraAnimation from "@/three/effects/CameraAnimation";

export function ThreeD() {
  console.log("rerendering tree3d page")
  const cameraRef = useRef<any>()

  const IslandProps: any = {
    rotation: [0, 0, 0],
    position: [0, -2.1, 0],
    scale: 0.5
  }

  const islands = Island()


  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef}/>
      <CameraAnimation camera={cameraRef.current}/>

      <spotLight
        position={[10, 100, 10]}  // change this to move the source of light
        angle={0.2}  // broaden or tighten the light cone
        penumbra={0.7}  // adjust softness of the light's edge, 0: hard edge, 1: soft edge
        intensity={.76}  // increase or decrease light brightness
        decay={2}  // rate of dimming of the light, 0: doesn't dim, 2: standard, higher values mean light dims fast
        castShadow
        // Define shadow properties for finer control
        shadow-mapSize-width={1024}  // Increase shadow map size for better shadow resolution
        shadow-mapSize-height={1024}
      />

      {/* This is for the island (no rotation)                                            */}
      <group {...IslandProps}>
        <islands.Island/>
      </group>

      <group {...IslandProps}>
        <islands.Bloom/>
      </group>

      {/* This is the group for items that are rotated that need to be rotated (for waves) */}
      <group rotation={[-(Math.PI / 2), 0, 0]} position={[0, -3, 0]}>
        <Water position={[0, 0, 0]} rotation={[0, 0, 0]}/>
      </group>


      <Stars/>
      <RiseBasedOnTime time={.5}/>

      <EffectComposer>
        <Bloom
          intensity={1.0}    // The bloom intensity.
          luminanceThreshold={0.9}    // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025}  // smoothness of the luminance threshold. Range is [0, 1]
        />

      </EffectComposer>
    </>
  )
}