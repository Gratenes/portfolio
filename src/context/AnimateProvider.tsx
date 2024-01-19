import { createContext, useContext, useEffect, useState } from "react";
import waypoints from "@/three/effects/waypoints";


// Create the context
export const AnimationContext = createContext({
  shouldAnimate: false,
  setShouldAnimate: (_: boolean) => {},
  waypointIndex: 0,
  position: {x: 0, y: 0, z: 0},
  setPosition: (_: {x: number, y: number, z: number}) => {},
  rotation: {x: 0, y: 0, z: 0},
  setRotation: (_: {x: number, y: number, z: number}) => {},
  prevWaypoint: () => {},
  nextWaypoint: () => {},
});


// Animation Provider
export const AnimationProvider = ({ children }:any) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [waypointIndex, setWaypointIndex] = useState(0);
  const [position, setPosition] = useState({x: 0, y: 0, z: 0});
  const [rotation, setRotation] = useState({x: 0, y: 0, z: 0});

  // Function to go to the next waypoint
  const nextWaypoint = () => {
    setWaypointIndex((prevState) => (prevState + 1 >= waypoints.length) ? 0 : prevState + 1);
  }

  // Function to go back to the previous waypoint
  const prevWaypoint = () => {
    setWaypointIndex((prevState) => (prevState - 1 < 0) ? waypoints.length - 1 : prevState - 1);
  }

  // Provide the value to the context
  const contextValue = { waypointIndex, shouldAnimate, setShouldAnimate, prevWaypoint, nextWaypoint, position, setPosition, rotation, setRotation };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};
