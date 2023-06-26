import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Details.module.css";
import { getDetailsById, cleanDetail } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

const Details = () => {
  const { id } = useParams();
  // console.log('EL ID', id)
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.getDetails);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getDetailsById(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  if (recipe.length === 0) {
    return <Loading />;
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

        {recipe.instrucciones ? (
          <>
            <h3 className={style.h3}>Step by step</h3>
            <h4 dangerouslySetInnerHTML={{ __html: recipe.instrucciones }}></h4>
          </>
        ) : null}
      </div>

      <button className={style.back} onClick={handleBackClick}>
        BACK
      </button>
    </div>
  );
};

export default Details;
