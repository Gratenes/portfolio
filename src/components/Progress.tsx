import {useContext} from "react";
import {AnimationContext} from "@/context/AnimateProvider";
import waypoints from "@/three/effects/waypoints";


export default function Progress () {
  const {shouldAnimate, waypointIndex, nextWaypoint, prevWaypoint} = useContext(AnimationContext);

  if (shouldAnimate) return <></>
  return <div className={'w-screen pointer-events-none flex flex-col fixed z-10 bottom-0 left-0 text-3xl text-white flex items-center justify-center'}>
    <div className={'flex flex-col pointer-events-auto px-20 bg-blue-700/10 backdrop-blur rounded-md'}>
      <div>
        Welcome to my portfolio
      </div>
      <div className={'flex flex-row w-full max-w-[100px] mx-auto justify-between'}>
        <button onClick={prevWaypoint} className={''}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
          </svg>
        </button>
        <button onClick={nextWaypoint} className={''}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div className={'w-full h-2'}>
      <div style={{width: `${((waypointIndex + 1) / waypoints.length) * 100}%`}} className={'bg-blue-700 h-2'}></div>
    </div>
  </div>
}