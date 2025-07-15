import { Link } from "react-router"
import react from "./react-2.svg"

export default function Navbar(){


    const navLinks = [
        {name: "Home", path: "/" },
        {name: "Pokedex", path: "/pokedex" },
        {name: "Visualizer", path: "/pokemon-visualizer" },
        {name: "About", path: "/about" },
        {name: "Contact", path: "/contact" },
        
    ] 


    return(
        <header className="h-40 w-100% ">
            <div className="bg-linear-45 from-red-900 to-black h-26 w-100% flex justify-center items-center [&>*]:p-2 [&>*]:text-[35px] "  >
                <span className="text-yellow-400">Pokemon </span> 
                <span className="text-sky-300">React </span>
                <img className="max-h-[70px]" src={react} alt="react Logo" /> 
                <span className="text-emerald-500">Project</span>
            </div>
            <div className=" h-14 bg-linear-120 from-blue-400 via-green-900 to-red-500 flex justify-center" >
                <ul className={`navBar bg-position-[center_top_-39rem] flex flex-row justify-center w-[600px] [&>*]:hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.6)]`}>
                    {navLinks.map((element)=>(
                        <li key={element.name} className="border border-gray-600 w-[150px] h-14 flex justify-center items-center backdrop-blur-[2px]">
                            <Link to={element.path}>{element.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}