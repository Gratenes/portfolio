import {useEffect, useMemo, useState} from "react";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import THREE, {Color, MeshLambertMaterial, Object3D} from "three";
import {GLTF} from "three-stdlib";

export default function Island() {
  const [gltf, setGltf] = useState<GLTF | null>(null);

// Use effect to load the object
  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load("/3d/island4.gltf", function (result: GLTF) {
      result.scene.traverse((child: Object3D) => {
        child.castShadow = true;
        child.receiveShadow = true;
      });

      result.scene.children.forEach((child: Object3D) => {
        if (child.name === 'Cube002') {
          console.log('Found correct mesh');
          // Check if the child is a mesh with lambert material
          if ('material' in child && (child as any).material instanceof MeshLambertMaterial) {
            const mesh = child as any;
            console.log('Found correct mesh and material');
            mesh.material.color = new Color(1, 1, 1);
            mesh.material.emissive = new Color(1, 1, 1);
            mesh.material.specular = new Color(1, 1, 1);
            mesh.material.emissiveIntensity = 2;
            console.log(mesh.material);
          }
        }
      });

      // Set the state
      setGltf(result);
    });
  }, []);

  const Island = () => (gltf && gltf.scene) ? <primitive object={gltf.scene}/> : null;
  const Bloom = () => (gltf && gltf.scene.children[4]) ? <primitive object={gltf.scene.children[4]}/> : null;

  return {
    Island,
    Bloom
  }
}