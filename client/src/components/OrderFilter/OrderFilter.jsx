import style from "./OrderFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon,orderPokemons,filterByTypes } from "../../redux/actions/actions";
import { useState } from "react";
import { getTypes } from "../../redux/actions/actions";
import { useEffect } from "react";

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
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
};

export default OrderFilter;
