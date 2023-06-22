require("dotenv").config();
const URL = "https://api.spoonacular.com/recipes/"; //{id}/information
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db.js");

// https://api.spoonacular.com/recipes/78549/information?apiKey=516463b0ae0348749fabeac087bca6df

const getRecipeById = async (id, getDBrecipes ) => {
  // console.log('el id: ', id)
  try {
    if (isNaN(id)) {
      const recipe = (await getDBrecipes()).find(el => el.id === id)
      return recipe;
    } else {
      const response = (
        await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
      ).data;
      // console.log(response)
      const recipeApi = {
        id: response.id,
        nombre: response.title,
        imagen: response.image,
        resumen: response.summary,
        healthScore: response.healthScore,
        instrucciones: response.instructions,
        diets: (response.diets?.map((el) => el)).join(', '),
      };

      return recipeApi;
    }
  } catch (error) {
    console.log(error.message);
    return "El id no corresponde a ninguna fuente de información.";
  }
};

module.exports = getRecipeById;