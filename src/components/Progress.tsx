import {useContext} from "react";
import {AnimationContext} from "@/context/AnimateProvider";


export default function Progress () {
  const {waypointIndex, nextWaypoint, prevWaypoint} = useContext(AnimationContext);

  return <div className={'w-screen h-screen fixed z-10 top-0 left-0 text-3xl text-white flex items-center justify-center'}>
    <div className={'flex flex-row p-20 bg-white/10 backdrop-blur rounded-md'}>
      <button onClick={prevWaypoint}>
        {'<'}
      </button>
      <button onClick={nextWaypoint}>
        {'>'}
      </button>
    </div>
  </div>
}