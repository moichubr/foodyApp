require("dotenv").config();
const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/";
const { API_KEY } = process.env;
const { Recipe } = require("../db.js");


const getRecipeByName = async (nombre, allRecipes) => {
    const recipeName = await allRecipes.filter(el => el.nombre.toLowerCase().includes(nombre.toLowerCase()))
    if(recipeName.length) return recipeName 
    else throw Error('No hay recetas con ese nombre')

};

module.exports = getRecipeByName;
