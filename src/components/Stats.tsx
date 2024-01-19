import {useContext, useEffect} from "react";
import {AnimationContext} from "@/context/AnimateProvider";

export const Stats = () => {
  const {rotation, position, setShouldAnimate} = useContext(AnimationContext);

  useEffect(() => {
    console.log(position)
  }, [position])

  return <div className={'z-20 text-white absolute top-0 right-0'}>
    <div>
      <p>
        {`x: ${rotation.x}`}
      </p>
      <p>
        {`y: ${rotation.y}`}
      </p>
      <p>
        {`z: ${rotation.z}`}
      </p>
    </div>
    <div>
      <p>
        {`x: ${position.x}`}
      </p>
      <p>
        {`y: `} {position.y}
      </p>
      <p>
        {`z: ${position.z}`}
      </p>
    </div>
    <button onClick={() => setShouldAnimate(a => !a)}>Toggle Animation</button>
    <button onClick={() => {console.log(position, rotation)}}>Refresh</button>
  </div>
}