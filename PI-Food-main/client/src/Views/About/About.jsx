import style from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.titulo}>FOODY</h1>
        <h2 className={style.subtit}>-recipes binnacle-</h2>
      </div>

      <div className={style.textCont}>
        <p>
          EN: This is a SPA that works as a recipe book, you will become in a
          super-chef soon and be able to make delicious plates to your loved
          ones. You can go further and create your own recipes!
        </p>
        <p>
          Have fun exploring the app recipes and creating new ones, which you
          can consult later.
        </p>

        <p>This App uses technologies as:</p>
        <p>React.js, Redux.js, Express, Sequelize, PostgreSQL, CSS, HTML5</p>
        
        <hr></hr>

        <p>
          ES: Esta es una SPA que funciona como un libro de recetas para que te
          conviertas en super-chef y agasajes a tus seres queridos. También
          puedes ir mas allá y crear tus propias recetas!
        </p>

        <p>
          Diviertete explorando las distintas recetas de la app y creando
          nuevas, que luego podrás consultar.
        </p>

        <p>Esta App utiliza tecnologías como:</p>
        <p>React.js, Redux.js, Express, Sequelize, PostgreSQL, CSS, HTML5</p>
      </div>
    </>
  );
};

export default About;
