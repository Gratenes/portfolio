import waypoints from './waypoints'
import {useFrame, useThree} from "@react-three/fiber";
import {AnimationContext} from "@/context/AnimateProvider";
import {useContext, useEffect} from "react";
import {Euler, Quaternion} from "three";


export default function CameraAnimation({
                                    shouldAnimate,
                                  }: {
  shouldAnimate: boolean
}) {
  const {waypointIndex, position, setPosition, setRotation} = useContext(AnimationContext);
  const { camera } = useThree(); // add this line to get the camera object

  useFrame((state, delta) => {

    const point = waypoints[waypointIndex];

    // interpolation of position
    state.camera.position.lerp(point!.position, .1);

    const targetQuaternion = new Quaternion().setFromEuler(new Euler(point!.rotation.x, point!.rotation.y, point!.rotation.z));

    // spherically interpolates (lerps) between the quaternion of the camera's rotation and the target quaternion
    state.camera.quaternion.slerp(targetQuaternion, 0.1);
  }, 2)

  return null;
}