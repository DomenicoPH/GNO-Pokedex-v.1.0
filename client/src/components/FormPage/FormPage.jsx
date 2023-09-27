import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemons, getTypes, getPokemons } from "../../redux/actions/actions";
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
    Tipo: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      if (!input.Tipo.includes(name)) {
        setInput({
          ...input,
          Tipo: [...input.Tipo, name],
        });
      }
    } else {
      setInput({
        ...input,
        Tipo: input.Tipo.filter((tipo) => tipo !== name),
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (input.Nombre.trim() === "") {
      errors.Nombre = "Ingrese un nombre válido";
      isValid = false;
    } else if (!/^[A-Za-z-]{1,20}$/.test(input.Nombre)) {
      errors.Nombre =
        "El nombre no puede tener más de 20 caracteres, ni números. Únicamente puedes utilizar '-'";
      isValid = false;
    } else if (pokemons.some((pokemon) => pokemon.Nombre === input.Nombre)) {
      errors.Nombre = "Ya existe un Pokémon con este nombre";
      isValid = false;
    }

    if (input.Imagen.trim() === "") {
      errors.Imagen = "Ingrese una URL de imagen válida";
      isValid = false;
    }

    const Vida = parseInt(input.Vida);
    if (isNaN(Vida) || Vida < 1 || Vida > 255) {
      errors.Vida = "Número entre 1 y 255";
      isValid = false;
    }

    const Ataque = parseInt(input.Ataque);
    if (isNaN(Ataque) || Ataque < 1 || Ataque > 255) {
      errors.Ataque = "Número entre 1 y 255";
      isValid = false;
    }

    const Defensa = parseInt(input.Defensa);
    if (isNaN(Defensa) || Defensa < 5 || Defensa > 255) {
      errors.Defensa = "Número entre 5 y 255";
      isValid = false;
    }

    const Velocidad = parseInt(input.Velocidad);
    if (isNaN(Velocidad) || Velocidad < 5 || Velocidad > 255) {
      errors.Velocidad = "Número entre 5 y 255";
      isValid = false;
    }

    const Altura = parseFloat(input.Altura);
    if (isNaN(Altura) || Altura < 0.1 || Altura > 20.0) {
      errors.Altura = "La altura debe ser un número entre 0.1 y 20.0";
      isValid = false;
    }

    const Peso = parseFloat(input.Peso);
    if (isNaN(Peso) || Peso < 0.1 || Peso > 1000.0) {
      errors.Peso = "El peso debe ser un número entre 0.1 y 1000.0";
      isValid = false;
    }

    if (input.Tipo.length === 0 || input.Tipo.length > 2) {
      errors.Tipo = "Debe seleccionar de 1 a 2 tipos de Pokémon";
      isValid = false;
    }

    for (const field in input) {
      if (typeof input[field] === "string" && input[field].trim() === "") {
        errors[field] = "Este campo es obligatorio";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
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
        Tipo: [],
      });
      setErrors({});
    } else {
      alert("Formulario inválido. Por favor, corrija los errores.");
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
            <label className={style.label}>Nombre:</label>
            <input
              type="text"
              value={input.Nombre}
              name="Nombre"
              placeholder="Caracteres de la A a la Z y '-'"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Nombre && <span>{errors.Nombre}</span>}
          </div>

          <div className={style.block}>
            <label className={style.label}>Imagen:</label>
            <input
              type="text"
              value={input.Imagen}
              name="Imagen"
              placeholder="url"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Imagen && <span>{errors.Imagen}</span>}
          </div>

          <div className={style.block}>
            <label className={style.label}>Vida:</label>
            <input
              type="text"
              value={input.Vida}
              name="Vida"
              placeholder="Entre 1 y 255"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Vida && <span>{errors.Vida}</span>}
          </div>
          
          <div className={style.block}>
            <label className={style.label}>Ataque:</label>
            <input
              type="text"
              value={input.Ataque}
              name="Ataque"
              placeholder="Entre 1 y 255"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Ataque && <span>{errors.Ataque}</span>}
          </div>
          
          <div className={style.block}>
            <label className={style.label}>Defensa:</label>
            <input
              type="text"
              value={input.Defensa}
              name="Defensa"
              placeholder="Entre 1 y 255"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Defensa && <span>{errors.Defensa}</span>}
          </div>

          <div className={style.block}>
            <label className={style.label}>Velocidad:</label>
            <input
              type="text"
              value={input.Velocidad}
              name="Velocidad"
              placeholder="Entre 1 y 255"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Velocidad && <span>{errors.Velocidad}</span>}
          </div>

          <div className={style.block}>
            <label className={style.label}>Altura:</label>
            <input
              type="text"
              value={input.Altura}
              name="Altura"
              placeholder="Entre 0.1 y 20.0"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Altura && <span>{errors.Altura}</span>}
          </div>

          <div className={style.block}>
            <label className={style.label}>Peso:</label>
            <input
              type="text"
              value={input.Peso}
              name="Peso"
              placeholder="Entre 0.1 y 1000.0"
              className={style.input}
              onChange={handleChange}
            />
            {errors.Peso && <span>{errors.Peso}</span>}
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
                    value={tipo.Nombre}
                    onChange={handleCheck}
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
