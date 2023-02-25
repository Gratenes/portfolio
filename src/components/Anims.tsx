import { MeshAnim }       from "./CustomMesh//MeshAnim";
import noise, { perlin3 } from "./CustomMesh/noise";
import { randomSin }      from './CustomMesh/math';

export function GrowingExp({ position }:{
  position: [number, number, number]
}) {
  const zOfXYT = (x: number, y: number, t: number) => {
    let cyc = 1 + Math.sin(t / 250)

    return cyc *
      5 * Math.exp(-1 * (x ** 2 + y ** 2) ** (0.75) / cyc);
  }

  const colorOfXYZT = (x: number, y: number, z: number, t: any) => {
    let r = Math.sqrt(x ** 2 + y ** 2)

    return {
      b: r / 75,
      g: z / 5,
      r: z
    }
  }

  return (
    <MeshAnim
      position = {position}
      rotation = {[-Math.PI / 2, 0, 0]}
      grid     = {{
        width : 100,
        height: 100,
        sep   : 0.1
      }}
      zOfXYT      = {zOfXYT}
      colorOfXYZT = {colorOfXYZT}
      anim        = {{
        init  : 0,
        update: (t) => {
          return t + 1
        }
      }}
    />
  );
}

export function Ripple({ position }:{
  position: [number, number, number]
}) {
  const zOfXYT = (x: number, y: number, t: number) => {
    return Math.sin(0.1 * (x ** 2 + y ** 2 + t));
  }

  const colorOfXYZT = (x: any, y: any, z: number, t: any) => {
    return {
      r: 0.2 * Math.cos(z),
      g: z / 5,
      b: 0.2
    }
  }

  return (
    <MeshAnim
      position = {position}
      grid     = {{
        width : 100,
        height: 100,
        sep   : 0.1
      }}
      zOfXYT      = {zOfXYT}
      colorOfXYZT = {colorOfXYZT}
      anim        = {{
        init  : 0,
        update: (t) => {
          return t + 0.1;
        }
      }} rotation={[0,0,0]}    />
  );

}

export function Terrain({ position, rotation }:{
  position: [number, number, number],
  rotation: [number, number, number]
}) {
  const seed = Math.floor(Math.random() * (2 ** 16))
  noise.seed(seed)

  const sampleNoise = (x: number, y: number, z: any) => {
    let scale       = 1 / 8
    let octaves     = 20
    let persistence = 0.6
    let lacunarity  = 2

    let amp  = 1
    let freq = 1

    let v = 0
    for (let i = 0; i < octaves; i++) {
      v    += amp * perlin3(x * freq * scale, y * freq * scale, z)
      amp  *= persistence
      freq *= lacunarity
    }

    return v
  }

  const zOfXYT = (x: any, y: any, t: any) => {
    return sampleNoise(x, y, t);
  }

  const colorOfXYZT = (x: number, y: number, z: number, t: any) => {
    const localRandom = randomSin(1001*x-7*y+seed)
    const variation   = () => {
      return localRandom()*0.01;
    }

    return {
      r: z + variation(),
      g: z / 5 + variation(),
      b: Math.sqrt(x ** 2 + y ** 2) / 75 + variation(),
    }
  }

  const update = (t: number) => {
    return t + .002
  }

  return (
    <MeshAnim
      position = {position}
      rotation = {rotation}
      grid     = {{
        width : 100,
        height: 100,
        sep   : .2
      }}
      zOfXYT      = {zOfXYT}
      colorOfXYZT = {colorOfXYZT}
      anim        = {{
        init: 0,
        update
      }}
    />
  );
}