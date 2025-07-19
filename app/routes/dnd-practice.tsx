import { useState } from "react";

const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-gray-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
];

export default function DragAndDropSwap() {
  const [types, setTypes] = useState(
    [{url: "TypeSprites/normal.png", name: "Normal"},
    {url: "TypeSprites/fire.png", name: "Fire"},
    {url: "TypeSprites/water.png", name: "Water"},
    {url: "TypeSprites/grass.png", name: "Grass"},
    {url: "TypeSprites/electric.png", name: "Electric"},
    {url: "TypeSprites/ice.png", name: "Ice"},
    {url: "TypeSprites/fighting.png", name: "Fighting"},
    {url: "TypeSprites/poison.png", name: "Poison"},
    {url: "TypeSprites/ground.png", name: "Ground"},
    {url: "TypeSprites/flying.png", name: "Flying"},
    {url: "TypeSprites/psychic.png", name: "Psychic"},
    {url: "TypeSprites/bug.png", name: "Bug"},
    {url: "TypeSprites/rock.png", name: "Rock"},
    {url: "TypeSprites/ghost.png", name: "Ghost"},
    {url: "TypeSprites/dragon.png", name: "Dragon"},
    {url: "TypeSprites/dark.png", name: "Dark"},
    {url: "TypeSprites/steel.png", name: "Steel"},
    {url: "TypeSprites/fairy.png", name: "Fairy"}, ]
  );
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  function handleDragStart(idx: number) {
    setDraggedIdx(idx);
  }

  function handleDrop(idx: number) {
    if (draggedIdx === null || draggedIdx === idx) return;
    const newTypes = [...types];
    [newTypes[draggedIdx], newTypes[idx]] = [newTypes[idx], newTypes[draggedIdx]];
    setTypes(newTypes);
    setDraggedIdx(null);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-wrap items-center justify-center h-60 w-100 gap-4">
      {types.map((type, idx) => (
        <img
          className={`h-10 rounded-lg cursor-pointer`}
          key={type.name}
          src={type.url}
          alt={type.name}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDrop={() => handleDrop(idx)}
          onDragOver={handleDragOver}        >
        </img>
      ))}
    </div>
    </div>
  );
}