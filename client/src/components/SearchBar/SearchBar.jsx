import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonName, getPokemons, getTypes } from "../../redux/actions/actions";
import style from "./SearchBar.module.css";
import pokeball from "../../assets/pokeball.png";

const SearchBar = ({ resetPage }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [foundPokemon, setFoundPokemon] = useState(null);

  const pokemons = useSelector((state) => state.pokemonsOrigin);
  //console.log(pokemons)

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
    setFoundPokemon(null); // Reiniciar el Pokémon encontrado al cambiar el texto
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const found = pokemons.find((pokemon) => pokemon.Nombre === searchText);
    if (found) {
      try {
        await dispatch(getPokemonName(searchText));
        resetPage();
        setFoundPokemon('');
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setFoundPokemon("Pokemon no encontrado");
    }
  };
  

  return (
    <div className={style.container}>
      
      <div className={style.content}>

        {/* Campo de texto para la búsqueda */}
        <input
          type="text"
          placeholder="Busca un Pokémon ..."
          className={style.input}
          onChange={handleChange}
          onKeyPress={handleKeyPress} // busqueda con "Enter"
          value={searchText}
        />

        <button onClick={handleSubmit} className={style.boton}>
          <img src={pokeball} alt="pokeball" className={style.pokeball} />
        </button>

      </div>

        <p className={foundPokemon ? style.foundPokemon : style.notFoundPokemon}>
          {foundPokemon}
        </p>

    </div>
  );
};

export default SearchBar;
