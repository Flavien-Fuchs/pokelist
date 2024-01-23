import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import PokeCard from './components/PokeCard';
import Pokedex from './components/pokedex';

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appelAPI()
  }, [url])

  const appelAPI = () => {
    setLoading(true);

    axios
      .get(url)
      .then(res => {
        appelPkmnAPI(res.data.results)
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);
        setLoading(false);
      })
      .catch((err) => {
        throw new Error('Erreur de chargement de la liste : ', err);
      })
  }

  const appelPkmnAPI = (pokemonList) => {
    const promises = pokemonList.map((pokemon) => {
      return axios.get(pokemon.url)
        .catch((err) => {
          throw new Error(`Erreur de chargement du pokemon ${pokemon.name} : `, err);
        })
    })
    Promise.all(promises)
      .then(result => {
        setPokeData(result)
      })
  }


  const handleClick = (id) => {
    console.log(pokeData)
    setPokemon(pokeData.filter((pokemon) => pokemon.data.id === id)[0])
  }

  const handlePrevious = () => {
    setUrl(prevUrl)
  }

  const handleNext = () => {
    setUrl(nextUrl)
  }

  return (
    <div className="container">
      <div className="button">
        {prevUrl && <button onClick={handlePrevious}>Précedant</button>}
        {nextUrl && <button onClick={handleNext}>Suivant</button>}
      </div>
      <div className="left-container">

        {loading ? (<h1>Chargement en cours...</h1>) : (pokeData.map((pokemon, index) => (
          <PokeCard key={index} name={pokemon.data.name} id={pokemon.data.id} image={pokemon.data.sprites.other.showdown.front_shiny} handleClick={handleClick} />
        )))}
      </div>
      <div className="right-container">
        {pokemon && <Pokedex pokemon={pokemon.data} />}
      </div>
    </div>
  )
}

export default App
