import { useSelector, useDispatch } from "react-redux";
import PageIndex from "../PageIndex/PageIndex";
import Pokemon from "../Pokemon/Pokemon";
import OrderFilter from "../OrderFilter/OrderFilter";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions/actions";
import style from "./Cards.module.css";

const Cards = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [actualPage, setActualPage] = useState(1);
  const pokemonsPerPage = 12;

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokemons());
    }
  }, [dispatch, pokemons.length]);

  const indexOfLastPokemon = actualPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => {
    setActualPage(pageNumber);
  };

  /* BORRAR (!)
  const startPage = (actualPage - 1) * pokemonsPerPage;
  const endPage = startPage + pokemonsPerPage;
  //const currentPokemonsForPagination = pokemons.slice(startPage, endPage);

  const PreviousPage = () => {
    if (actualPage > 1) {
      setActualPage(actualPage - 1);
    }
  };

  const NextPage = () => {
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  };
  */

  const resetPage = () => {
    setActualPage(1);
  };
  

  return (

    <div className={style.cards}>
        
      {/* Componente Paginacón TOP */}
      <div className={style.header}>
        <SearchBar resetPage={resetPage}/>
        <OrderFilter resetPage={resetPage} />
      </div>

      {/* Componente Pokemon con las CARDS y sus detalles */}
      <Pokemon pokemons={currentPokemons} />

      <PageIndex
          totalPages={Math.ceil(pokemons.length / pokemonsPerPage)}
          currentPage={actualPage}
          onPageChange={paginate}
        />

      {/* 
      Botones ANTERIOR y SIGUIENTE Paginación BOTTOM  - BORRAR (!)

      <div className={style.botones}>
        <button onClick={PreviousPage} disabled={actualPage === 1}>
          Anterior
        </button>

        <div className={style.pageNum}>{actualPage}</div>

        <button onClick={NextPage} disabled={endPage >= pokemons.length}>
          Siguiente
        </button>

      </div>
      */}

    </div>
  );
};

export default Cards;
