import {Vector3} from "three";


interface Waypoint {
	name: string
	position: Vector3
	rotation?: Vector3
  step: number
	duration: number
}

export default ([{
	name: 'start',
	position: new Vector3(.183, -.7589, 3.819),
	rotation: new Vector3(0, 0, 0),
	lookAt: new Vector3(0, 0, 0),
	step: 0,
	duration: .1,
},{
	name: 'lookAtCave',
	position: new Vector3(-.911, -.6569, -2),
	rotation: new Vector3(-.1, .3, 0),
}
])