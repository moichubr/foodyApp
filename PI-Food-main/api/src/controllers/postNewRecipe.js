const { Recipe, Diet } = require("../db.js");

const postNewRecipe = async (
  nombre,
  imagen,
  resumen,
  healthScore,
  instrucciones,
  createdInDb,
  diets
) => {
  // console.log(nombre, imagen, resumen, healthScore, instrucciones)
  try {
    const myRecipe = await Recipe.create({ nombre, imagen, resumen, healthScore, instrucciones, createdInDb });

    const dietasDB = await Diet.findAll({  //busco dentro del modelo todas las dietas donde nombre coincida con lo q recibo por body
      where: {
        nombre : diets
      }
    })

    myRecipe.addDiet(dietasDB) //me trae de la tabla Diet lo que le paso
    
    return myRecipe;
  } catch (error) {
    return "No se pudo crear la receta";
  }
};

module.exports = postNewRecipe;
