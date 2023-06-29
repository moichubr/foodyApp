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
  // handleScore50
} from "../../Redux/actions";
import Recipe from "../../Components/Recipe/Recipe";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allrecipes);
  const recipesLoaded = useSelector((state) => state.recipesLoaded);
  const selectedDiet = useSelector((state) => state.dietSelected);


  //----------PARA EL PAGINADO--------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsperpage = 9;
  const indexOfLastRecipe = currentPage * itemsperpage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsperpage;
  const currentRecipes = [...allRecipes].slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
    );


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
    setCurrentPage(1)
  }

  function orderbyHS(event) {
    dispatch(hsOrder(event.target.value));
    setCurrentPage(1);
  }

  function filterbyDiet(event) {
    dispatch(dietFilter(event.target.value));
    setCurrentPage(1);
  }

  function filterbyRegister(event) {
    dispatch(registerFilter(event.target.value));
    setCurrentPage(1);
  }

  function handleReset(event) {
    event.preventDefault();
    dispatch(getAllRecipes());
    setCurrentPage(1);
  }

  // function handleScore(event) {
  //   event.preventDefault();
  //   dispatch(handleScore50())
  //   setCurrentPage(1);
  // }

  useEffect(() => {
    if(recipesLoaded){
      return;
    }

    if(selectedDiet){
      dietFilter(selectedDiet);
    }
    else{
      dispatch(getAllRecipes());
    }
    }, [recipesLoaded, dispatch, selectedDiet]);

    if(!recipesLoaded){
      return <Loading />
    }


  return (
    <div>
      <div className={style.optionsContainer}>
        <span>Kind of diet: </span>
        <select className={style.select} onChange={filterbyDiet}>
          <option value="">
            All
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
          <option value="all">
            All 
          </option>
          <option value="DB">My Recipes</option>
          <option value="API">Api Recipes</option>
        </select>

        <span>Alphabetic order </span>
        <select className={style.select} onChange={alphabeticOrder}>
          <option value="">
            Select your option
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <span>HealthScore </span>
        <select className={style.select} onChange={orderbyHS}>
          <option value="">
            Select your option
          </option>
          <option value="mas">Healthier</option>
          <option value="menos">Unhealthy</option>
        </select>
{/* 
        <span>HealthScore until 50</span>
        <button onClick={handleScore}>FIND
        </button> */}

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
