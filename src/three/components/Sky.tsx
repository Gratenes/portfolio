import {useFrame} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import THREE, {MeshBasicMaterial, Object3D, TextureLoader} from "three";


export function Stars() {
  const amount = 3000;
  const radius = 300;
  const boxSize = {
    x: 5,
    y: 20,
    z: 5
  }
  const minSize = 0.5;
  const maxSize = 0.75;

  const stars = [...Array(amount)].map((_, i) => {
    let position;

    // Generate random positions until a position outside the radius is found
    do {
      position = [
        (Math.random() - 0.5) * boxSize.x * radius,
        (Math.random() - 0.5) * boxSize.y * radius,
        (Math.random() - 0.5) * boxSize.z * radius
      ] as [number, number, number]
    } while (Math.sqrt(position[0] ** 2 + position[1] ** 2 + position[2] ** 2) <= radius);

    return (
      <mesh position={position} key={i}>
        <sphereGeometry
          attach="geometry"
          args={[Math.random() * (maxSize - minSize) + minSize]}
        />
        <meshBasicMaterial color={0xffffff}/>
      </mesh>
    );
  });

  return <group>{stars}</group>;
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry
        attach="geometry"
        args={[10]}
      />
      <meshBasicMaterial color={0xffff00}/>
    </mesh>
  );
}

function Moon() {
  const moon = useRef<
    MeshBasicMaterial & { map: THREE.Texture }
  >()

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      '/moon.png',
      (texture) => {
        if (!moon.current) return
        moon.current.map = texture;
      },
      undefined,
      (err) => {
        console.error(err);
      }
    );

    if (!moon.current) return
    console.log(moon.current)

  }, [])

  return (
    <mesh>
      <sphereGeometry
        attach="geometry"
        args={[10]}

      />
      <ambientLight intensity={0.1}/>
      <meshBasicMaterial
        color={"white"}
        ref={moon as any}/>
    </mesh>
  );
}

export function RiseBasedOnTime(props: {
  time: number
}) {
  const {time} = props;
  const position = useRef<Object3D>()

  const radius = 250;

  const rise = time < 0.5 ? time * 2 : (1 - time) * 2;
  useFrame(({
              scene,
              gl,
              camera,
              clock
            }, delta) => {
    if (!position.current) return
    position.current.position.x = Math.sin(
      clock.elapsedTime * 0.05
    ) * radius;
    position.current.position.y = Math.sin(
      clock.elapsedTime * 0.05
    ) * radius;
    position.current.position.z = Math.cos(
      clock.elapsedTime * 0.05
    ) * radius;


    position.current
  })

  return (
    <group ref={position as any}>
      {
        time < 0.5
          ? <Sun/>
          : <Moon/>
      }
    </group>
  );
}