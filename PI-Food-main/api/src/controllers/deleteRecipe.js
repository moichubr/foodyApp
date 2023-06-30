const { Recipe } = require("../db.js");

const deleteRecipe = async (id, getAllRecipes) => {
  try {
    const recipe = await Recipe.findByPk(id);
    // console.log(recipe)
    await recipe.destroy();
    const newList = await getAllRecipes();
    return newList
  } catch (error) {
    return "Oops! It could not be removed. Please, try again.";
  }
};

module.exports = deleteRecipe;
