/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Layout from "@Pokedex/components/Layout";
import { fetchPokemonDetails } from "@Pokedex/pages/api/pokeApi";

export default function Compare() {
    const router = useRouter();
    const selectedPokemonCompare = router.query.pokemon;
    const selectedPokemonArray = selectedPokemonCompare.split(",");

    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State untuk menunjukkan apakah data sedang dimuat

    useEffect(() => {
        async function fetchDetails() {
            const details = await Promise.all(
                selectedPokemonArray.map((pokemonName) =>
                    fetchPokemonDetails(pokemonName)
                )
            );
            setPokemonDetails(details);
            setIsLoading(false);
        }
        fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("pokemon", pokemonDetails);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <Layout>
            <div classNameName="p-8">
                <div className="flex flex-col overflow-x-auto">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <th scope="col" className="px-6 py-4">
                                                {''}
                                            </th>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <th className="px-6 py-4" key={pokemonDetail.id}>
                                                    <img
                                                        src={pokemonDetail.sprites.front_default}
                                                        alt={pokemonDetail.name}
                                                        classNameName="mx-auto h-32"
                                                    />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                Name
                                            </td>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <td
                                                    key={pokemonDetail.id}
                                                    classNameName="p-2 text-center font-medium"
                                                >
                                                    {pokemonDetail.name}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                Type
                                            </td>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <td
                                                    key={pokemonDetail.id}
                                                    classNameName="p-2 text-center font-medium"
                                                >
                                                    {pokemonDetail.types
                                                        ?.map((type) => type.type.name)
                                                        .join(", ")}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                Height
                                            </td>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <td
                                                    key={pokemonDetail.id}
                                                    classNameName="p-2 text-center font-medium"
                                                >
                                                    {pokemonDetail.height}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                Weight
                                            </td>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <td
                                                    key={pokemonDetail.id}
                                                    classNameName="p-2 text-center font-medium"
                                                >
                                                    {pokemonDetail.weight}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="bg-white border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                Abilities
                                            </td>
                                            {pokemonDetails.map((pokemonDetail) => (
                                                <td
                                                    key={pokemonDetail.id}
                                                    classNameName="p-2 text-center font-medium"
                                                >
                                                    {pokemonDetail.abilities
                                                        ?.map((ability) => ability.ability.name)
                                                        .join(", ")}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
