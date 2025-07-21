import { useState } from "react";
import GridModifiers from "~/Components/GridModifiers/GridModifiers";
import GridTokens from "~/Components/GridTokens/GridTokents";
import MakeGrid from "~/Components/MakeGrid/MakeGrid";

export default function DragAndDrop() {
  const length = 8;
  const width = 8;  
  const [grid, setGrid] = useState<any[][]>(Array.from({ length }, () => Array(width).fill("")));


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="w-150 mb-5">This page at the moment is just a practice for Drag and Drop, not related to pokemon at the moment, managed to build a simple chess game (with no logic in it at the moment)</p>
      <div className="w-screen h-auto flex items-center justify-center">
      <GridTokens length={length} width={width} grid={grid} setGrid={setGrid}/>
      {/* <GridModifiers/> */}
      <MakeGrid length={8} width={8} grid={grid} setGrid={setGrid} />
    </div>
    </div>
  )
}