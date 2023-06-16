import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css"
import { getDetailsById, cleanDetail } from "../../Redux/actions";

const Details = () => {
  const { id } = useParams();
  console.log('EL ID', id)
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.getDetails)

  useEffect(() => {
    dispatch(getDetailsById(id));
    return () => {
      dispatch(cleanDetail())
    };
  },[dispatch, id])


  return (
  <>
  <div className={style.detailCard}>

    <h6 className={style.id}>Id: {recipe.id}</h6>
    <h1 className={style.nombre}>{recipe.nombre}</h1>

    <img className={style.img} src={recipe.imagen} alt='Img not found'/>

    <div className={style.extraInfo}>
    <h5 className={style.h5}>{recipe.healthScore}</h5>
    <h5 className={style.h5}>HealthScore: </h5>
   
    <h5 className={style.h5r}>Apto dietas:</h5>
    <h5 className={style.h5r}>{recipe.diets}</h5>
    </div>

    <div className={style.info}>
    <h3 className={style.h3}>Resumen</h3>
    <h4 className={style.text}
      dangerouslySetInnerHTML={{__html: recipe.resumen}}></h4>
    <h3 className={style.h3}>Paso a paso</h3>
    <h4 className={style.text} 
      dangerouslySetInnerHTML={{__html: recipe.instrucciones}}></h4>
    </div>
    


  </div>
    

  </>
  )
};

export default Details;
