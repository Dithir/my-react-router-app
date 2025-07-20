import { Link } from "react-router";


export default function About(){

    return(
        <div className="w-screen flex items justify-center">
            <div className=" p-5 w-200 bg-gray-800 rounded-xl mt-5 ml-5 flex flex-col items-center">
                <p className=" text-white">
                    Hi, my name is Alan, i use the alias Dithir most of the time, im currently a self teaching front-end developer, I did some
                    learning on web development a few years back but i really started focusing on it this year, 2025, I'm currently focusing on learning
                    front-end related technologies like React, React-Router, Javascript/TypeScript, CSS/TailwindCSS and some basic knowledge of NodeJs
                    for the package manager use.
                </p>
                <p className=" text-white">
                    I'm constantly looking to learn new things and aiming to become a Full-Stack Developer in the future, and probably 
                    learning Cyber Security at some point, I'm currently looking for job opportunities and I'm open to learning what is needed for it,
                    my native language is spanish so i can speak it fluently, so i mostly do things in english to improve further my use of it,
                    if you are interested in my work or want to contact me, feel free to reach out to me through  <Link to="/contact" replace><span className="underline text-blue-300">Contact Me</span></Link>
                </p>
                
            </div>
        </div>
        
    )
}