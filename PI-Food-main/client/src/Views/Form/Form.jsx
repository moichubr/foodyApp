import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDiets, createRecipe } from "../../Redux/actions";
import validate from "./validate";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dietsState = useSelector((state) => state.getAllDiets);
  // console.log("el estado", dietsState);

  const [input, setInput] = useState({
    nombre: "",
    imagen: "",
    resumen: "",
    healthScore: 0,
    instrucciones: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  function handleChange(event) {
    event.preventDefault();

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSelect(event) {
    event.preventDefault();
    setInput({
      ...input,
      diets: [...input.diets, event.target.value],
    });

    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== el),
    });
  }

  function submitHandler(event) {
    if (Object.keys(errors).length !== 0) {
      event.preventDefault();
      alert("Verify the provided information.");
    } else {
      event.preventDefault();
      dispatch(createRecipe(input));
      alert("The recipe has been created!");
      setInput({
        nombre: "",
        imagen: "",
        resumen: "",
        healthScore: 0,
        instrucciones: "",
        diets: [],
      });
    }
    navigate("/home");
  }

  return (
    <div>
        <form onSubmit={(event) => submitHandler(event)}>
        <div className={style.container}>
          <label>Name: </label>
          <input
            placeholder="Recipe title"
            type="text"
            name="nombre"
            value={input.nombre}
            onChange={(event) => handleChange(event)}
          />
          {errors.nombre ? (
            <span className={style.error}>
              <b>{errors.nombre}</b>
            </span>
          ) : null}

          <label>Image: </label>
          <input
            type="text"
            name="imagen"
            placeholder="Copy-paste the img URL"
            value={input.imagen}
            onChange={(event) => handleChange(event)}
          />
          {errors.imagen ? (
            <span className={style.error}>
              <b>{errors.imagen}</b>
            </span>
          ) : null}

          <label>Summary: </label>
          <textarea
            placeholder="What's the recipe about?"
            type="textarea"
            name="resumen"
            value={input.resumen}
            onChange={(event) => handleChange(event)}
          />
          {errors.resumen ? (
            <span className={style.error}>
              <b>{errors.resumen}</b>
            </span>
          ) : null}

          <label>HealthScore: </label>
          <input
            type="range"
            min="0"
            max="100"
            name="healthScore"
            value={input.healthScore}
            onChange={(event) => handleChange(event)}
          />
          {errors.healthScore ? (
            <span className={style.error}>
              <b>{errors.healthScore}</b>
            </span>
          ) : null}

          <label>Step by step: </label>
          <textarea
            placeholder="How you do it?"
            type="textarea"
            name="instrucciones"
            value={input.instrucciones}
            onChange={(event) => handleChange(event)}
          />
          {errors.instrucciones ? (
            <span className={style.error}>
              <b>{errors.instrucciones}</b>
            </span>
          ) : null}

          <label>Belongs to diets:</label>
          <select
            className={style.select}
            onChange={(event) => handleSelect(event)}
          >
            {dietsState?.map((diet) => {
              return (
                <option key={diet.nombre} value={diet.nombre}>
                  {diet.nombre}
                </option>
              );
            })}
          </select>
          {errors.diets ? (
            <span className={style.error}>
              <b>{errors.diets}</b>
            </span>
          ) : null}

          <div>
            {input.diets?.map((el) => {
              return (
                <div className={style.contenedordietas}>
                  <div className={style.divDietas} key={el}>
                    <p>{el}</p>
                    <button
                      className={style.closeBtn}
                      onClick={() => {
                        handleDelete(el);
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button className={style.submit} type="submit">
            CREATE RECIPE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
