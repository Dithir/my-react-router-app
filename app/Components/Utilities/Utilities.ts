

export default function normalizeMovesGames(list:Array<string>){
    let newString = []
    list.forEach((element:string) => {
        if(element === "heartgold-soulsilver"){
            newString.push("heartgold")
            newString.push("soulsilver")
        }else if(element === "black-white"){
            newString.push("black")
            newString.push("white")
        }else if(element === "black-2-white-2"){
            newString.push("black-2")
            newString.push("white-2")
        }else if(element === "omega-ruby-alpha-sapphire"){
            newString.push("omega-ruby")
            newString.push("alpha-sapphire")
        }else if(element === "ultra-sun-ultra-moon"){
            newString.push("ultra-sun")
            newString.push("ultra-moon")
        }else if(element === "brilliant-diamond-shining-pearl"){
            newString.push("brilliant-diamond")
            newString.push("shining-pearl")}
        else if(element === "sword-shield"){
            newString.push("sword")
            newString.push("shield")}
    return newString

})}