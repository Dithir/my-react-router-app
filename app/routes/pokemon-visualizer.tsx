import ProgressBar from "~/Components/ProgressBar/ProgressBar";
import Visualizer from "~/Components/Visualizer/Visualizer";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visualizer" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function PokeVisualizer(){

    return(
        <>
           
            <Visualizer></Visualizer>
            asdasd
        </>
        
    )
}