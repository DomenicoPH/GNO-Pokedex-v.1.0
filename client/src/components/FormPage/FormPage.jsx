import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemons, getTypes, getPokemons } from "../../redux/actions/actions";
import error from "../../assets/svg/error.svg";
import style from "./FormPage.module.css";
import pika from '../../assets/pika.gif';

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);

  const [input, setInput] = useState({
    Nombre: "",
    Imagen: "",
    Vida: "",
    Ataque: "",
    Defensa: "",
    Velocidad: "",
    Altura: "",
    Peso: "",
    Tipo: [types.length > 0 ? types[0].Nombre : ""], // Marcar la primera casilla disponible por defecto
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      const selectedTypes = input.Tipo;

      if (checked && selectedTypes.length < 2) {
        // Permitir marcar si hay menos de 2 tipos seleccionados
        setInput({
          ...input,
          Tipo: [...selectedTypes, name],
        });
      } else if (!checked) {
        // Permitir desmarcar si hay más de 1 tipo seleccionado
        if (selectedTypes.length > 1) {
          setInput({
            ...input,
            Tipo: selectedTypes.filter((tipo) => tipo !== name),
          });
        }
      }

      // Validar que siempre haya al menos una casilla marcada
      if (input.Tipo.length === 0) {
        setErrors({
          ...errors,
          Tipo: "Debe seleccionar al menos un tipo de Pokémon", 
        });
      } else {
        setErrors({
          ...errors,
          Tipo: "",
        });
      }
    } else {
      setInput({
        ...input,
        [name]: value,
      });
      validateField(name, value);
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "Nombre":
        if (value.trim() === "") {  // Campo vacio ERROR!
          errorMessage = "Ingrese un nombre válido";
        } else if (!/^[A-Za-z-]{1,20}$/.test(value)) {  // Caracter no permitido | número de caracteres supera el máximo ERROR!
          errorMessage =
            "Máximo 20 caracteres. No números. Puedes utilizar '-'";
        } else if (pokemons.some((pokemon) => pokemon.Nombre === value)) {
          errorMessage = "Ya existe un Pokémon con este nombre";
        }
        break;

      case "Imagen":
        if (value.trim() === "") {
          errorMessage = "Ingrese una URL de imagen válida";
        } else if (!isValidUrl(value)) {
          errorMessage = "Ingrese una URL de imagen válida";
        }
        break;

      case "Vida":
        const vida = parseInt(value);
        if (isNaN(vida) || vida < 1 || vida > 255) {
          errorMessage = "Número entre 1 y 255";
        }
        break;

      case "Ataque":
        const ataque = parseInt(value);
        if (isNaN(ataque) || ataque < 1 || ataque > 255) {
          errorMessage = "Número entre 1 y 255";
        }
        break;

      case "Defensa":
        const defensa = parseInt(value);
        if (isNaN(defensa) || defensa < 5 || defensa > 255) {
          errorMessage = "Número entre 5 y 255";
        }
        break;

      case "Velocidad":
        const velocidad = parseInt(value);
        if (isNaN(velocidad) || velocidad < 5 || velocidad > 255) {
          errorMessage = "Número entre 5 y 255";
        }
        break;

      case "Altura":
        const altura = parseFloat(value);
        if (isNaN(altura) || altura < 0.1 || altura > 20.0) {
          errorMessage = "Número entre 0.1 y 20.0";
        }
        break;

      case "Peso":
        const peso = parseFloat(value);
        if (isNaN(peso) || peso < 0.1 || peso > 1000.0) {
          errorMessage = "Número entre 0.1 y 1000.0";
        }
        break;

      case "Tipo":
        if (value.length === 0 || value.length > 2) {
          errorMessage = "Debe seleccionar de 1 a 2 tipos de Pokémon";
        }
        break;

      default:
        break;
    }

    setErrors({
      ...errors,
      [fieldName]: errorMessage,
    });
  };

  // Validación de la URL
  const isValidUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // Dbe tener una estructura url válida
    return urlPattern.test(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar que al menos un tipo esté seleccionado
    const isAtLeastOneTypeSelected = input.Tipo.length > 0;

    // Validar que todos los campos estén llenos y sin errores y que al menos un tipo esté seleccionado
    const areAllFieldsValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(input).every((value) => value !== "") &&
      isAtLeastOneTypeSelected;

    if (areAllFieldsValid) {
      dispatch(
        createPokemons({
          Nombre: input.Nombre,
          Imagen: input.Imagen,
          Vida: parseInt(input.Vida),
          Ataque: parseInt(input.Ataque),
          Defensa: parseInt(input.Defensa),
          Velocidad: parseInt(input.Velocidad),
          Altura: parseFloat(input.Altura),
          Peso: parseFloat(input.Peso),
          Tipo: input.Tipo.map((nombre) => ({ Nombre: nombre })),
        })
      );
      alert("Creaste tu Pokémon");
      setInput({
        Nombre: "",
        Imagen: "",
        Vida: "",
        Ataque: "",
        Defensa: "",
        Velocidad: "",
        Altura: "",
        Peso: "",
        Tipo: [types.length > 0 ? types[0].Nombre : ""], // Volver a marcar la primera casilla por defecto
      });
      setErrors({});
    } else {
      alert("Formulario incompleto o con errores");
    }
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h1 className={style.title}><img className={style.pika} src={pika} alt="pikachu" />CREAR POKEMON</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Nombre:</label>
              <input
                type="text"
                value={input.Nombre}
                name="Nombre"
                placeholder="Caracteres de la A a la Z y '-'"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Nombre && <span className={style.errors}>{errors.Nombre}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Imagen:</label>
              <input
                type="text"
                value={input.Imagen}
                name="Imagen"
                placeholder="url"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Imagen && <span className={style.errors}>{errors.Imagen}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Vida:</label>
              <input
                type="text"
                value={input.Vida}
                name="Vida"
                placeholder="Entre 1 y 255"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Vida && <span className={style.errors}>{errors.Vida}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Ataque:</label>
              <input
                type="text"
                value={input.Ataque}
                name="Ataque"
                placeholder="Entre 1 y 255"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Ataque && <span className={style.errors}>{errors.Ataque}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Defensa:</label>
              <input
                type="text"
                value={input.Defensa}
                name="Defensa"
                placeholder="Entre 5 y 255"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Defensa && <span className={style.errors}>{errors.Defensa}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Velocidad:</label>
              <input
                type="text"
                value={input.Velocidad}
                name="Velocidad"
                placeholder="Entre 5 y 255"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Velocidad && <span className={style.errors}>{errors.Velocidad}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Altura:</label>
              <input
                type="text"
                value={input.Altura}
                name="Altura"
                placeholder="Entre 0.1 y 20.0"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Altura && <span className={style.errors}>{errors.Altura}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div className={style.info}>
              <label className={style.label}>Peso:</label>
              <input
                type="text"
                value={input.Peso}
                name="Peso"
                placeholder="Entre 0.1 y 1000.0"
                className={style.input}
                onChange={handleChange}
              />
            </div>
            {errors.Peso && <span className={style.errors}>{errors.Peso}<img src={error} className={style.alert} alt="error" /></span>}
          </div>

          <div className={style.block}>
            <div>
              <label className={style.label}>Tipos:</label>
              <p className={style.text}>MAX: 2 tipos</p>
            </div>
            <div className={style.boxes}>
              {types.map((tipo) => (
                <label className={style.labelSmall} key={tipo.Nombre}>
                  <input
                    type="checkbox"
                    name={tipo.Nombre}
                    checked={input.Tipo.includes(tipo.Nombre)}
                    onChange={handleChange}
                  />
                  {tipo.Nombre}
                </label>
              ))}
            </div>
            {errors.Tipo && <span>{errors.Tipo}</span>}
          </div>

          <div className={style.botonCrear}>
            <button type="submit">Crear Pokemon</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
