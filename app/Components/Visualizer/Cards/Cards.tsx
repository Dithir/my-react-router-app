import React, {useEffect, useState, type MouseEventHandler} from "react"
import ProgressBar from "~/Components/ProgressBar/ProgressBar";

export type CardProps = {
    name:string,
    id:number,
    close: (data: number) => void;
}

export default function Cards({name, id, close}:CardProps){

        const [data, setData] = useState<any>();
        const [toggle, setToggle] = useState(true)
        const statNames = ["Hp:", "Atk:", "Def:", "SpAtk:", "SpDef:", "Spd:"]
        const [abilities, setAbilities] = useState(["", "", ""])
        
        const fetchData = async (name: String) => {
            

            try {
                
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                if(!response.ok){
                    throw new Error("Could not get data from API")
                }
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error(error)
            }
        
        }

        useEffect(()=>{
            fetchData(name);
            
        },[])
        useEffect(()=>{
            if(data){
                getAbilities(data)
            }
        },[data])

        function normalize(val: string) {
        return String(String(val).charAt(0).toUpperCase() + String(val).slice(1)).replace("-", " ");
        }

        function getAbilities(pokemon: any){
            const newAbilities = [...abilities]
            pokemon.abilities.forEach((current:any)=>{
                
                newAbilities[current.slot - 1] = normalize(current.ability.name);
                setAbilities(a => a = newAbilities)
            })
        }

        function handleClose(){
            console.log("card close clicked")
            close(id)
        }

        function toggleBtn(event: any, button: String){
            console.log(event)
            if(button === "stats"){
                setToggle(true)
            } else{
                setToggle(false)
            }
        }


        return( data ? <div className="w-82 h-50 bg-linear-120 from-blue-900 to-red-800 rounded-xl m-3 p-4 flex">
                    <div className="flex flex-col justify-between h-full">
                        <div className="rounded-xl h-25 w-25 bg-emerald-200">
                            <img src={data ? data.sprites.front_default : null} alt="" />
                        </div>
                        <div className="rounded-xl w-25 h-15 flex flex-col items-center">
                            {data ? <img src={`app/Components/Visualizer/TypeSprites/${data.types[0].type.name}.png`} alt="" className="h-[50%]"/> : <></>}
                            {data ? 
                            (data.types.length === 2 ? <img src={`app/Components/Visualizer/TypeSprites/${data.types[1].type.name}.png`} alt="" className="h-[50%]"/> : "")
                            : 
                            <></>}
                        </div>
                    </div>
                    <div className="flex flex-col items-center h-full w-full bg-blue-900/25 ml-3 rounded-xl">
                        <div className="w-full flex mt-2 mb-[3px] justify-center">
                            <div className="bg-white text-[13px] rounded-xl w-[70%] justify-between text-black text-center font-bold">{data ? normalize(data.name) : ""}</div>
                            <button onClick={handleClose}  className="border border-gray-600 ml-2 px-1.5 rounded-xl text-xs bg-red-500">X</button>
                        </div>
                        <div className=" w-[85%] [&>*]: [&>*]:w-[50%] [&>*]:border-gray-400 [&>*]:border [&>*]:text-black" >
                            <button onClick={(event)=>toggleBtn(event,"stats")} className={`rounded-l-xl justify-center h-5 text-[13px]  ${toggle ? 'bg-gray-500' : "bg-gray-200"}`} >Base Stats</button>
                            <button onClick={(event)=>toggleBtn(event,"abilities")} className={`rounded-r-xl h-5 text-[13px] ${!toggle ? 'bg-gray-500' : "bg-gray-200"}`}>Abilities</button>
                        </div>
                        
                            {toggle ?
                            <div className="bg-gray-300/80 w-[85%] rounded-xl h-[62%] m-1 mt-1.5 pt-0.5">
                            <div className="[&>*]:text-black flex flex-col">
                                {
                                    data ?
                                        data.stats.map((stat: any, index: number)=>{ return(
                                            <div key={index} className="flex items-center [&>*]:text-black [&>*]:m-[0px] ml-2 ">
                                                <span className="flex-3 text-xs font-bold">{statNames[index]}</span>
                                                <span className="flex-2 text-xs font-bold">{stat.base_stat}</span>
                                                <span className="flex-5 text-xs font-bold"><ProgressBar value={50}></ProgressBar></span>
                                    
                                            </div>
                                            )
                                        })
                                    :
                                        <>
                                        </>
                                }
                                
                            </div>
                            </div>
                            :
                            
                            <div className="w-[85%] rounded-xl h-[58%] m-1 mt-1.5 [&>*]:text-black [&>*]:text-[13px] [&>*]:pl-1 [&>*]:font-bold">
                                <div className="bg-gray-500 rounded-t-[10px]">Abilities: </div>
                                <div className="bg-gray-300 border-b border-gray-400">1: {data ? abilities[0] : ""} </div>
                                <div className="bg-gray-300">2: {data ? abilities[1] : ""}</div>
                                <div className="bg-gray-500"> Hidden Ability:</div>
                                <div className="bg-gray-300 rounded-b-[10px]">H: {data ? abilities[2] : ""}</div>
                            </div>
                            
                            
                            }
                        </div>
                    
                    <div>

                    </div>
                </div> : <></>)
    }
