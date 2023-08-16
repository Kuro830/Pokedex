/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchPokemonDetails } from "@Pokedex/pages/api/pokeApi";
import { getImageURL } from "@Pokedex/helpers/pokemonUtils";
import Layout from '@Pokedex/components/Layout'

export default function Detail() {
    const router = useRouter();
    const { name } = router.query;
    const [pokemonDetail, setPokemonDetail] = useState(null);
    console.log('ini name di detail', name);
    useEffect(() => {
        async function fetchDetail() {
            const detail = await fetchPokemonDetails(name);
            setPokemonDetail(detail);
        }
        if (name) {
            fetchDetail();
        }
    }, [name]);

    if (!pokemonDetail) {
        return <div>Loading...</div>;
    }

    const { id, types, height, weight, abilities } = pokemonDetail;

    return (
        <Layout>
            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <img
                                src={getImageURL(id)}
                                alt={pokemonDetail.name}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold mb-4">
                                {pokemonDetail.name}
                            </h1>
                            <p className="text-gray-600 mb-2">ID: {id}</p>
                            <p className="text-gray-600 mb-2">
                                Types: {types.map((type) => type.type.name).join(", ")}
                            </p>
                            <p className="text-gray-600 mb-2">
                                Height: {height} decimetres
                            </p>
                            <p className="text-gray-600 mb-2">
                                Weight: {weight} hectograms
                            </p>
                            <p className="text-gray-600 mb-2">
                                Abilities:{" "}
                                {abilities.map((ability) => ability.ability.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
