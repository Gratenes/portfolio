import { DoubleSide } from "three";
import { randomSin } from "./CustomMesh/math";
import { MeshAnim } from "./CustomMesh/MeshAnim";
import noise, { perlin3 } from "./CustomMesh/noise";

export default function Water({ position, rotation }:{
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
    const current = [
      'oneWayWave',
      'circleInMiddle'
    ]
    switch (current[0]) {
      case 'circleInMiddle':
        return Math.sqrt(x ** 2 + y ** 2) < 9 ? 
        0
        :
        sampleNoise(x, y, t)
        || sampleNoise(x, y, t);
      
      case 'oneWayWave':
        const pis = Math.sqrt(x ** 2 + y ** 2)
        if ( pis < 10 ) 
          switch (true) {
            case (pis < 0):
              return ((Math.abs(x) + Math.abs(y)) * .25) - 1
            default:
              return (Math.sin(((x + y) * 2) / 7.5 + t + (sampleNoise(x, y, t))) / (-pis + 11.9)) + .9
          }
        else {
          return (Math.sin(((x + y) * 2) / 7.5 + t + sampleNoise(x, y, t))) + .9
        }

      default:
        return sampleNoise(x, y, t)
    }
  }

  const colorOfXYZT = (x: number, y: number, z: number, t: any) => {
    const localRandom = randomSin(1001 * x-7 * y+seed)
    const variation   = () => {
      return localRandom()*0.01;
    }

    return true ? {
      r: .1,
      g: z / 5 + .5,
      b: Math.sqrt(x ** 2 + y ** 2) / 75 + .9,
    } : {
      r: z + variation(),
      g: z / 5 + variation(),
      b: Math.sqrt(x ** 2 + y ** 2) / 75 + variation(),
    }
  }

  const update = (t: number) => {
    return t + .01
  }

  return (
    <MeshAnim
      position={position}
      rotation={rotation}
      options={{
        opacity: 1,
        transparent: true,
        wireframe: false,
      }}
      grid={{
        width: 100,
        height: 100,
        sep: 1
      }}
      zOfXYT={zOfXYT}
      colorOfXYZT={colorOfXYZT}
      anim={{
        init: 0,
        update
      }}
    />
  );
}