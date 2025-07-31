import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home () {

    const [ page, setPage ] = useState(0);
    const offset = page * 20;

    const fetchPokemon = async (offset) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        return response.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['pokemon', offset],
        queryFn: () => fetchPokemon(offset),
    });

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-5">
            <ul className="grid grid-cols-3 text-blue-700 text-center gap-x-15 gap-y-3 underline">
                {data.results.map((pokemon) => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="flex gap-30">
                <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0} 
                className="px-4 py-2 bg-blue-700 text-white rounded"    
                >Previous</button>
                <span>
                    Page {page + 1}
                </span>
                <button onClick={() => setPage((p) => p + 1)} disabled={!data.next}
                className="px-4 py-2 bg-blue-700 text-white rounded" 
                >Next</button>
            </div>
        </div>
    )
}