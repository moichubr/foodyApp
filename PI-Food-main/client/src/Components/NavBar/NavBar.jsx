import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import { useState,  } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../Redux/actions";



const NavBar = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  function inputHandler(event) {
    event.preventDefault();
    let inputValue = event.target.value;
    setInput(inputValue);
  }

  function onSearch() {
    if(!input){
      alert('Try writing something.')
    } else{
      dispatch(getRecipeByName(input))
    }
  };


  return (
    <>
    <div className={style.container}>

      <div className={style.appInfo}>
      <p className={style.ptitulo}>FOODY APP</p>
      <p className={style.psubtitulo}>-recipes binnacle-</p>
      </div>


      <div className={style.containerbutton}>
      <Link to="/home">
        <p className={style.link}>HOME</p>
        </Link>

      <Link to="/form">
        <p className={style.link}>CREATE YOUR RECIPE</p>
        </Link>

      <Link to="/about">
        <p className={style.link}>ABOUT</p>
        </Link>
      </div>

      <div className={style.inputcont}>
        <input className={style.input} placeholder='Recipe name or keyword' type='search' onChange={inputHandler}></input>
        <button className={style.buttonSearch} onClick={onSearch}>SEARCH</button>
      </div>

    </div>
    </>
  );
};

export default NavBar;
