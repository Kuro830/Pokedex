const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (page) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
    );
    const data = await response.json();

    const list = data.results.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url,
    }));

    const totalPages = Math.ceil(data.count / 20);

    return { list, totalPages };
};

export async function fetchPokemonDetails(name) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        return null;
    }
}
