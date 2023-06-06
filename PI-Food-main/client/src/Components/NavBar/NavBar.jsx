import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
  return (
    <>
    <div className={style.container}>
  
      <div className={style.containerbutton}>
      <Link to="/form">
        <button className={style.button}>Crea tu receta</button>
        </Link>

      <Link to="/about">
        <button className={style.button}>About</button>
        </Link>
      </div>
  

    </div>
    </>
  );
};

export default NavBar;
