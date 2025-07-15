import ProgressBar from "~/Components/ProgressBar/ProgressBar";

type OverviewProps = {    
    pokemon?: string;
    data: any;
}

export default function Overview({pokemon, data}: OverviewProps) {

    const stats = [
        { label: "HP:", value: 68 },
        { label: "Attack:", value: 65 },
        { label: "Defense:", value: 65 },
        { label: "Speed:", value: 80 },
        { label: "Special Attack:", value: 125 },
        { label: "Special Defense:", value: 115 },]


    return (
        <div className="bg-gray-800 w-full h-full rounded-xl mt-5 ml-5 flex">
                <div className="flex flex-col h-100 w-60 items-center">
                    <div className="flex items-center justify-center h-52 w-52 bg-blue-200 rounded-xl m-4">
                    <img className="h-full w-full object-cover" src="https://wiki.p-insurgence.com/images/0/07/282.png" alt={pokemon} />
                </div>
                <div className="flex bg-white justify-center text-black rounded-lg mb-2 w-50 border-2 border-gray-500">
                    <h1 className="text-[25px]">Gardevoir</h1>
                </div>
            </div>
            <div className="flex flex-col w-full h-full pt-4 pr-4">
                {stats.map((stat, index) => (
                        <div key={index} className="flex bg-gray-700 text-white p-1 rounded-lg mb-2 [&>*]:text-sm ">
                            <span className="flex-2">{stat.label}</span>
                            <span className="flex-1">{stat.value}</span>
                            <span className="flex-3"><ProgressBar  value={stat.value} maxValue={200}/></span>
                            
                            </div>
                        )   )}
            </div>
        </div>
    );
}