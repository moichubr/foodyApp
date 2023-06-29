import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDiets, createRecipe, getAllRecipes } from "../../Redux/actions";
import validate from "./validate";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dietsState = useSelector((state) => state.getAllDiets);

  const [input, setInput] = useState({
    nombre: "",
    imagen: "",
    resumen: "",
    healthScore: 50,
    instrucciones: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  // cuando se monta el form, obtiene y guarda los input
  useEffect(() => {
    let formValues = localStorage.getItem("formValues");
    if (formValues) {
      setInput(JSON.parse(formValues));
    }
  }, []);

  //----maneja la imagen que se quiere cargar
  const handleImage = (event) => {
    const file = event.target.files[0]; // obtiene el archivo seleccionado por el usuario

    if (file) {
      const reader = new FileReader(); //instancia para leer archivos y acceder a su contenido

      reader.onload = (e) => { //si se lee correctamente
        setInput({ ...input, imagen: e.target.result });
      };

      reader.readAsDataURL(file); //transforma a URL de base64 el codigo de la imagen
    }
  };

  //maneja el nro del input range que se muestra sobre la barra
  function handleRange(event) {
    const currentRange = parseInt(event.target.value);
    setInput({
      ...input,
      healthScore: currentRange,
    });
  }

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

  //----Handle del select Diets
  function handleSelect(event) {
    event.preventDefault();
    setInput({
      ...input,
      diets: [...input.diets, event.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== el),
    });
  }

  //-----fx que hace el Submit del form----
  function submitHandler(event) {
    event.preventDefault();
    if (Object.keys(errors).length !== 0) {
      event.preventDefault();
      alert("Verify the provided information.");
      return;
    } else if (input.diets.length === 0) {
      const userConfirm = window.confirm(
        "You did not select any diet. You want to continue anyway?"
      ); //boolean
      if (userConfirm) {
        dispatch(createRecipe(input)).catch((error) => {
          alert('Oops! Something went wrong. Please, try again.')
        });
        alert("The recipe has been created!");
        localStorage.removeItem("formValues");
        setInput({
          nombre: "",
          imagen: "",
          resumen: "",
          healthScore: 0,
          instrucciones: "",
          diets: [],
        });
      } else {
        localStorage.setItem("formValues", JSON.stringify(input)); //restablece el form con lo q tiene el estado input
        window.location.href = "/form"; //redirige al form
      }
    } else {
      dispatch(createRecipe(input)).catch((error) => {
        alert('Oops! Something went wrong. Please, try again.')
      });
      alert("The recipe has been created!");
      localStorage.removeItem("formValues");
      setInput({
        nombre: "",
        imagen: "",
        resumen: "",
        healthScore: 0,
        instrucciones: "",
        diets: [],
      });
    }
    dispatch(getAllRecipes());
    navigate("/home");
  }

  return (
    <div>
      <h1 className={style.titulo}>GET INSPIRED, CHEF!</h1>
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
          <div className={style.preview}>
            {input.imagen ? (
              <img
                className={style.img}
                src={input.imagen}
                alt="Imagen seleccionada"
              />
            ) : null}
          </div>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            id="photo"
            // value={input.imagen} NO FUNCIONA PARA EL TYPE FILE
            onChange={(event) => handleImage(event)}
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
          <span className={style.healthScore}>
            <b>{input.healthScore}</b>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            name="healthScore"
            value={input.healthScore}
            onChange={(event) => handleRange(event)}
          />

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
