let pokemonRepository = (function () {
    let modalContainer = document.querySelector('#modal-container');
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
            let pokemonPromises = json.results.map(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                return pokemonRepository.loadDetails(pokemon).then(function () {
                    pokemonRepository.add(pokemon);
                    pokemonRepository.addListItem(pokemon); // Add list item after details are loaded
                });
            });
            return Promise.all(pokemonPromises); // Ensure all promises are resolved
        }).catch(function (e) {
            console.error(e);
        }).then(function () {
            hideLoadingMessage();
        });
    }

    function loadDetails(pokemon) {
        showLoadingMessage();

        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          pokemon.imageUrlFront = details.sprites.front_default;
          pokemon.imageUrlBack = details.sprites.back_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;

          // added array for types as there could be multiple
          pokemon.types = [];
          details.types.forEach(function(typeArray) {
            pokemon.types.push(typeArray.type.name)
          })

          pokemon.abilities = [];
          details.abilities.forEach(function(abilityArray) {
            pokemon.abilities.push(abilityArray.ability.name)
          })
        }).catch(function (e) {
          console.error(e);
        }).then(function() {
            hideLoadingMessage();
        });
    }

    // Removed to use bootstrap modal
    // function showModal(title, img, heightText, weightText, typeText, abilityText) {
    //     modalContainer.innerHTML = '';

    //     let modal = document.createElement('div')
    //     modal.classList.add('modal');

    //     let closeButtonElement = document.createElement('button');
    //     closeButtonElement.classList.add('modal-close');
    //     closeButtonElement.innerText = 'Close';
    //     closeButtonElement.addEventListener('click', hideModal);

    //     let pokemonName = document.createElement('h1');
    //     pokemonName.innerText = title;

    //     let pokemonImg = document.createElement('img');
    //     pokemonImg.src = img;

    //     let pokemonHeight = document.createElement('p');
    //     pokemonHeight.innerText = heightText;

    //     let pokemonWeight = document.createElement('p');
    //     pokemonWeight.innerText = weightText;

    //     let pokemonType = document.createElement('p');
    //     pokemonType.innerText = typeText;

    //     let pokemonAbilities = document.createElement('p');
    //     pokemonAbilities.innerText = abilityText;

    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(pokemonName);
    //     modal.appendChild(pokemonImg);
    //     modal.appendChild(pokemonHeight);
    //     modal.appendChild(pokemonWeight);
    //     modal.appendChild(pokemonType);
    //     modal.appendChild(pokemonAbilities);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add('is-visible')

    //     modalContainer.addEventListener('click', (e) => {
    //         let target = e.target;
    //         if (target === modalContainer) {
    //             hideModal();
    //         }
    //     });
    // }

    // function hideModal() {
    //     modalContainer.classList.remove('is-visible');
    // }
    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listItemPokemon = document.createElement("li");
        listItemPokemon.classList.add("list-group-item");

        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add('img');
        pokemonImage.src = pokemon.imageUrlFront;
        pokemonImage.alt = "Image of " + pokemon.name;

        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.classList.add("btn");
        button.setAttribute('data-toggle', 'modal');
        // removed bc added function instead
        // button.addEventListener('click', function() {
        //     showDetails(pokemon);
        // });
        listItemPokemon.appendChild(pokemonImage);
        listItemPokemon.appendChild(button);
        pokemonList.appendChild(listItemPokemon);
        addEventListenerToButton(button, pokemon);
    }

    function showDetails(pokemon){
        pokemonRepository.loadDetails(pokemon).then(function () {
            //removed to add bootstrap modal

            // showModal(
            //   pokemon.name,
            //   pokemon.imageUrl,
            //   "Height: " + pokemon.height,
            //   "weight: " + pokemon.weight,

            //   //added .join to add spaces to array
            //   "Types: " + pokemon.types.join(', '),
            //   "Abilities: " + pokemon.abilities.join(', '),
            // );
            let modalTitle = document.querySelector('#pokemonModalLabel');
            let modalImageFront = document.querySelector('.pokemon-image-front');
            let modalImageBack = document.querySelector('.pokemon-image-back');
            let modalHeight = document.querySelector('.pokemon-height');
            let modalWeight = document.querySelector('.pokemon-weight');
            let modalTypes = document.querySelector('.pokemon-types');
            let modalAbilities = document.querySelector('.pokemon-abilities');

            modalTitle.innerText = pokemon.name;
            modalImageFront.src = pokemon.imageUrlFront;
            modalImageBack.src = pokemon.imageUrlBack;
            modalHeight.innerText = "Height: " + pokemon.height;
            modalWeight.innerText = "Weight: " + pokemon.weight;
            modalTypes.innerText = "Types: " + pokemon.types.join(', ');
            modalAbilities.innerText = "Abilities: " + pokemon.abilities.join(', ');

            $('#pokemonModal').modal('show');
          });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
    
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



