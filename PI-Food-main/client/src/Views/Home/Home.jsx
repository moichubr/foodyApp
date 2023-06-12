import React from "react";
import style from './Home.module.css'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  {getAllRecipes, abcOrder, hsOrder, dietFilter, registerFilter} from "../../Redux/actions";
import Recipe from "../../Components/Recipe/Recipe";


const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allrecipes);
  
  //----------PARA EL PAGINADO--------
  const [currentPage, setCurrentPage] = useState(1)
  const itemsperpage = 9;
  const indexOfLastRecipe = currentPage * itemsperpage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsperpage
  const currentRecipes = ([...allRecipes].slice(indexOfFirstRecipe, indexOfLastRecipe));
 

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  function handleReset (event) {
    event.preventDefault()
    dispatch(getAllRecipes())
  }


  //________________PAGINADO______________

  const nextHandler = () => {
    const totalElementos = allRecipes.length; //103
    const lastPage = Math.ceil(totalElementos/itemsperpage)
    const nextPage = currentPage + 1;

    if(currentPage === lastPage) return
    setCurrentPage(nextPage)
  }

  const prevHandler = () => {
    const prevPage = currentPage -1;
    if(prevPage === 0) return;
    setCurrentPage(prevPage)
  }

  function alphabeticOrder(event) {
    dispatch(abcOrder(event.target.value))
  }

  function orderbyHS(event) {
    dispatch(hsOrder(event.target.value))
  }

  function filterbyDiet(event) {
    dispatch(dietFilter(event.target.value))
  }
  
  function filterbyRegister(event) {
    dispatch(registerFilter(event.target.value))
  }

  return (
    <div>
      <div className={style.optionsContainer}>
          <span>Tipo de dieta: </span>
          <select className={style.select} onChange={filterbyDiet}>
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
        
          <span>Buscar en: </span>
          <select className={style.select} onChange={filterbyRegister}>
            <option value="DB">My Recipes</option>
            <option value="API">Api Recipes</option>
          </select>

          <span>Orden alfabético</span>
          <select className={style.select} onChange={alphabeticOrder}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          </select>
        
          <span>HealthScore</span>
          <select className={style.select} onChange={orderbyHS}>
            <option value="mas">Mas Saludable</option>
            <option value="menos">Menos Saludable</option>
          </select>

          <button className={style.resetbutton} onClick={handleReset}>RESET
          </button>
      </div>
    <div className={style.cardsContainer}>
      {
      currentRecipes?.map((el) => (
          <Recipe
            key={el.id}
            id={el.id}
            nombre={el.nombre}
            imagen={el.imagen}
            diets={el.diets}
          />
        ))
        }
    </div>

    <div>
      <button className={style.button} onClick={prevHandler}>Anterior</button>
      <span>{currentPage}</span>
      <button className={style.button} onClick={nextHandler}>Siguiente</button>
    </div>
    
    </div>
  );
};

export default Home;
