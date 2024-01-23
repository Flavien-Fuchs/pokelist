/* eslint-disable react/prop-types */
import './Pokedex.css'
function Pokedex({ pokemon }) {

    return (
        <div className='pokedex'>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.other.showdown.front_default} />
            <img src={pokemon.sprites.other.showdown.front_shiny} />
            <p>Attaques</p>
            <ul>
                {pokemon.abilities.map((skill, key) => (
                    <li key={key}>{skill.ability.name}</li>
                ))}
            </ul>
            <p>Type</p>
            <ul>
                {pokemon.types.map((type, key) => (
                    <li key={key}>{type.type.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default Pokedex

