import React from "react";
import style from "./Recipe.module.css";
import { useNavigate } from "react-router-dom";

const Recipe = ({ id, nombre, imagen, diets }) => {
  const navigate = useNavigate();
  // console.log(diets)

  function changeNavigate() {
    navigate(`/details/${id}`);
  }
  return (
    <div className={style.card}>
      <img
        className={style.img}
        src={imagen}
        alt="img not found"
        onClick={changeNavigate}
      />

      <div className={style.infoContainer}>
        <h3 className={style.nombre}>{nombre}</h3>
        <h4 className={style.apto}>Diets which it belongs:</h4>
        <h4 className={style.diets}>{diets}</h4>
      </div>
    </div>
  );
};

export default Recipe;
