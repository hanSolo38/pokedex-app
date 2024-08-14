let pokemonList = [
    {name: "bulbasaur", 
        type: ["grass", "poison"], 
        height: 7, 
        abilities: ["chlorophyll", "overgrow"]},
    {name: "charmander", 
        type: "fire", 
        height: 6, 
        abilities: ["blaze", "solarPower"]},
    {name: "squirtle", 
        type: "water", 
        height: 5, 
        abilities: ["rainDish", "torrent"]},
    {name: "pikachu", 
        type: "electric", 
        height: 4, 
        abilities: ["static", "lightningrod"]}
];

//loop to grab name and height of pokemonList array. separated name and height to bold name and italicize height
//added <br> to move each to a separate line

for (let i=0; i < pokemonList.length; i++){
    document.write("<br><b>" + pokemonList[i].name + "</b>");
    document.write("<i> (height:" + pokemonList[i].height + ") </i>");

    if (pokemonList[i].height > 6) {
        document.write("<b> Wow, that's a big Pokemon! </b>");
    } 
}