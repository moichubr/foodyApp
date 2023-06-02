require("dotenv").config();
const URL = "https://api.spoonacular.com/recipes/";
const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db.js");

const getAllDiets = async (getApiRecipes) => {
  try {
    const apiInfo = (
      await axios.get(
        `${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data;
    // console.log(apiInfo)
    const allDiets = apiInfo.results.map((receta) =>
      Object.values(receta.diets)
    );
    // console.log(allDiets)

    const uniqueValues = new Set();

    for (const array of allDiets) {
      for (const value of array) {
        uniqueValues.add(value);
      }
    }

   
    // console.log('dietas:', uniqueValues)
    const dietasArray = Array.from(uniqueValues);
    // console.log(dietasArray);
    const dietasObj = dietasArray.map(el => {return {
        nombre: el
    }})

    // console.log(dietasObj)

    const diets = await Diet.bulkCreate(dietasObj);

    return diets


  } catch (error) {
    return error.message;
  }
};

module.exports = getAllDiets;
