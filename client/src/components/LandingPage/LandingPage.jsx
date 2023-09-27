import React from "react";
import logoInicio from "../../assets/logoInicio.png";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.container}>
      <img src={logoInicio} alt="Pokemon" className={style.logo} />
      <a href="/home">
        <button className={style.go}>GO</button>
      </a>
    </div>
  );
};

export default LandingPage;
