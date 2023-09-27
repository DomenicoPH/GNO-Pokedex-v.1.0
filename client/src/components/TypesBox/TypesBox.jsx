import React from "react";
import { useSelector } from "react-redux";
import style from "./TypesBox.module.css";

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

const TypesBox = () => {
  // types desde Redux:
  const types = useSelector((state) => state.types);

  // Excluidos:
  const tiposExcluidos = ["unknown", "shadow"];
  const tiposFiltrados = types.filter((type) => !tiposExcluidos.includes(type.Nombre));

  return (
    <div className={style.container}>
      <p className={style.header}>TIPOS DE POKEMON</p>
      <div className={style.typeBox}>
        {tiposFiltrados.map((type) => (
          <div className={style.type} key={type.Nombre}>
            {/* Renderiza la imagen del tipo */}
            <img
              src={getImageByType(type.Nombre)}
              alt={type.Nombre}
              className={style.typeImage}
            />
            {/* Renderiza el nombre del tipo */}
            <p>{type.Nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesBox;
