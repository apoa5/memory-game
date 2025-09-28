import { useEffect, useState } from 'react'
import Card from './components/card';
import './styles/App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemons, setClickedPokemons] = useState([]);

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

  const handleClick = (pokemon)=> {
    console.log(`${pokemon.name} has been clicked`)
    
    if (clickedPokemons.includes(pokemon.name)){
      console.log("You lose, you picked this card twice");
      setBestScore((prevBest)=> Math.max(prevBest, currentScore));
      setCurrentScore(0);
      setClickedPokemons([]);
    } else {
      setClickedPokemons((prev)=> [...prev, pokemon.name]);
      setCurrentScore((c)=> c+1);
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error:{error} </p>}
      <div className="header">
        <h1 style={{padding: "20px"}}>Memory Game</h1>
        <h2 style={{padding: "20px"}}>Current Score : {currentScore}</h2>
        <h2 style={{padding: "20px"}}>Best Score : {bestScore}</h2>
      </div>
      <div className="card-grid">
        {pokemons.map((poke) => (
          <Card
            key={poke.id}
            name={poke.name}
            image={poke.sprites.other["official-artwork"].front_default}
            onClick={()=>handleClick(poke)}
          />
        ))}
      </div>
    </>
  )
}

export default App
