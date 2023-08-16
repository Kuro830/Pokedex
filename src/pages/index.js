/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, Fragment } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "./api/pokeApi";
import { getImageURL } from "@Pokedex/helpers/pokemonUtils";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Layout from "@Pokedex/components/Layout";
import Link from "next/link";

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name"); // Default sorting by name
    const [filteredAndSortedPokemonList, setFilteredAndSortedPokemonList] = useState([]);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [pokemonDetail, setPokemonDetail] = useState(null);

    const router = useRouter();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSelectPokemon = (pokemon) => {
        if (selectedPokemon.includes(pokemon)) {
            setSelectedPokemon(
                selectedPokemon.filter((selected) => selected !== pokemon)
            );
        } else {
            setSelectedPokemon([...selectedPokemon, pokemon]);
        }
    };

    const openModalCompare = () => {
        toggleModal();
    };

    const startCompare = () => {
        router.push({
            pathname: "/compare",
            query: {
                pokemon: selectedPokemon.map((pokemon) => pokemon.name).join(","),
            },
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const sortPokemonList = (list, sortBy, sortDirection) => {
        return [...list].sort((a, b) => {
            if (sortDirection === "ascending") {
                if (sortBy === "name") {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === "id") {
                    return a.id - b.id;
                }
            } else if (sortDirection === "descending") {
                if (sortBy === "name") {
                    return b.name.localeCompare(a.name);
                } else if (sortBy === "id") {
                    return b.id - a.id;
                }
            }
            return 0;
        });
    };

    useEffect(() => {
        async function fetchData() {
            const { list, totalPages } = await fetchPokemonList(currentPage);
            setPokemonList(list);
            setTotalPages(totalPages);
        }
        fetchData();
    }, [currentPage, searchTerm]);

    useEffect(() => {
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sortedAndFilteredList = sortPokemonList(
            filteredList,
            sortBy,
            sortDirection
        );
        setFilteredAndSortedPokemonList(sortedAndFilteredList);
    }, [pokemonList, searchTerm, sortBy, sortDirection]);
     
    const renderPagination = () => {
        const maxDisplayedPages = 4; // Jumlah maksimal halaman yang ditampilkan
        const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);

        let startPage = currentPage - halfMaxDisplayedPages;
        if (startPage < 1) {
            startPage = 1;
        }
        const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`mx-2 px-4 py-2 rounded-md ${
                        i === currentPage
                            ? "bg-red-500 text-white"
                            : "bg-white text-blue-500 hover:bg-gray-200"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <Layout>
            <div className="p-8">
                <h1 className="text-3xl font-semibold mb-4">Catalog Pokedex</h1>
                <div className="flex items-center justify-between mb-4">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search Pokemon"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <button
                            onClick={openModalCompare}
                            disabled={selectedPokemon.length < 2}
                            className={`mx-2 px-4 py-2 rounded-md ${
                                selectedPokemon.length < 2
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                        >
                            Compare
                        </button>
                        <select
                            value={`${sortBy}-${sortDirection}`}
                            onChange={(e) => {
                                const value = e.target.value;
                                const [newSortBy, newSortDirection] = value.split("-");
                                setSortBy(newSortBy);
                                setSortDirection(newSortDirection);
                            }}
                            className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="name-ascending">Name (Ascending)</option>
                            <option value="name-descending">Name (Descending)</option>
                        </select>
                    </div>
                </div>
                <Transition.Root show={isModalOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed z-10 inset-0 overflow-y-auto"
                        onClose={toggleModal}
                    >
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="relative bg-white rounded-lg w-96 p-6">
                                    {/* Isi modal */}
                                    <h2 className="text-2xl font-semibold mb-2">
                                        Compare Pokemon
                                    </h2>
                                    <ul className="space-y-2">
                                        {selectedPokemon.map((pokemon) => (
                                            <li key={pokemon.name}>{pokemon.name}</li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={startCompare}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Compare Now
                                    </button>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                <div className="grid grid-cols-5 gap-4">
                    {filteredAndSortedPokemonList.map((pokemon, index) => {
                        // Mendapatkan angka dari URL
                        const parts = pokemon.url.split("/");
                        const pokemonId = parseInt(parts[parts.length - 2]);

                        return (
                            <div
                                key={pokemon.name}
                                className="relative bg-white rounded-md shadow-md p-4 flex flex-col justify-between"
                            >
                                <Link href={`/detail/${pokemon.name}`} passHref>
                                    <div className="cursor-pointer">
                                        <img
                                            src={getImageURL(pokemonId)}
                                            alt={pokemon.name}
                                            className="mx-auto h-32"
                                        />
                                    </div>
                                </Link>
                                <div className="text-center mt-2 font-medium">
                                    {pokemon.name}
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleSelectPokemon(pokemon)}
                                        className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                                    >
                                        {selectedPokemon.includes(pokemon)
                                            ? "Remove Compare"
                                            : "Add to Compare"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mx-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        {"<"}
                    </button>
                    {renderPagination()}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="mx-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </Layout>
    );
}
