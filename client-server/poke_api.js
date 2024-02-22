const getPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();

    const pokemonNames = data.results.map(pokemon => pokemon.name);

    const pokemonsContainer = document.createElement("div");
    pokemonsContainer.className = "pokemons";

    const pokemonsList = document.createElement("ul");

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const abilities = pokemonData.abilities.map(ability => ability.ability.name);

      const abilitiesList = document.createElement("ul");

      abilities.forEach(ability => {
        const abilityItem = document.createElement("li");
        abilityItem.textContent = ability;
        abilitiesList.appendChild(abilityItem);
      });

      const pokemonListItem = document.createElement("li");
      pokemonListItem.textContent = pokemon.name;

      const pokemonImg = document.createElement("img");
      // Utilizamos una imagen de mayor calidad
      pokemonImg.src = pokemonData.sprites.other["official-artwork"].front_default;

      pokemonListItem.appendChild(abilitiesList);
      pokemonListItem.appendChild(pokemonImg);

      pokemonsList.appendChild(pokemonListItem);
    }

    pokemonsContainer.appendChild(pokemonsList);
    document.getElementById("pokemons").appendChild(pokemonsContainer);
  } catch (error) {
    console.error(error);
  }
};

getPokemons();
