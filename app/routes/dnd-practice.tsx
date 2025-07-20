import { useState } from "react";
import GridModifiers from "~/Components/GridModifiers/GridModifiers";
import MakeGrid from "~/Components/MakeGrid/MakeGrid";

export default function DragAndDrop() {


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="w-150">This page at the moment is just a practice for Drag and Drop, im planning on making some thing related to Pokemon later, maybe something like a
      interactive Chess Board with pokemon pieces or something, but for now it is just a practice.</p>
      <div className="w-screen h-100 flex items-center justify-center">
      <GridModifiers/>
      <MakeGrid length={5} width={5} />
    </div>
    </div>
  )
}