import style from './About.module.css'
import me from '../../assets/mee.png'
import pokemon from '../../assets/logoInicio.png'
import map from '../../assets/map.png'
import pokeball from '../../assets/pokeball.png'
import create from '../../assets/create.png'
import navigate from '../../assets/navigate.png'
import explore from '../../assets/explore.png'
import extra from '../../assets/extra.png'
import screen from '../../assets/screen.png'

const About = () => {
    return(
        <div className={style.container}>

            <div className={style.main1}>

                <div className={style.text}>
                    {/*<img className={style.logo} src={pokemon} alt="Pokemon title" />*/}
                    <h2>Sobre mi:</h2>
                    <p>Mi nombre es <span className={style.negrita}>Domenico Pagano</span>, y a mis 37 años, me encuentro en un emocionante viaje de transformación profesional. Originario de Lima, Perú, mi historia profesional comenzó en el mundo del arte, donde me desempeñé como diseñador gráfico, ilustrador y dibujante de cómics. Sin embargo, mi pasión por la creatividad, la tecnología y la resolución de problemas me llevó a explorar un nuevo horizonte: la programación.</p>
                </div>
                
                <div className={style.fotoContainer}>
                    <img className={style.foto} src={me} alt="autor" />
                </div>

            </div>

            <hr />

            <div className={style.main2}>

                <div className={style.titleContainer}><h2>Sobre este proyecto:</h2></div>
                
                <img className={style.screen} src={screen} alt="screen" />

                <p className={style.special}>Te encuentras ante una Single Page Application (SPA) diseñada para los amantes de los Pokémon, donde podrás explorar y sumergirte en el maravilloso mundo de estos adorables monstruos de bolsillo.</p>
                
                <div className={style.titleContainer}><img className={style.icon} src={pokeball} alt="pokeball" /><h3>Explora el Mundo Pokémon</h3></div>
                <p className={style.normal}>En esta SPA, tendrás la oportunidad de visualizar a tus Pokémon favoritos y descubrir sus estadísticas más importantes. Podrás navegar a través de una impresionante lista de Pokémon, conocer sus detalles y disfrutar de su increíble diversidad.</p>

                <div className={style.titleContainer}><img className={style.icon} src={create} alt="create" /><h3>Crea tus Propios Pokémon</h3></div>
                <p className={style.normal}>Pero eso no es todo, ¡también puedes convertirte en un entrenador Pokémon y crear tus propias criaturas! Utiliza el formulario de creación de Pokémon y dale vida a tus ideas. ¡Captura, diseña y almacena tus Pokémon en nuestra base de datos para siempre!</p>

                <div className={style.titleContainer}><img className={style.icon} src={navigate} alt="navigate" /><h3>Navegación Sencilla</h3></div>
                <p className={style.normal}>Esta Pokedex SPA cuenta con una barra de navegación intuitiva que te llevará a todas las áreas clave de la aplicación. ¿Quieres volver al punto de partida? ¡Simplemente haz clic en el botón de Reset! ¿Buscas un Pokémon específico? Utiliza nuestro buscador por nombre. ¿Deseas crear un nuevo Pokémon? Accede al formulario de creación con un solo clic. ¿Listo para salir? El botón de salida te llevará de regreso al punto de partida, nuestro Landing Page.</p>

                <div className={style.titleContainer}><img className={style.icon} src={explore} alt="explore" /><h3>Exploración Detallada</h3></div>
                <p className={style.normal}>El panel principal es tu puerta de entrada al vasto mundo Pokémon. Aquí, encontrarás los Pokémon agrupados en conjuntos de 12, y tendrás acceso tanto a los Pokémon de la API como a los de la Base de Datos para disfrutar de una visualización detallada de cada uno. Además, una lista de Pokémon por nombre facilita el uso del buscador en la barra de navegación. Nuestros filtros de ordenamiento, filtros de origen y filtros por tipo te ayudarán a personalizar tu experiencia y encontrar exactamente lo que buscas. ¡Y no olvides echar un vistazo a la tabla de referencia de tipos Pokémon en la parte inferior del panel principal!</p>

                <div className={style.titleContainer}><img className={style.icon} src={extra} alt="extra" /><h3>Un pequeño Extra</h3></div>
                <p className={style.normal}>Finalmente, en la parte inferior de la SPA podrás encontrar un Footer que te llevará a una sección con información extra. ¡Si, justamente donde te encuentras ahora!</p>

                <p className={style.normal}>Este proyecto es una aventura diseñada para aquellos que comparten una pasión por los Pokémon. ¡Esperamos que disfrutes explorando este maravilloso universo y que te diviertas creando tus propios Pokémon! ¡Bienvenido a la diversión sin fin con Pokémon!</p>

            </div>

            <div className={style.map}>

                <a href={map} target='blank'><img src={map} alt="map" /></a>

            </div>

            <div>
                <a href= "/home"> <button className={style.goback}>VOLVER</button> </a>
            </div>

        </div>
    )
};

export default About;