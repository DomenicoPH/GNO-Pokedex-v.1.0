import style from "./OrderFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon, orderPokemons, filterByTypes } from "../../redux/actions/actions";
import { useEffect, useState } from "react";
import { getTypes } from "../../redux/actions/actions";
import Select from "react-select"; // Importa react-select

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

const OrderFilter = ({ resetPage }) => {
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilter = (event) => {
    dispatch(filterPokemon(event.target.value));
    resetPage();
  };

  const handleOrder = (selectedOption) => {
    dispatch(orderPokemons(selectedOption.value));
  };

  const [selectedType, setSelectedType] = useState(null); // Estado para el tipo seleccionado

  const handleFilterByTypes = (selectedOption) => {
    // Cuando se selecciona un tipo, actualiza el estado y aplica el filtro
    setSelectedType(selectedOption);
    dispatch(filterByTypes(selectedOption.value));
  };

  // Convierte los tipos en un formato adecuado para react-select
  const filteredTipos = tipos.filter((type) => type.Nombre !== 'unknown' && type.Nombre !== 'shadow');

  // Agrega la opción "Selecciona tipo" al principio de las opciones
  const typeOptions = [
    { value: null, label: "All types" }, // Opción para restablecer
    ...filteredTipos.map((type) => ({
      value: type.Nombre,
      label: (
        <div className={style.type}>
          <img
            src={getImageByType(type.Nombre)}
            alt={type.Nombre}
            className={style.typeImage}
          />
          {type.Nombre}
        </div>
      ),
    })),
  ];

  // Custon styles (para los Select)
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "black", // Fondo negro
      minWidth: '200px',
      border: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgb(50, 105, 178)" : "black", // Fondo amarillo cuando la opción está enfocada
      color: "rgb(255, 203, 5)", // Letras amarillas
      padding: '10px',
      border: 'none',
      marginTop: '-4px',
      marginBottom: '-4px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(255, 203, 5)", // Letras amarillas
    }),
  };

  // Opciones de orden
  const orderOptions = [
    { value: "Id", label: "Por Id" },
    { value: "AscendingAZ", label: "Ascendente A-Z" },
    { value: "DescendingZA", label: "Descendente Z-A" },
    { value: "AscendingAttack", label: "Ascendente (Attack)" },
    { value: "DescendingAttack", label: "Descendente (Attack)" },
  ];
  const defaultOrderOption = orderOptions[0];

  return (
    <div className={style.container}>

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
      
      <p className={style.orden}>ORDEN</p>
      <Select
        options={orderOptions}
        onChange={handleOrder}
        className={style.option}
        defaultValue={defaultOrderOption}
        placeholder="Selecciona orden"
        styles={customStyles}
      />
      
      <Select
        options={typeOptions}
        onChange={handleFilterByTypes}
        className={style.option}
        value={selectedType} // Establece el valor seleccionado
        placeholder="All types"
        styles={customStyles}
      />
      
    </div>
  );
};

export default OrderFilter;
