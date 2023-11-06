import style from "./Footer.module.css"
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className={style.footer}>
            <p>Pokedex<span className={style.r}>®</span> creada por Domenico Pagano - <Link to="/about" className={style.link}>Más sobre esta SPA</Link></p>
        </div>
    )
};

export default Footer;