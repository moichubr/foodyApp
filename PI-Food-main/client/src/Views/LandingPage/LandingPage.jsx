import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

const LandingPage = () => {
    return(
        
        <div className={style.container}>

        <h1 className={style.titulo}>Foody</h1>
        <h3 className={style.subtitulo}>-bitácora de recetas-</h3>

        <Link to='/home'>
        <button className={style.button}>Ingresar</button>
        </Link>

        </div>
        
    )
}

export default LandingPage;