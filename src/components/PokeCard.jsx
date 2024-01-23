/* eslint-disable react/prop-types */
import './PokeCard.css'

function PokeCard({ name, id, image, handleClick }) {

    return (
        <div className="pokemon-card" onClick={() => handleClick(id)} >
            <div className="titlename">
                <h3>{id}</h3>
                <h3>{name}</h3>
            </div>
            <img className="pokemon-img" src={image} alt={`image du pokemon ${name}`} />
        </div>
    )

}

export default PokeCard