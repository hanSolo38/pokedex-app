let pokemonRepository = (function () {
    
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
    ]

    function getAll () {
        return pokemonList;
    }

    // function add (pokemon) {
    //     pokemonList.push(pokemon);
    // }

    // This is from the bonus task for a conditional in the add funtion. Is this correct?
    function add (pokemon) {
        if (typeof pokemon === 'object'){
            pokemonList.push(pokemon)
        }
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        // removed bc added function instead
        // button.addEventListener('click', function() {
        //     showDetails(pokemon);
        // });
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        addEventListenerToButton(button, pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

// replaced to use forEach
//loop to grab name and height of pokemonList array. separated name and height to bold name and italicize height
//added <br> to move each to a separate line
// for (let i=0; i < pokemonList.length; i++){
//     document.write("<br><b>" + pokemonList[i].name + "</b>");
//     document.write("<i> (height:" + pokemonList[i].height + ") </i>");

//     if (pokemonList[i].height > 6) {
//         document.write("<b> Wow, that's a big Pokemon! </b>");
//     } 
// }

// removed to use addListItem function created in pokemonRepository
//function myLoopFunction(pokemon) {

    // document.write("<br><b>" + pokemon.name + "</b>");
    // document.write("<i> (height:" + pokemon.height + ") </i>");
    // if (pokemon.height > 6) {
    //     document.write("<b> Wow, that's a big Pokemon! </b>");
    // }
//}

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
});
