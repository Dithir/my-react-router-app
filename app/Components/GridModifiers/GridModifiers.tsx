import React, { useState } from "react";

export default function GridModifiers(){
    const [value, setValue] = useState(0);

    return (
        <div className="m-5 flex flex-col gap-2">
            <input 
            onChange={(e) => setValue(Number(e.target.value))}
            value={value}
            className="bg-white w-10 text-black"
            type="number"
            defaultValue={0}></input>
            <div
            className="w-10 h-10 border rounded-full border-gray-300 flex items-center justify-center bg-black"
            draggable
            onDragStart={(e) => {
                const payload = JSON.stringify({ action: "reset", value: value });
                e.dataTransfer.setData("text/plain", payload);
            }}
            >0</div>
            <div
            className="w-10 h-10 border rounded-full border-gray-300 flex items-center justify-center bg-green-700"
            draggable
            onDragStart={(e) => {
                const payload = JSON.stringify({ action: "increase", value: value });
                e.dataTransfer.setData("text/plain", payload);
            }}
            >+</div>
            <div
            onDragStart={(e) => {
                const payload = JSON.stringify({ action: "decrease", value: value });
              e.dataTransfer.setData("text/plain", payload);
            }}
            draggable
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-red-700"
            >-</div>
            <div
            onDragStart={(e) => {
                const payload = JSON.stringify({ action: "multiply", value: value });
              e.dataTransfer.setData("text/plain", payload);
            }}
            draggable
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-orange-700"
            >*</div>
            <div
            onDragStart={(e) => {
                const payload = JSON.stringify({ action: "divide", value: value });
              e.dataTransfer.setData("text/plain", payload);
            }}
            draggable
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-blue-700"
            >/</div>
        </div>
    )
}