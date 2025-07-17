import {useEffect, useState } from "react";


type OverviewProps = {    
    pokemon?: string;
    data?: any;
}

export default function Moves({pokemon, data}: OverviewProps) {

    const [moveList, setMoveList] = useState<any[]>([]);
    const [versionList, setVersionList] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [moveData, setMoveData] = useState<any>(null);

    function normalize(val?: string) {
    if (!val) return "";
    return val
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
    }

    function sortObjectsByName<T extends { name: string }>(arr: T[]): T[] {
        return arr.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    async function handleModal(url: string) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const moveData = await response.json();
            setMoveData(moveData);
            setShowModal(true);
        } catch (error) {
            console.error("Error finding move data:", error);
        }
    }

    useEffect(()=>{
        console.log(data);
        console.log("OwO");
        if(data)setVersionList((vl:any) => vl = data.game_indices.map((game: any) => {
            return(game.version.name)
        }))
        if(data)setMoveList((ml:any) => ml = data.moves.map((move: any) => {
            return({
                name: move.move.name,
                url: move.move.url,
                games: move.version_group_details.map((detail: any) => detail.version_group.name),
            })
        }))
        console.log("Move List", JSON.stringify(moveList, null, 2));
        console.log(versionList)
    },[data])
 
    return (
        <div className="bg-gray-800 w-full h-100 rounded-xl mt-5 ml-5 items-center p-2 overflow-auto scrollbar-custom">
               
        <div className="flex flex-wrap justify-evenly w-full">
          {data ? sortObjectsByName(moveList).map((move)=>{
            return( <><div key={move.name} onClick={() => {console.log(move.games); handleModal(move.url)}} className="rounded-xl bg-gray-700 flex items-center text-[15px] justify-center h-12 w-30 m-1">{normalize(move.name)}</div>
                <br></br></>
             )
          }) : "No moves available"}
        </div>

        {showModal && (
            <div
                className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setShowModal(false)} // closes modal on overlay click
            >
                <div
                className="bg-gray-800 border border-gray-500 rounded-xl w-120 h-70 shadow-lg text-black overflow-auto flex"
                onClick={e => e.stopPropagation()} // prevents closing when clicking inside modal
                >
                {/* <button onClick={() => setShowModal(false)}>Close</button> */}
                <div className="flex flex-col items-center justify-between h-62">
                    <div className="mt-5 mx-5 mb-3 p-2 bg-gray-700 rounded-xl h-33">
                        <img className="w-30 mb-2" src={`/my-react-router-app/TypeSprites/${moveData.damage_class.name}.png`} alt="" />
                        <img className="w-30" src={`/my-react-router-app/TypeSprites/${moveData.type.name}.png`} alt="" />
                    </div>
                    <div className="text-white bg-gray-700 h-10 w-34 rounded-xl flex items-center justify-center">
                        Accuracy: {moveData.accuracy ? moveData.accuracy + "%" : "N/A"}
                    </div>
                    <div className="mt-3 text-white flex justify-between gap-3">
                        <span className="bg-gray-700 p-1 rounded-lg">Pow: {moveData.power ? moveData.power : "N/A"}</span>
                        <span className="bg-gray-700 p-1 rounded-lg">PP: {moveData.pp ? moveData.pp : "N/A"}</span>
                    </div>
                    
                </div>
                    <div className="mt-5 p-1 bg-gray-700 h-59 rounded-xl">
                        <div className="w-68 bg-gray-400 text-black h-10 text-[30px] flex items-center justify-center rounded-xl">{normalize(moveData.name)}</div>
                        <div className="text-white w-68 h-48 p-3 overflow-auto">{moveData.effect_entries[0] ? moveData.effect_entries[0].effect : moveData.flavor_text_entries[0].flavor_text}</div>
                    </div>
                </div>
            </div>
        )}

        </div>
    );


/*  moveData.accuracy
    moveData.damage_class.name
    moveData.effect_entries[0].effect
    moveData.name
    moveData.power
    moveData.pp
    moveData.type.name
*/
























}

