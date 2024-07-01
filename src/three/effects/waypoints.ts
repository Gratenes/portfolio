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
  rotation: new Vector3(0, 0, 0),
  position: new Vector3(.183, -.7589, 3.819),
  lookAt: new Vector3(0, 0, 0),
  step: 0,
  duration: .1,
}, {
  name: 'lookAtCave',
  rotation: new Vector3(-.1, .3, 0),
  position: new Vector3(-.911, -.6569, -2),
}, {
  name: 'viewstars',
  rotation: new Vector3(3.07985,0.09757,-3.13557),
  position: new Vector3(31.83887,319.06166,-582.02263),
  duration: .04,
}])