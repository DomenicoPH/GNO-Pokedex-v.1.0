import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName, getPokemons } from "../../redux/actions/actions";
import style from "./SearchBar.module.css";
import dex from "../../assets/dex2.png"
import pokeball from "../../assets/pokeball.png"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre) {
      return setError("Ingrese un nombre válido");
    } else {
      dispatch(getPokemonName(nombre));
      setNombre("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleChange = (event) => {
    event.preventDefault();
    setNombre(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setNombre("");
    dispatch(getPokemons());
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <img src={pokeball} alt="pokeball" className={style.pokeball} />
        <input
          type="text"
          placeholder="Pokemon"
          value={nombre}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={style.input}
        />

        <button className={style.boton} type="submit" onClick={handleSubmit}>
          <p>BUSCAR</p>
        </button>

        {/*<button className={style.boton} onClick={handleClear}>
            <img src={dex} alt="pokedex" className={style.dex} />
        </button>*/}

      </div>
    </div>
  );
};

export default SearchBar;
