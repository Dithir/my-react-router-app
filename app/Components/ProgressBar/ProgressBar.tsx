import React, { useEffect, useState } from "react";
import "./ProgressBar.css"

function ProgressBar(props: any){

    const value = props.value
    const [progress, setProgress] = useState("")

    useEffect(()=>{
                switch(true){
        case value > 0 && value < 26 :
            setProgress("bar one");
            break;
        case value > 25 && value < 51 :
            setProgress("bar two");
            break;
        case value > 50 && value < 76 :
            setProgress("bar three");
            break;
        case value > 75 && value < 101 :
            setProgress("bar four");
            break;
        case value > 100 && value < 126 :
            setProgress("bar five");
            break;
        case value > 125 && value < 151 :
            setProgress("bar six");
            break;
        case value > 150 && value < 176 :
            setProgress("bar seven");
            break;
        case value > 175 && value < 201 :
            setProgress("bar eight");
            break;
    }
    })
    return(
        <>
        <progress className={progress} max={200} value={value}></progress>
        </>
    )
}

export default ProgressBar