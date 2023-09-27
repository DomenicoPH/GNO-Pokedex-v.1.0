import style from "./Footer.module.css"
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div className={style.footer}>
            <p>Henry PI - Este Pokedex<span className={style.r}>®</span> es una SPA creada por Domenico Pagano - Puedes conocer más sobre este proyecto haciendo click <Link to="/about" className={style.link}>aquí</Link></p>
        </div>
    )
};

export default Footer;