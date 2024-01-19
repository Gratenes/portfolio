import {useFrame} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import * as THREE from 'three';

export function MeshAnim({
                           position,
                           rotation,
                           grid: {
                             width,
                             height,
                             sep
                           },
                           zOfXYT,
                           colorOfXYZT,
                           anim: {
                             init,
                             update
                           },
                           options
                         }: {
  position: [number, number, number],
  rotation: [number, number, number],
  grid: {
    width: number,
    height: number,
    sep: number
  },
  zOfXYT: (x: number, y: number, t: number) => number,
  colorOfXYZT: (x: number, y: number, z: number, t: any) => {
    r: number;
    g: number;
    b: number;
  }
  anim: {
    init: number,
    update: (t: number) => number
  }
  options?: {
    opacity?: number,
    transparent?: boolean,
    wireframe?: boolean
  }
}) {
  const mesh = useRef()
  let t = init;

  let {positions, colors, normals} = useMemo(() => {
    let positions: any = [], colors: any = [], normals: any = []

    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        let x = sep * (xi - (width - 1.) / 2.)
        let y = sep * (yi - (height + 1.) / 2.)
        let z = zOfXYT(x, y, t)
        positions.push(x, y, z)

        let color = colorOfXYZT(x, y, z, t)
        colors.push(color.r, color.g, color.b)

        normals.push(0, 0, 1)
      }
    }
    positions = new Float32Array(positions)
    colors = new Float32Array(colors)
    normals = new Float32Array(normals)

    return {
      positions,
      colors,
      normals
    }
  }, [width, height, sep, zOfXYT, colorOfXYZT, t])

  let indices = useMemo(() => {
    let indices = []
    let i = 0
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1)
        indices.push(i + width + 1, i + width, i)
        i++
      }
      i++
    }
    return new Uint16Array(indices)
  }, [width, height])

  let posRef = useRef(positions), colorRef = useRef(colors)
  useFrame(() => {
    t = update(t)

    const positions = posRef.current.array, colors = colorRef.current.array;

    let i = 0
    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        positions[i + 2] = zOfXYT(positions[i], positions[i + 1], t)

        let c = colorOfXYZT(positions[i], positions[i + 1], positions[i + 2], t)
        colors[i] = c.r
        colors[i + 1] = c.g
        colors[i + 2] = c.b
        i += 3
      }
    }

    posRef.current.needsUpdate = true;
    colorRef.current.needsUpdate = true;
  })

  return (
    <>
      <mesh
        // @ts-ignore
        ref={mesh}
        position={position}
        rotation={rotation}
      >
        <bufferGeometry>
          <bufferAttribute
            // @ts-ignore
            ref={posRef}
            attach='attributes-position'
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            // @ts-ignore
            ref={colorRef}
            attach='attributes-color'
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-normal'
            array={normals}
            count={normals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={indices}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          {...options}
        />
      </mesh>

    </>
  );
}