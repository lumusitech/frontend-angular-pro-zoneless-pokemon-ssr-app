//? script for generate routes.txt with routes to prerender

const fs = require("fs");

const TOTAL_POKEMONS = 5;
const TOTAL_PAGES = 5;

(async () => {
  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pokemonsPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  // pokemons by id
  let fileContent = pokemonsIds.map((id) => `/pokemons/${id}`).join("\n");
  fileContent += "\n";

  // pokemons by name
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  );
  const { results } = await resp.json();

  fileContent += results.map(({ name }) => `/pokemons/${name}`).join("\n");

  // pokemons by page
  fileContent += "\n";
  fileContent += pokemonsPages
    .map((page) => `/pokemons/pages/${page}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  console.log("routes.txt generated");
})();
