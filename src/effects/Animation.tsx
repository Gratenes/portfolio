
import waypoints from './waypoints'
import {useFrame} from "@react-three/fiber";
import {useEffect} from "react";


function getWayPoint(name: string) {
	for (let i = 0; i < waypoints.length; i++) {
		if (waypoints[i].name === name) {
			return waypoints[i]
		}
	}
}

export default function Animation({
	shouldAnimate,
}: {
	shouldAnimate: boolean
}) {
	let second = 0
	useFrame((state, delta) => {
		if (second !== Math.round(state.clock.elapsedTime)) {
			second = Math.round(state.clock.elapsedTime)
			console.log(second)
			console.log(state.camera.position)
			console.log(state.camera.rotation)
		}

		if (!shouldAnimate) return
		state.camera.position.lerp(getWayPoint('lookAtCave')!.position, .1)
		const rotation = getWayPoint('lookAtCave')!.rotation
		state.camera.rotation.set(
			rotation.x, rotation.y, rotation.z
		)
	})

	return (
		<>
		</>
	)

}