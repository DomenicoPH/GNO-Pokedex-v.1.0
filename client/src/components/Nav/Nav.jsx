import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import logo from "../../assets/pokedex_mod3.png";
import exit from "../../assets/svg/exit.svg";
import lab from "../../assets/svg/lab.svg";

const Nav = () => {
  return (
    <div className={style.navContainer}>

        <a href="/home">
            <div className={style.logo}>
                <img src={logo} alt="Pokedex Logo" />
            </div>
        </a>

        <div className={style.SearchBar}>
            <SearchBar />
        </div>

        <div className={style.botones}>
            <Link to="/form" className={style.link}>
              <button className={style.boton}>
                  {" "}
                  <img src={lab} alt="lab" />
                  <p> CREAR POKEMON </p>
              </button>
            </Link>

            <Link to="/" className={style.link}>
              <button className={style.boton}>
                  {" "}
                  <img src={exit} alt="exit" />
                  <p>EXIT</p>
              </button>
            </Link>
        </div>

    </div>
  );
};
export default Nav;
