import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
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
    if(Object.keys(errors).length !== 0){
      event.preventDefault();
      alert('Verifica la información ingresada.')
    } else{
      event.preventDefault();
      dispatch(createRecipe(input));
      alert("Has creado tu receta!");
      setInput({
        nombre: "",
        imagen: "",
        resumen: "",
        healthScore: 0,
        instrucciones: "",
        diets: [],
      });
    }
    navigate('/home');
  }

  return (
    <div>
      <h2 className={style.titulo}>
        Completa el formulario para crear tu receta
      </h2>

      <form onSubmit={(event)=>submitHandler(event)}>
        <div className={style.container}>
          <label>Nombre: </label>
          <input
            placeholder="Ponle un título"
            type="text"
            name="nombre"
            value={input.nombre}
            onChange={(event)=>handleChange(event)}
          />
          {errors.nombre ? (
            <span className={style.error}>
              <b>{errors.nombre}</b>
            </span>
          ) : null}

          <label>Imagen: </label>
          <input
            type="text"
            name="imagen"
            // accept="image/*"
            value={input.imagen}
            onChange={(event)=>handleChange(event)}
          />
          {errors.imagen ? (
            <span className={style.error}>
              <b>{errors.imagen}</b>
            </span>
          ) : null}

          <label>Resumen del plato: </label>
          <textarea
            placeholder="Cuenta de qué se trata"
            type="textarea"
            name="resumen"
            value={input.resumen}
            onChange={(event)=>handleChange(event)}
          />
          {errors.resumen ? (
            <span className={style.error}>
              <b>{errors.resumen}</b>
            </span>
          ) : null}

          <label>HealthScore: </label>
          <input
            placeholder="0= poco saludable || 100= muy saludable"
            type="number"
            name="healthScore"
            value={input.healthScore}
            onChange={(event)=>handleChange(event)}
          />
          {errors.healthScore ? (
            <span className={style.error}>
              <b>{errors.healthScore}</b>
            </span>
          ) : null}

          <label>Paso a paso: </label>
          <textarea
            placeholder="Cuenta cómo lo haces"
            type="textarea"
            name="instrucciones"
            value={input.instrucciones}
            onChange={(event)=>handleChange(event)}
          />
          {errors.instrucciones ? (
            <span className={style.error}>
              <b>{errors.instrucciones}</b>
            </span>
          ) : null}

          <label>Dieta/s a la/s que pertenece</label>
          <select className={style.select} onChange={(event)=>handleSelect(event)}>
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
                  <button className={style.closeBtn}
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
            CREAR RECETA
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
