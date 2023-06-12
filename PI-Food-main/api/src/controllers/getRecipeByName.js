require("dotenv").config();
const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/";
const { API_KEY } = process.env;
const { Recipe } = require("../db.js");


const getRecipeByName = async (nombre, allRecipes) => {
  try {
    const recipeName = await allRecipes.filter(el => el.nombre.toLowerCase().includes(nombre.toLowerCase()))
    if(recipeName.length) return recipeName 
    else throw Error('No hay recetas con ese nombre')
} catch (error) {
    return error.message;
}
};

module.exports = getRecipeByName;

// if (name) {
//   const recipeDB = await Recipe.findAll({
//     where: { nombre: { [Op.iLike]: `%${name}%` } },
//   });

//   if (recipeDB) {
//     return recipeDB;
//   } else {
//     const recipesApi =
//       await axios.get(
//         `${URL}/complexSearch?apiKey=${API_KEY}&titleMatch=${name}`
//       )
//     return recipesApi;