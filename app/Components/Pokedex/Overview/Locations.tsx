

type OverviewProps = {    
    pokemon?: string;
    data: any;
}

export default function Locations({pokemon, data}: OverviewProps) {


    return (
        <div className="bg-gray-800 w-full h-full rounded-xl mt-5 ml-5 items-center">
        This is the locations section for {pokemon}.
        </div>
    );
}