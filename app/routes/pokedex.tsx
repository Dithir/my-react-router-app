import type { Route } from "./+types/pokedex";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
import { useState } from "react";
import Overview from "../Components/Pokedex/Overview/Overview";
import Entries from "../Components/Pokedex/Overview/Entries";
import Locations from "../Components/Pokedex/Overview/Locations";
import Moves from "../Components/Pokedex/Overview/Moves";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokedex" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Pokedex() {

  const { pokemon, section } = useParams();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);

  function handleInputChange(e:any){
    setInput(e.target.value);
  }

  function handleSearch(){
    navigate(`/pokedex/${input}`);
    setInput("");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-220 h-screen flex items ">
            <div className="w-42 h-full bg-gray-800 rounded-xl mt-5 ml-5 flex flex-col items-center">

                <input onChange={(e)=>{handleInputChange(e)}} className="bg-white max-w-[80%] h-5 rounded-[5px] mt-4 mb-2 text-black text-[12px]" placeholder="Type a pokemon here" type="text" />
                <button onClick={handleSearch} className="bg-gray-300 text-black p-1 m-2 text-[13px] rounded-[7px]">Search</button>
                <ul className="w-full flex flex-col [&>*]:text-center [&>*]:w-full [&>*]:text-[13px] [&>*]:text-white [&>*]:p-2 [&>*]:hover:bg-gray-300 [&>*]:hover:text-black">
                    <Link to={`/pokedex/${pokemon}/overview`}>
                        <li>Overview</li>
                    </Link>
                    <Link to={`/pokedex/${pokemon}/pokedex-entries`}>
                        <li>Pokedex Entries</li>
                    </Link>
                    <Link to={`/pokedex/${pokemon}/locations`}>
                        <li>Locations</li>
                    </Link>
                    <Link to={`/pokedex/${pokemon}/moves`}>
                        <li>Moves</li>
                    </Link>
                </ul>
            </div>
            {section === "overview" || section === undefined? <Overview pokemon={pokemon} data={pokemonData} /> : <></>}
            {section === "pokedex-entries" && pokemon ? <Entries pokemon={pokemon} data={pokemonData} /> : <></>}
            {section === "locations" && pokemon ? <Locations pokemon={pokemon} data={pokemonData} /> : <></>}
            {section === "moves" && pokemon ? <Moves pokemon={pokemon} data={pokemonData} /> : <></>}
        </div>
        
    </div>
  );
}
