import React from "react";
import style from './Recipe.module.css'
import { Link } from "react-router-dom";

const Recipe = ({id, nombre, imagen, diets}) => {
    console.log(diets)
    // const dietsAux = diets.join(', ')

    return (
        <div className={style.card}>
            <Link to= '/detail/:idRecipe'>
            <img classname={style.img} src={imagen} alt='img not found' />
            </Link>
            <div className={style.infoContainer}>
            <h3 className={style.nombre}>{nombre}</h3>
            <h4 className={style.apto}>Dietas incluídas:</h4>
            <h4 className={style.diets}>{diets}</h4>
            </div>
        </div>
    )

}

export default Recipe;