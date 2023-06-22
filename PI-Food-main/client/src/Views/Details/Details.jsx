import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css";
import { getDetailsById, cleanDetail } from "../../Redux/actions";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log('EL ID', id)
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.getDetails);

  useEffect(() => {
    dispatch(getDetailsById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  function back(event) {
    event.preventDefault();
    navigate("/home");
  }

  return (
    <div className={style.detailCard}>
      <h6 className={style.id}>Id: {recipe.id}</h6>
      <h1 className={style.nombre}>{recipe.nombre}</h1>

      <img className={style.img} src={recipe.imagen} alt="Img not found" />

      <div className={style.extraInfo}>
        <div className={style.h5}>
          <h5>HealthScore: </h5>
          <h5>{recipe.healthScore}</h5>
        </div>

        <div className={style.h5}>
          <h5>Suitable diets:</h5>
          <h5>{recipe.diets}</h5>
        </div>
      </div>

      <div className={style.info}>
        <h3 className={style.h3}>Summary</h3>
        <h4 dangerouslySetInnerHTML={{ __html: recipe.resumen }}></h4>

        <h3 className={style.h3}>Step by step</h3>
        <h4 dangerouslySetInnerHTML={{ __html: recipe.instrucciones }}></h4>
      </div>

      <button className={style.back} onClick={back}>
        BACK
      </button>
    </div>
  );
};

export default Details;
