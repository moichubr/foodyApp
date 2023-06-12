require("dotenv").config();
const URL = "https://api.spoonacular.com/recipes/"; //{id}/information
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe } = require("../db.js");

// https://api.spoonacular.com/recipes/78549/information?apiKey=516463b0ae0348749fabeac087bca6df

const getRecipeById = async (id, getDBrecipes ) => {

  console.log('el id: ', id)

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
        // instrucciones: response.analyzedInstructions[0]?.steps.map((el) => {
        //   return {
        //     numero: el.number,
        //     step: el.steps,
        //   };
        // }),
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


      // if (recipe)
  //     const recipe = apiRecipes.filter(el => el.id === id)
  //     console.log(recipe)
      // console.log(recipe)
      // const apiAuxInfo = (await axios.get("https://apimocha.com/n.s.recipes/allrecipes")).data;

      // // console.log(apiAuxInfo)

      // // const apiURL = (await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data
      // const recipesmapeadas = apiAuxInfo.results.map((el) => {
      //     return {
      //       id: el.id,
      //       nombre: el.title,
      //       imagen: el.image,
      //       resumen: el.summary,
      //       healthScore: el.healthScore,
      //       diets: (el.diets?.map((el) => el)).join(", "),
      //       instrucciones: el.instructions
      //   }});
      //   console.log(recipesmapeadas)
        // const found = recipesmapeadas.filter(el => el.id === id)
        // return found
      // }
      
      // .
      // console.log(recipeId)
      // const recipe = apiURL.results.map((el) => {
      //   return {
      //     id: el.id,
      //     nombre: el.title,
      //     imagen: el.image,
      //     resumen: el.summary,
      //     healthScore: el.healthScore,
      //     diets: (el.diets?.map((el) => el)).join(", "),
      //     instrucciones: el.instructions
      // }});
      // return recipe;
      // console.log('esto es getybyid', recipe)

      
      // .find(el => el.id ===id)
  // }console.log('esto es getbyid:', recipe)
      // return recipe
    
//   } catch (error) {
//     console.log(error.message);
//     return "El id no corresponde a ninguna fuente de información.";
//   }
// };

// module.exports = getRecipeById;
