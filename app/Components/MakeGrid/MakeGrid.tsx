import { useState } from "react";

export type CardProps = {
  length: number;
  width: number;
}

export default function MakeGrid({ length, width }: CardProps) {

  const [grid, setGrid] = useState<number[][]>(Array.from({ length }, () => Array(width).fill(0)));

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(rowIndex: number, cellIndex: number, e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const {action, value} = JSON.parse(data);
    // Example: increase or decrease cell value based on drag data
    console.log(data)
    const newGrid = [...grid];
    if (action === "increase") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] + value) * 100) / 100;
    } else if (action === "decrease") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] - value) * 100) / 100;
    } else if (action === "multiply") {
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] * value) * 100) / 100;
    } else if (action === "divide") {
      if (value === 0) return alert("No"); // Prevent division by zero
      newGrid[rowIndex][cellIndex] = Math.round((newGrid[rowIndex][cellIndex] / value) * 100) / 100;
    } if (action === "reset") {
      newGrid[rowIndex][cellIndex] = 0;
    }
    setGrid(newGrid);
  }

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div
            onDragOver={handleDragOver}
            onDrop={(e) => {handleDrop(rowIndex, cellIndex, e)}}
            onClick={() => {
              const newGrid = [...grid];
              newGrid[rowIndex][cellIndex]++;
              setGrid(newGrid);
            }}
            className="w-15 h-15 border border-gray-300 flex items-center justify-center"
              key={cellIndex}
            >{cell}</div>
          ))}
        </div>
      ))}
    </div>
  )
}