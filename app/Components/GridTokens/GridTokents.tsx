import { useState } from "react";


export type CardProps = {
  length: number;
  width: number;
  grid: any[][];
  setGrid: React.Dispatch<React.SetStateAction<any[][]>>;
}

export default function GridTokens({ length, width, grid, setGrid }: CardProps) {



    function handleReset(){
        const newGrid = [...grid]
        for(let i = 0; i < length; i++){
            for(let j = 0; j < width; j++){
                if(i === 1){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackPawn.png`} alt="" />;
                } else if(i === 6){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhitePawn.png`} alt="" />;
                } else if(i === 0 && (j === 0 || j === 7)){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackTower.png`} alt="" />;
                } else if(i === 7 && (j === 0 || j === 7)){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhiteTower.png`} alt="" />;
                } else if(i === 0 && (j === 1 || j === 6)){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackKnight.png`} alt="" />;
                } else if(i === 7 && (j === 1 || j === 6)){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhiteKnight.png`} alt="" />;
                } else if(i === 0 && (j === 2 || j === 5)){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackBishop.png`} alt="" />;
                } else if(i === 7 && (j === 2 || j === 5    )){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhiteBishop.png`} alt="" />;
                } else if(i === 0 && j === 3){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackQueen.png`} alt="" />;
                } else if(i === 7 && j === 3){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhiteQueen.png`} alt="" />;
                } else if(i === 0 && j === 4){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/BlackKing.png`} alt="" />;
                } else if(i === 7 && j === 4){
                    newGrid[i][j] = <img src={`/my-react-router-app/ChessPieces/WhiteKing.png`} alt="" />;
                } else {
                    newGrid[i][j] = "";
                }
            }
        }
        setGrid(newGrid);
    }

    return(
        <div className="flex flex-col items-center justify-center h-full w-1/4">
            <div>
                <button className="m-2 p-1 bg-gray-500 rounded-lg" onClick={() => setGrid(Array.from({ length }, () => Array(width).fill("")))}>Clear</button>
                <button className="m-2 p-1 bg-gray-500 rounded-lg" onClick={handleReset}>Reset</button>
            </div>

            <div className="[&>*]:h-10 [&>*]:w-10 flex bg-gray-700 w-35 flex-wrap p-2 rounded-lg justify-center items-center">
                {/* White Pieces */}
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhiteKing"}))}}
                    src="/my-react-router-app/ChessPieces/WhiteKing.png" alt="White King" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhiteQueen"}))}}
                    src="/my-react-router-app/ChessPieces/WhiteQueen.png" alt="White Queen" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhiteTower"}))}}
                    src="/my-react-router-app/ChessPieces/WhiteTower.png" alt="White Tower" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhiteKnight"}))}}
                    src="/my-react-router-app/ChessPieces/WhiteKnight.png" alt="White Knight" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhiteBishop"}))}}
                    src="/my-react-router-app/ChessPieces/WhiteBishop.png" alt="White Bishop" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "WhitePawn"}))}}
                    src="/my-react-router-app/ChessPieces/WhitePawn.png" alt="White Pawn" 
                />

                {/* Black Pieces */}
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackKing"}))}}
                    src="/my-react-router-app/ChessPieces/BlackKing.png" alt="Black King" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackQueen"}))}}
                    src="/my-react-router-app/ChessPieces/BlackQueen.png" alt="Black Queen" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackTower"}))}}
                    src="/my-react-router-app/ChessPieces/BlackTower.png" alt="Black Tower" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackKnight"}))}}
                    src="/my-react-router-app/ChessPieces/BlackKnight.png" alt="Black Knight" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackBishop"}))}}
                    src="/my-react-router-app/ChessPieces/BlackBishop.png" alt="Black Bishop" 
                />
                <img 
                    draggable
                    onDragStart={(e)=>{e.dataTransfer.setData("text/plain", JSON.stringify({type: "token", value: "BlackPawn"}))}}
                    src="/my-react-router-app/ChessPieces/BlackPawn.png" alt="Black Pawn" 
                />
            </div>
        </div>
    )
}