import style from "./Loading.module.css"
import spin from "../../assets/pbspin.gif"

const Loading = () => {
    return(
        <div className={style.loading}>
            <img src={spin} alt="Pokeball girando" />
            <p>POKEDEX: CARGANDO...</p>
        </div>
    )
}

export default Loading;