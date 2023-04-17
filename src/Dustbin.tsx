import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
function getStyle(backgroundColor: any) {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "8rem",
    minWidth: "8rem",
    color: "white",
    backgroundColor,
    padding: "2rem",
    paddingTop: "1rem",
    margin: "1rem",
    textAlign: "center",
    float: "left",
    fontSize: "1rem",
  };
}
export const Dustbin = ({ greedy, children }: any) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  );
  const text = greedy ? "greedy" : "not greedy";
  let backgroundColor = "rgba(0, 0, 0, .5)";
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = "darkgreen";
  }
  return (
    <div ref={drop} style={getStyle(backgroundColor) as any}>
      {text}
      <br />
      {hasDropped && <span>dropped {hasDroppedOnChild && " on child"}</span>}

      <div>{children}</div>
    </div>
  );
};
