import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";
import style from "./HomePage.module.css";


const HomePage = () => {
  return (
    <div className={style.home}>

        <div className={style.Cards}>
          <Cards />
          <Footer />
        </div>
        
    </div>
  );
};

export default HomePage;
