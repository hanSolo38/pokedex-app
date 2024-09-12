let pokemonRepository = (function () {
    
    let pokemonList = [];
    // removed to use pokemon API
    //     {name: "bulbasaur", 
    //         type: ["grass", "poison"], 
    //         height: 7, 
    //         abilities: ["chlorophyll", "overgrow"]},
    //     {name: "charmander", 
    //         type: "fire", 
    //         height: 6, 
    //         abilities: ["blaze", "solarPower"]},
    //     {name: "squirtle", 
    //         type: "water", 
    //         height: 5, 
    //         abilities: ["rainDish", "torrent"]},
    //     {name: "pikachu", 
    //         type: "electric", 
    //         height: 4, 
    //         abilities: ["static", "lightningrod"]}
    // ]
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll () {
        return pokemonList;
    }

    // function add (pokemon) {
    //     pokemonList.push(pokemon);
    // }

    // This is from the bonus task for a conditional in the add funtion. Is this correct?
    function add (pokemon) {
        if (
            typeof pokemon === 'object' &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
            // "type" in pokemon && 
            // "height" in pokemon &&
            // "abilities" in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            console.log("Incorrect Pokemon");
        }
    }

    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listItemPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        // removed bc added function instead
        // button.addEventListener('click', function() {
        //     showDetails(pokemon);
        // });
        listItemPokemon.appendChild(button);
        pokemonList.appendChild(listItemPokemon);
        addEventListenerToButton(button, pokemon);
    }

    function showLoadingMessage() {
    document.getElementById('loading-message').style.display = 'block';
    }

    function hideLoadingMessage() {
    document.getElementById('loading-message').style.display = 'none';
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
//added this but could have used finally as well
        }).then(function() {
            hideLoadingMessage();
        });
    }

    function loadDetails(item) {
        showLoadingMessage();

        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        }).then(function() {
            hideLoadingMessage();
        });
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
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

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
