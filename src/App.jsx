import { useEffect, useState } from 'react'
import Card from './components/card';
import './styles/App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchPokemons = async ()=> {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        )
        setPokemons(pokemonDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  console.log(pokemons);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error:{error} </p>}
      <div className="card-grid">
        {pokemons.map((poke) => (
          <Card
            key={poke.id}
            name={poke.name}
            image={poke.sprites.other["official-artwork"].front_default}
          />
        ))}
      </div>
    </>
  )
}

export default App
