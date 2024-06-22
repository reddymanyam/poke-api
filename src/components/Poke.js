import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PokeApp.css";

const PokeApp = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
            const results = response.data.results;
            const detailedPokemons = await Promise.all(results.map(async (pokemon) => {
                const pokemonData = await axios.get(pokemon.url);
                return pokemonData.data;
            }));
            setPokemons(detailedPokemons);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="poke-app">
            <h1>Pokémon List</h1>
            <input
                type="text"
                placeholder="Search Pokémon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="poke-container">
                {filteredPokemons.map(pokemon => (
                    <div className="poke-card" key={pokemon.id}>
                        <img src={pokemon.url} alt={pokemon.name} />
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokeApp;
