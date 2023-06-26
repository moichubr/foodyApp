import style from "./Loading.module.css"

const Loading = () => {

    return(
        <div className={style.background}>
            <h1 className={style.title}>Loading...</h1>
            <div className={style.spinner}></div>
        </div>
    )
}

export default Loading;