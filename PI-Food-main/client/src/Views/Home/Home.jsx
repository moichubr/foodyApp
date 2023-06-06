import React from "react";
import style from './Home.module.css'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import  {getAllRecipes} from "../../Redux/actions";
// import NavBar from "../../Components/NavBar/NavBar";
import Recipe from "../../Components/Recipe/Recipe";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allrecipes);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  function handleReset (event) {
    event.preventDefault()
    dispatch(getAllRecipes())
  }

  return (
    <div>
      <div className={style.optionsContainer}>
          <span>Tipo de dieta: </span>
          <select className={style.select}>
            <option value="glutenfree">Gluten Free</option>
            <option value="dairyfree">Dairy Free</option>
            <option value="lactoovovegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="fodmap">Fodmap Friendly</option>
          </select>
        
          <span>Buscar en: </span>
          <select className={style.select}>
            <option value="DB">My Recipes</option>
            <option value="API">Api Recipes</option>
          </select>

          <span>Orden alfabético</span>
          <select className={style.select}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          </select>
        
          <span>HealthScore</span>
          <select className={style.select}>
            <option>Mas Saludable</option>
            <option>Menos Saludable</option>
          </select>

          <button className={style.resetbutton} onClick={handleReset}>Mostrar todas
          </button>
      </div>
    <div className={style.cardsContainer}>
      {
      allRecipes?.map((el) => (
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
    
    </div>
  );
};

export default Home;
