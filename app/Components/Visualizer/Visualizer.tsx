import React, {useEffect, useState, type KeyboardEvent} from "react"
import ProgressBar from "../ProgressBar/ProgressBar";
import Cards from "./Cards/Cards";

export default function Visualizer(){

    const [pokemonCards, setPokemonCards] = useState([{name:"weedle", id:100}])
    const [newPokemon, setNewPokemon] = useState("wurmple")
    const [id, setId] = useState(0)

    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>){
        setNewPokemon(event.target.value)
    }

    function keyboardEventHandler(event:KeyboardEvent<HTMLInputElement>){
        if(event.key === "Enter"){
            addPokemon();
        }

    }

    function clearAll(){
        setPokemonCards([])
    }

    function addPokemon(){
        if(newPokemon.trim() !== ""){
            setPokemonCards(c => [...c, {name:newPokemon, id:id}])
        setNewPokemon("")
        setId(i => i = i+1)
        }
    }

    function deletePokemon(id:number){
        console.log("click")
        const updatedCards = pokemonCards.filter((element) => element.id !== id)
        setPokemonCards(t => t = updatedCards)
        console.log(pokemonCards)
    }

/*     function deletePokemon(index){
        const updatedTasks = tasks.filter((_, i)=> i !== index)
        setTasks(t => t = updatedTasks)
    }
     */

    

    

    //
    return(
        <>
            

            <div className="flex flex-col items-center ">
                <div className="w-200 h-20 m-10 bg-linear-145 from-red-800 to-gray-900 rounded-xl flex items-center justify-center"> 
                        <div className="flex justify-around items-center w-100 md:w-130 text-xl">
                            <input onChange={handleInputChange} onKeyDown={keyboardEventHandler} className="rounded-xl pl-2 bg-gray-300 w-60 h-10 text-xl outline-hidden text-black" type="text" value={newPokemon} />
                            <button onClick={addPokemon} className="bg-blue-500 p-2 w-20 rounded-xl active:scale-98 active:border-black">Add</button>
                            <button onClick={clearAll} className="bg-red-500 rounded-xl p-1.5 active:scale-98 active:shadow-lg">Clear</button>
                        </div>
                        
                </div>
                <div className="w-92 md:w-270 sm:w-182 flex-wrap bg-blue-400 rounded-xl p-3 flex">
                    <ul className="flex flex-wrap">
                        {
                            pokemonCards.map((element, index)=>{
                                return (
                                    <li key={index}><Cards name={element.name} key={element.id} id={element.id} close={deletePokemon}></Cards></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}


/* pokemonCards.map((card, index)=> {
                        return ( <li key={index}></li> )
                    }) */