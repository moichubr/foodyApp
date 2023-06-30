import React from "react";
import style from "./Recipe.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteARecipe } from "../../Redux/actions";

const Recipe = ({ id, nombre, imagen, diets }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(diets)

  function changeNavigate() {
    navigate(`/details/${id}`);
  }

  function deleteRecipe(id) {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this recipe? There is no way back."
    );

    if (userConfirmed) {
      dispatch(deleteARecipe(id)).catch((error) => alert(error.message));
      alert("La receta se ha eliminado con éxito.");
    } else return;
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
      {isNaN(id) ? (
        <button
          className={style.closebtn}
          onClick={() => {
            deleteRecipe(id);
          }}
        >
          DELETE
        </button>
      ) : null}
    </div>
  );
};

export default Recipe;
