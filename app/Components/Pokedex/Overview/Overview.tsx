import ProgressBar from "~/Components/ProgressBar/ProgressBar";

type OverviewProps = {    
    pokemon?: string;
    data: any;
}

export default function Overview({pokemon, data}: OverviewProps) {

    const stats = [];

    if(data){
        stats.push(
        { label: "HP:", value: data.stats[0].base_stat },
        { label: "Attack:", value: data.stats[1].base_stat },
        { label: "Defense:", value: data.stats[2].base_stat },
        { label: "Speed:", value: data.stats[3].base_stat },
        { label: "Special Attack:", value: data.stats[4].base_stat },
        { label: "Special Defense:", value: data.stats[5].base_stat })
    }

    function normalize(val?: string) {
    if (!val) return "";
    return val
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}




    return (
        <div className="bg-gray-800 w-full h-full rounded-xl mt-5 ml-5 flex">
                <div className="flex flex-col h-100 w-60 items-center">
                    <div className="flex items-center justify-center h-52 w-52 bg-blue-200 rounded-xl m-4">
                    {data ? <img className="h-full w-full object-cover" src={data.sprites.front_default} alt={pokemon} /> : null}
                </div>
                <div className="flex bg-white justify-center text-black rounded-lg mb-2 w-50 border-2 h-10 border-gray-500">
                    <h1 className="text-[25px]">{normalize(pokemon)}</h1>
                </div>
                <div className="flex [&>*]:">
                    {data ? <span><img className="w-25" src={`/my-react-router-app/TypeSprites/${data.types[0].type.name}.png`} alt={data.types[0].type.name} /></span> : <></>}
                    {data && data.types.length === 2  ? <span><img className="w-25" src={`/my-react-router-app/TypeSprites/${data.types[1].type.name}.png`} alt={data.types[1].type.name} /></span> : <></>}
                </div>
                
            </div>
            <div className="flex flex-col w-full h-full pt-4 pr-4">
                {data ? stats.map((stat, index) => (
                        <div key={index} className="flex bg-gray-700 text-white p-1 rounded-lg mb-2 [&>*]:text-sm ">
                            <span className="flex-2">{stat.label}</span>
                            <span className="flex-1">{stat.value}</span>
                            <span className="flex-3"><ProgressBar  value={stat.value} maxValue={200}/></span>
                            
                            </div>
                        )   ) : <></>}
            </div>
        </div>
    );
}