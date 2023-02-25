import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Island() {

  const Gltf = useMemo(() => {
    let gltf = useLoader(GLTFLoader, "/3d/island4.gltf")
    for (let i = 0; i < gltf.scene.children.length; i++) {
      const element =   gltf.scene.children[i];

      if (element.name === 'Cube002') {                                            console.log('Found Correct Mesh')
        if ('material' in gltf.scene.children[i]) {                                console.log('Found Correct Material')
                                                                                   // @ts-ignore
          gltf.scene.children[i].material.color            = { r: 2, g: 2, b: 2 }  // @ts-ignore
          gltf.scene.children[i].material.attenuationColor = { r: 2, g: 2, b: 2 }  // @ts-ignore
          gltf.scene.children[i].material.emissive         = { r: 2, g: 2, b: 2 }  // @ts-ignore
          gltf.scene.children[i].material.specularColor    = { r: 2, g: 2, b: 2 }  // @ts-ignore
          gltf.scene.children[i].material.specularColor    = { r: 2, g: 2, b: 2 }  // @ts-ignore
          gltf.scene.children[i].material.emissiveIntensity = 2                   // @ts-ignore
          console.log(gltf.scene.children[i].material)
        }
      }
    }

    return gltf
  }, [])

  return {
    Island: () => <primitive object={Gltf.scene} />,
    Bloom: () => <primitive object={Gltf.scene.children[4]} />
  }
}