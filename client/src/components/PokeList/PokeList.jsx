import React from "react";
import style from "./PokeList.module.css";

const PokeList = ({pokemons}) => {
    return(
        <div className={style.list}>
            {/*<p className={style.names}>Id Nombres</p>*/}
          {pokemons.map((pokemon) => (
            
              <h3 key={pokemon.ID} className={style.name}>{pokemon.ID} {pokemon.Nombre}</h3>

          ))}
        </div>
    )
}

export default PokeList;