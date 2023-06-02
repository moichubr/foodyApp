require("dotenv").config();
const URL = "https://api.spoonacular.com/recipes/"; //{id}/information
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db.js");

// https://api.spoonacular.com/recipes/78549/information?apiKey=516463b0ae0348749fabeac087bca6df

const getRecipeById = async (idRecipe) => {
  // console.log('el id: ', idRecipe)
  try {
    if (isNaN(idRecipe)) {
      const recipe = await Recipe.findByPk(idRecipe);
      return recipe;
    } else {
      const response = (
        await axios.get(`${URL}${idRecipe}/information?apiKey=${API_KEY}`)
      ).data;
      // console.log(response)
      const recipeApi = {
        nombre: response.title,
        imagen: response.image,
        resumen: response.summary,
        healthScore: response.healthScore,
        // instrucciones: response.instructions
        instrucciones: response.analyzedInstructions[0]?.steps.map((el) => {
          return {
            numero: el.number,
            step: el.steps,
          };
        }),
        diets: response.diets?.map((el) => el),
      };

      return recipeApi;
    }
  } catch (error) {
    console.log(error.message);
    return "El id no corresponde a ninguna fuente de información.";
  }
};

module.exports = getRecipeById;

//     let apiRes
//     const response =
//     source == "API"
//     ? apiRes = (await axios.get(`${URL}${idRecipe}/information?apiKey=${API_KEY}`)).data
//     : await Recipe.findByPk(idRecipe);

// (console.log('esta es la respuesta: ', response))
//     if(apiRes){
//       const {title, image, summary, healthScore, instructions} = response;
//       const recipe = {
//         nombre: title,
//         imagen: image,
//         resumen: summary,
//         healthScore: healthScore,
//         instrucciones: instructions
//       }
//       return recipe;

//      } return response;
