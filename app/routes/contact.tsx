import {Link} from "react-router"

export default function Contact(){

    return(
<div className="w-screen flex items justify-center">
            <div className=" p-5 w-200 bg-gray-800 rounded-xl mt-5 ml-5 flex flex-col">
                <p>
                    My current ways to contact me are:
                </p>
                <p>
                    - Email: agustinbaez94@gmail.com
                </p>
                <p>
                    - LinkedIn: <Link target="_blank" to="https://www.linkedin.com/in/alan-agustin-baez-miranda/">https://www.linkedin.com/in/alan-agustin-baez-miranda/</Link>
                </p>
            </div>
        </div>
    )
}