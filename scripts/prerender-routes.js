const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonIds.map(id => `/pokemons/${id}`).join('\n')


  for (let index = 1; index <= TOTAL_PAGES; index++) {
    fileContent += `\n/pokemons/page/${index}`
  }

  const pokemonNamesList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

  fileContent += '\n';
  fileContent += pokemonNamesList.results.map((pokemons) => `/pokemons/${pokemons.name}`).join('\n');

  fs.writeFileSync('routes.txt', fileContent)

  console.log("routes.txt created");
})();
