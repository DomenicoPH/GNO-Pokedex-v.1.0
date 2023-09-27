import React from "react";
import style from "./Pokemon.module.css";
import { Link } from "react-router-dom";
import PokeList from "../PokeList/PokeList";
import pokebola from "../../assets/pbspin.gif"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions/actions";
//types x 19
import unknown from "../../assets/types/unknown.svg"
import steel from "../../assets/types/steel.svg"
import water from "../../assets/types/water.svg"
import bug from "../../assets/types/bug.svg"
import dragon from "../../assets/types/dragon.svg"
import electric from "../../assets/types/electric.svg"
import ghost from "../../assets/types/ghost.svg"
import fire from "../../assets/types/fire.svg"
import fairy from "../../assets/types/fairy.svg"
import ice from "../../assets/types/ice.svg"
import fighting from "../../assets/types/fighting.svg"
import normal from "../../assets/types/normal.svg"
import grass from "../../assets/types/grass.svg"
import psychic from "../../assets/types/psychic.svg"
import rock from "../../assets/types/rock.svg"
import dark from "../../assets/types/dark.svg"
import ground from "../../assets/types/ground.svg"
import poison from "../../assets/types/poison.svg"
import flying from "../../assets/types/flying.svg"

const getImageByType = (type) => {
  const typeImages = {
    unknown,
    steel,
    water,
    bug,
    dragon,
    electric,
    ghost,
    fire,
    fairy, 
    ice,
    fighting,
    normal,
    grass,
    psychic,
    rock,
    dark,
    ground,
    poison,
    flying
  };

  return typeImages[type.toLowerCase()];
};

const Pokemon = ({ pokemons }) => {

  const allPokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  //loading... state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(getPokemons())
        .then(() => {
          setLoading(false);
        });
    }
  }, [dispatch, allPokemons.length]);

  if (loading) {
    return <div className={style.cargando}>
      <img src={pokebola} alt="pokebola" />
      <p>POKEDEX: CARGANDO...</p>
    </div>
  }

  if (pokemons.length > 1) {
  return (
    <div className={style.container}>
      
      <PokeList pokemons={allPokemons}/>

      <div className={style.grid}>

        {pokemons.map((pokemon) => (
          <div className={style.card} key={pokemon.Nombre}>

            <h3 className={style.name}>{pokemon.Nombre}</h3>

            <Link to={`/detail/${pokemon.ID}`}>
              <img
                className={style.image}
                src={pokemon.Imagen}
                alt={pokemon.Nombre}
              />
            </Link>

            <h4 className={style.types}>
              {/*console.log("pokemon",pokemon)*/}
              {/*console.log("pokemons",pokemons)*/}
              {/*console.log("allPokemons",allPokemons)*/}
              <span>{typeof pokemon.ID === "string"
              ?(<span>{pokemon.types?.map((type) => (
                <img
                  className={style.PokemonTypeImage}
                  src={getImageByType(type.Nombre)}
                  alt={type.Nombre}
                  key={type.Nombre}
                />
              ))}</span>)
              :<span>{pokemon.Tipo?.map((type) => (
                <img
                  className={style.PokemonTypeImage}
                  src={getImageByType(type)}
                  alt={type}
                  key={type}
                />
              ))}</span>}</span>
            </h4>

            <h3 className={style.id}>
              <span>{typeof pokemon.ID === "number"
              ?(<span>{pokemon.ID}</span>)
              :<span></span>
              }</span>
            </h3>

          </div>
        ))}
    </div>

    </div>
  );
} else {
  return (
    <div className={style.container}>

      <div className={style.grid}>

        {pokemons.map((pokemon) => (
          <div className={style.card} key={pokemon.Nombre}>

            <h3 className={style.name}>{pokemon.Nombre}</h3>

            <Link to={`/detail/${pokemon.ID}`}>
              <img
                className={style.image}
                src={pokemon.Imagen}
                alt={pokemon.Nombre}
              />
            </Link>

            <h4 className={style.types}>
              {pokemon.Tipo?.map((type) => (
                <img
                  className={style.PokemonTypeImage}
                  src={getImageByType(type)}
                  alt={type}
                  key={type}
                />
              ))}
            </h4>

            <h3 className={style.id}>{pokemon.ID}</h3>

          </div>
        ))}
    </div>

    </div>
  );
}
};

export default Pokemon;
