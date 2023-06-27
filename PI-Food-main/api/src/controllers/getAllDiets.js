require("dotenv").config();
const URL = "https://api.spoonacular.com/recipes/";
const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db.js");

const getAllDiets = async () => {
  try {
    if(!Diet){
      const apiInfo = (
        await axios.get(
          `${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
        )
      ).data;
      // console.log(apiInfo)
  
      //de cada receta, saco el valor de la propiedad diets
      const allDiets = apiInfo.results.map((receta) =>
        Object.values(receta.diets) //array de arrays xq hay recetas q tienen +1 dieta
      );
      // console.log(allDiets)
  
      //creo una instancia de Set
      const uniqueValues = new Set();
  
      for (const array of allDiets) { //recorro el array allDiets, entrando en cada posicion
        for (const value of array) { //de cada dieta del array 
          uniqueValues.add(value); //saco el valor/los valores
        }
      }
      // console.log('dietas:', uniqueValues)
      const dietasArray = Array.from(uniqueValues); //lo transformo en array para mapearlo
      // console.log(dietasArray);
      const dietasObj = dietasArray.map(el => {return { 
          nombre: el 
      }})
  
      // console.log(dietasObj)
      await Diet.bulkCreate(dietasObj);
      const dietas = await Diet.findAll()
      return dietas;

    } else {
      const dietas = await Diet.findAll()
// console.log(dietas)
      return dietas;
    }

    // console.log('las dietas', diets)

  } catch (error) {
    return error.message;
  }
};

module.exports = getAllDiets;
