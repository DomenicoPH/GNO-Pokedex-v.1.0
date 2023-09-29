import style from "./OrderFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon,orderPokemons,filterByTypes } from "../../redux/actions/actions";
import { useState } from "react";
import { getTypes } from "../../redux/actions/actions";
import { useEffect } from "react";

// Importa las imágenes de tipos aquí
import unknown from "../../assets/types/unknown.svg";
import steel from "../../assets/types/steel.svg";
import water from "../../assets/types/water.svg";
import bug from "../../assets/types/bug.svg";
import dragon from "../../assets/types/dragon.svg";
import electric from "../../assets/types/electric.svg";
import ghost from "../../assets/types/ghost.svg";
import fire from "../../assets/types/fire.svg";
import fairy from "../../assets/types/fairy.svg";
import ice from "../../assets/types/ice.svg";
import fighting from "../../assets/types/fighting.svg";
import normal from "../../assets/types/normal.svg";
import grass from "../../assets/types/grass.svg";
import psychic from "../../assets/types/psychic.svg";
import rock from "../../assets/types/rock.svg";
import dark from "../../assets/types/dark.svg";
import ground from "../../assets/types/ground.svg";
import poison from "../../assets/types/poison.svg";
import flying from "../../assets/types/flying.svg";

const getImageByType = (type) => {
  // Crea un objeto que relacione los nombres de los tipos con las rutas de imágenes
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
    flying,
  };

  return typeImages[type.toLowerCase()];
};

const OrderFilter = ({resetPage}) => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(false);
  const tipos = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (event) => {
    dispatch(filterPokemon(event.target.value));
    resetPage();
  };

  const handleFilterByTypes = (event) => {
    setSelectedTipo(event.target.value);
    dispatch(filterByTypes(event.target.value));
  };

  const handleOrder = (event) => {
    dispatch(orderPokemons(event.target.value));
    setAux(!aux);
  };

  return (
    <div className={style.container}>

      <p className={style.orden}>ORDEN</p>

      <select onChange={handleOrder} className={style.option}>
        <option value="Id">Por Id</option>
        <option value="AscendingAZ">Ascendente A-Z</option>
        <option value="DescendingZA">Descendente Z-A</option>
        <option value="AscendingAttack">Ascendente (Attack)</option>
        <option value="DescendingAttack">Descendente (Attack)</option>
      </select>

      <div className={style.labels}>
        <label htmlFor="allPokemons" className={style.label}>
          {" "}
          ALL
          <input
            type="radio"
            name="filter"
            id="allPokemons"
            value="All Pokemons"
            onChange={handleFilter}
            defaultChecked
          />
        </label>
        <label htmlFor="api" className={style.label}>
          {" "}
          <span className={style.radio}>API</span>
          <input
            type="radio"
            name="filter"
            id="api"
            value="Api"
            onChange={handleFilter}
          />
        </label>
        <label htmlFor="baseDeDatos" className={style.label}>
          {" "}
          DB
          <input
            type="radio"
            name="filter"
            id="baseDeDatos"
            value="Base de Datos"
            onChange={handleFilter}
          />
        </label>
      </div>

      <div>
        <select onChange={handleFilterByTypes} className={style.option}>
          <option value="All Pokemons">All types</option>
          {tipos.map((type) => (
            <option key={type.ID} value={type.Nombre}>
              {type.Nombre}
              <img
                src={getImageByType(type.Nombre)}
                alt={type.Nombre}
                className={style.typeImage}
              />
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
};

export default OrderFilter;
