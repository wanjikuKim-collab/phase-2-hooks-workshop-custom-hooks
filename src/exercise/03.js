import { useState, useEffect } from "react";

export function useMouseCoordinates() {
  const [coordinates,setCoordinates] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
  //creating an event handler function to run when the mousemove event fires
   function handler(event){
    setCoordinates({
      clientX: event.clientX,
      clientY: event.clientY,
    })
   }
   
   // Attaching an event listener to the window for a mousemove event
   window.addEventListener("mousemove", handler)

    return function cleanup() {
     //cleaning up event listener when the hook isn't in use
     window.removeEventListener("mousemove", handler)
    };
  }, []);

  return coordinates;
}

export default function MyComponent() {
  const { clientX, clientY } = useMouseCoordinates();

  return (
    <div style={{ cursor: "none", width: "100%", height: "100%" }}>
      <h2>Mouse X: {clientX}</h2>
      <h2>Mouse Y: {clientY}</h2>
      <Cursor x={clientX} y={clientY} />
    </div>
  );
}

function Cursor({ x, y }) {
  const style = {
    position: "fixed",
    top: y,
    left: x,
    height: "45px",
    width: "45px",
    borderRadius: "50%",
    background: "blue",
    backgroundSize: "cover",
    zIndex: 1,
  };
  return <div style={style} />;
}
