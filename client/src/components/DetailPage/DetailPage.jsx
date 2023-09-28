import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonsId } from "../../redux/actions/actions";
import style from "./DetailPage.module.css";
import Loading from "../Loading/Loading";
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

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.id);
  
  // Loading... state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getPokemonsId(id))
      .then(() => {
        setLoading(false); // Cuando la carga se completa, establece loading en false
      });
  }, [dispatch, id]);

  // Cargando pokedex
  if (loading) {
    return <Loading />;
  }


  return (
    <div className={style.container}>

      {pokemon && pokemon.idPokemonApi && (

        <div className={style.containerPokemon}>

          <h1 className={style.id}>{pokemon.idPokemonApi.ID} {" "} {pokemon.idPokemonApi.Nombre}</h1>

          <img src={pokemon.idPokemonApi.Imagen} alt={pokemon.idPokemonApi.Nombre} className={style.image}/>
          
          <div className={style.types}>

            {pokemon.idPokemonApi.Tipo.map((type) => (
              <img
              className={style.typeIcon}
              src={getImageByType(type)}
              alt={type}
              key={type}
            />
            ))}

          </div>

          <div className={style.props}>

            <div className={style.prop}>
              <p>ATAQUE: {pokemon.idPokemonApi.Ataque}</p>
              <p>DEFENSA: {pokemon.idPokemonApi.Defensa}</p>
            </div>

            <div className={style.prop}>
              <p>VELOCIDAD: {pokemon.idPokemonApi.Velocidad}</p>
              <p>HP: {pokemon.idPokemonApi.Vida}</p>
            </div>

            <div className={style.prop}>
              <p>ALTURA: {pokemon.idPokemonApi.Altura} M</p>
              <p>PESO: {pokemon.idPokemonApi.Peso} KG</p>
            </div>

          </div>
        </div>
      )}

      {pokemon && pokemon.idPokemonDB && (

        <div className={style.containerPokemon}>

            <h4 className={style.hide}>{pokemon.idPokemonDB.ID}</h4>
            <h1 className={style.id}>{pokemon.idPokemonDB.Nombre}</h1>
          
          <img src={pokemon.idPokemonDB.Imagen} alt={pokemon.idPokemonDB.Nombre} className={style.image}/>

          <h3 className={style.types}>
            {pokemon.idPokemonDB.types.map((type) => (
              <img
              className={style.typeIcon}
              src={getImageByType(type.Nombre)}
              alt={type.Nombre}
              key={type.Nombre}
            />
            ))}
          </h3>

          <div className={style.props}>

            <div className={style.prop}>
              <p>Ataque: {pokemon.idPokemonDB.Ataque}</p>
              <p>Defensa: {pokemon.idPokemonDB.Defensa}</p>
            </div>

            <div className={style.prop}>
              <p>Velocidad: {pokemon.idPokemonDB.Velocidad}</p>
              <p>Vida: {pokemon.idPokemonDB.Vida}</p>
            </div>

            <div className={style.prop}>
              <p>Altura: {pokemon.idPokemonDB.Altura} M</p>
              <p>Peso: {pokemon.idPokemonDB.Peso} KG</p>
            </div>

          </div>

        </div>
      )}

      <div>
        <a href= "/home"> <button className={style.goback}>VOLVER</button> </a>
      </div>

    </div>
  );
};

export default DetailPage;