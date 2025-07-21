import { useState } from "react";

export type CardProps = {
  length: number;
  width: number;
  grid: any[][];
  setGrid: React.Dispatch<React.SetStateAction<any[][]>>;
}

export default function MakeGrid({ length, width, grid, setGrid }: CardProps) {

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  

  function handleGridDragStart(rowIndex: number, cellIndex: number) {
    return (e: React.DragEvent<HTMLDivElement>) => {
      // Only set drag data if the cell is not empty
      if (grid[rowIndex][cellIndex] !== "") {
        e.dataTransfer.setData("application/grid-coords", JSON.stringify({ rowIndex, cellIndex }));
      }
    };
  }

  function handleDrop(rowIndex: number, cellIndex: number, e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    // Try to move grid cell if drag data exists
    const coords = e.dataTransfer.getData("application/grid-coords");
    if (coords) {
      const { rowIndex: fromRow, cellIndex: fromCell } = JSON.parse(coords);
      if (fromRow === rowIndex && fromCell === cellIndex) return;
      const newGrid = [...grid];
      newGrid[rowIndex][cellIndex] = newGrid[fromRow][fromCell];
      newGrid[fromRow][fromCell] = "";
      setGrid(newGrid);
      return;
    }

    // Otherwise, handle external drops (keep your current logic)
    handleModifierDrop(rowIndex, cellIndex, e);
    handleTokenDrop(rowIndex, cellIndex, e);
  }

  function handleTokenDrop(rowIndex: number, cellIndex: number, e: React.DragEvent<HTMLDivElement>) {
    const data = e.dataTransfer.getData("text/plain");
    const token = JSON.parse(data);
    const newGrid = [...grid];
    if(token.type === "token") {
      newGrid[rowIndex][cellIndex] = <img src={`/my-react-router-app/ChessPieces/${token.value}.png`} alt="" />;
    setGrid(newGrid);
    }
  }

  function handleModifierDrop(rowIndex: number, cellIndex: number, e: React.DragEvent<HTMLDivElement>){
    const data = e.dataTransfer.getData("text/plain");
    const {action, value} = JSON.parse(data);
    console.log(data)
    const newGrid = [...grid];
    if (action === "increase") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] + value) * 100) / 100;
    } else if (action === "decrease") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] - value) * 100) / 100;
    } else if (action === "multiply") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] * value) * 100) / 100;
    } else if (action === "divide") {
      if (value === 0) return alert("No");
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] / value) * 100) / 100;
    } if (action === "reset") {
      newGrid[rowIndex][cellIndex] = 0;
    }
    setGrid(newGrid);
  }
  
  function handleRightClick(e: React.MouseEvent<HTMLDivElement>, rowIndex: number, cellIndex: number) {
    e.preventDefault();
    const newGrid = [...grid];
    newGrid[rowIndex][cellIndex] = "";
    setGrid(newGrid);
  }

  return (
    <div className="text-black">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => {
            const isDark = (rowIndex + cellIndex) % 2 === 0;
            return (
              <div
                draggable={cell !== ""}
                onDragStart={handleGridDragStart(rowIndex, cellIndex)}
                onContextMenu={(e) => { handleRightClick(e, rowIndex, cellIndex) }}
                onDragOver={handleDragOver}
                onDrop={(e) => { handleDrop(rowIndex, cellIndex, e) }}
                className={`w-15 h-15 border border-gray-300 flex items-center justify-center ${!isDark ? "bg-gray-700" : "bg-gray-200"}`}
                key={cellIndex}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  )
}