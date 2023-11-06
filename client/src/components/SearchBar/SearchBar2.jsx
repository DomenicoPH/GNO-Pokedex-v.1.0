import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonName, getPokemons, getTypes } from "../../redux/actions/actions";
import style from "./SearchBar.module.css";
import pokeball from "../../assets/pokeball.png";
import Select from "react-select";

const SearchBar = ({ resetPage }) => {
  const dispatch = useDispatch();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchError, setSearchError] = useState(false);

  // Utiliza el estado pokemonsOrigin del estado de Redux para almacenar todos los Pokémon
  const pokemons = useSelector((state) => state.pokemonsOrigin);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const pokemonOptions = pokemons.map((pokemon) => ({
    value: pokemon.Nombre,
    label: pokemon.Nombre,
  }));

  const handleChange = (selectedOption) => {
    setSelectedPokemon(selectedOption);
  };

  const handleSubmit = () => {
    if (!selectedPokemon) {
      // Si no se ha seleccionado un Pokémon, mostrar una alerta
      alert("Por favor, selecciona un Pokémon antes de buscar.");
      return;
    }

    const pokemonName = selectedPokemon.value;
    
    // Verificar si el nombre del Pokémon existe en tu API o base de datos
    const pokemonExists = pokemons.some(pokemon => pokemon.Nombre === pokemonName);

    if (pokemonExists) {
      // Disparar una acción para obtener detalles del Pokémon seleccionado
      dispatch(getPokemonName(pokemonName))
        .then(() => {
          resetPage();
          setSearchError(false); // Si la búsqueda tiene éxito, reiniciamos el estado de error
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Mostrar una alerta si el Pokémon no se encuentra en la lista
      setSearchError(true);
    }
  };

  // Custon styles (para los Select)
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "black", // Fondo negro
      minWidth: "200px",
      border: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgb(50, 105, 178)" : "black", // Fondo amarillo cuando la opción está enfocada
      color: "rgb(255, 203, 5)", // Letras amarillas
      padding: "10px",
      border: "none",
      marginTop: "-4px",
      marginBottom: "-4px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(255, 203, 5)", // Letras amarillas
    }),
    input: (provided) => ({
      ...provided,
      color: "rgb(255, 203, 5)", // Cambia aquí el color del texto de entrada (amarillo en este caso)
    }),
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        {/* React-Select */}
        <Select
          options={pokemonOptions}
          onChange={handleChange}
          value={selectedPokemon}
          placeholder="Selecciona o escribe el nombre de un Pokémon"
          styles={customStyles}
          isSearchable // Habilita la búsqueda
        />

        <button onClick={handleSubmit} className={style.boton}>
          <img src={pokeball} alt="pokeball" className={style.pokeball} />
        </button>
      </div>
      {searchError && <p className={style.error}>El Pokémon que buscas no existe.</p>}
    </div>
  );
};

export default SearchBar;
