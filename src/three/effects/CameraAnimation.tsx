import waypoints from './waypoints'
import {useFrame} from "@react-three/fiber";
import {AnimationContext} from "@/context/AnimateProvider";
import {useContext, useRef} from "react";
import {OrthographicCamera, PerspectiveCamera} from "three";
import {CameraControls} from "@react-three/drei";


export default function CameraAnimation({camera}: { camera: PerspectiveCamera | OrthographicCamera }) {
  const {waypointIndex, shouldAnimate, setPosition, setRotation} = useContext(AnimationContext);
  const controlsRef = useRef<any>()

  useFrame((state, delta) => {
    if (!camera) return;

    setPosition({
      x: parseFloat(camera.position.x.toFixed(5)),
      y: parseFloat(camera.position.y.toFixed(5)),
      z: parseFloat(camera.position.z.toFixed(5))
    })

    setRotation({
      x: parseFloat(camera.rotation.x.toFixed(5)),
      y: parseFloat(camera.rotation.y.toFixed(5)),
      z: parseFloat(camera.rotation.z.toFixed(5))
    })

    if (shouldAnimate) return;
    const point = waypoints[waypointIndex];

    // Linear interpolation of position
    state.camera.position.lerp(point!.position, point.duration || .1);

    // Convert rotation to Euler
    let currentRotation = state.camera.rotation.clone()
    let targetRotation = point!.rotation.clone();

    // Perform linear interpolation on each component
    currentRotation.x += (targetRotation.x - currentRotation.x) * (point.duration || .1);
    currentRotation.y += (targetRotation.y - currentRotation.y) * (point.duration || .1);
    currentRotation.z += (targetRotation.z - currentRotation.z) * (point.duration || .1);

    // Set interpolated rotation
    state.camera.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z)
  }, 2)

  if (shouldAnimate) return <CameraControls ref={controlsRef} camera={camera}/>
  return null;
}