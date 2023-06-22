import React from "react";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRecipes,
  abcOrder,
  hsOrder,
  dietFilter,
  registerFilter,
} from "../../Redux/actions";
import Recipe from "../../Components/Recipe/Recipe";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allrecipes);

  //----------PARA EL PAGINADO--------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsperpage = 9;
  const indexOfLastRecipe = currentPage * itemsperpage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsperpage;
  const currentRecipes = [...allRecipes].slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  //________________PAGINADO______________

  const nextHandler = () => {
    const totalElementos = allRecipes.length; //103
    const lastPage = Math.ceil(totalElementos / itemsperpage);
    const nextPage = currentPage + 1;

    if (currentPage === lastPage) return;
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage === 0) return;
    setCurrentPage(prevPage);
  };

  //------------ORDERS & FILTERS---------

  function alphabeticOrder(event) {
    dispatch(abcOrder(event.target.value));
  }

  function orderbyHS(event) {
    dispatch(hsOrder(event.target.value));
  }

  function filterbyDiet(event) {
    dispatch(dietFilter(event.target.value));
  }

  function filterbyRegister(event) {
    dispatch(registerFilter(event.target.value));
  }

  function handleReset(event) {
    event.preventDefault();
    dispatch(getAllRecipes());
  }

  return (
    <div>
      <div className={style.optionsContainer}>
        <span>Kind of diet: </span>
        <select className={style.select} onChange={filterbyDiet}>
          <option value="" disabled selected>
            Select your option
          </option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
        </select>

        <span>Search on: </span>
        <select className={style.select} onChange={filterbyRegister}>
          <option value="" disabled selected>
            Select your option
          </option>
          <option value="DB">My Recipes</option>
          <option value="API">Api Recipes</option>
        </select>

        <span>Alphabetic order </span>
        <select className={style.select} onChange={alphabeticOrder}>
          <option value="" disabled selected>
            Select your option
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <span>HealthScore </span>
        <select className={style.select} onChange={orderbyHS}>
          <option value="" disabled selected>
            Select your option
          </option>
          <option value="mas">Healthier</option>
          <option value="menos">Unhealthy</option>
        </select>

        <button className={style.resetbutton} onClick={handleReset}>
          RESET
        </button>
      </div>
      <div className={style.cardsContainer}>
        {currentRecipes?.map((el) => (
          <Recipe
            key={el.id}
            id={el.id}
            nombre={el.nombre}
            imagen={el.imagen}
            diets={el.diets}
          />
        ))}
      </div>

      {isLoading && <div className={style.spinner}> </div>}

      <div>
        <button className={style.button} onClick={prevHandler}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button className={style.button} onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
