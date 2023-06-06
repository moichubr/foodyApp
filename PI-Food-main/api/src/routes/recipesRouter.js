require('dotenv').config()
const { Router } = require("express");
const recipesRouter = Router();
const URL = "https://api.spoonacular.com/recipes/"; //{id}/information
const axios = require("axios");
const { API_KEY } = process.env;
const {Recipe, Diet} = require('../db.js')
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postNewRecipe = require("../controllers/postNewRecipe");

//100 recetas de la api
const getApiRecipes = async () => {
    const apiAuxInfo = (await axios.get('https://apimocha.com/n.s.recipes/allrecipes')).data
    // const apiURL = (await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data
    const apiInfo = apiAuxInfo.results.map(el => {
        return {
            nombre: el.title,
            imagen: el.image,
            resumen: el.summary,
            healthScore: el.healthScore,
            diets: (el.diets?.map(el => el)).join('- '),
            instrucciones: el.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    step: el.step
                }})
        }
    })
    return apiInfo
}

//la info de la DB
const getDBrecipes = async () => {
    return await Recipe.findAll({
        include:{ //incluí tambien en la busqueda,
            model: Diet, //del modelo dieta,
            attributes: ['nombre'], //el atributo nombre de la dieta
            through: {
                attributes: [] //y nada mas
            },
        }
    })
}

//todas las recetas
const getAllRecipes = async () => {
    const apiInfo = await getApiRecipes();
    const dbInfo = await getDBrecipes();
    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes;
}


//----------------ROUTERS----------------//

recipesRouter.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  const allRecipes = await getAllRecipes()
  console.log(idRecipe)
  try {
    const recipe = await getRecipeById(idRecipe, allRecipes);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


recipesRouter.get("/", async (req, res) => {
    const { nombre } = req.query
    console.log(nombre)
    const allRecipes = await getAllRecipes()
    try {
        if(nombre){
            const recipe = await getRecipeByName(nombre, allRecipes)
            res.status(200).json(recipe)
        } else {
            res.status(200).json(allRecipes)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

const validate = (req, res, next) => {
  const { nombre, imagen, resumen, healthScore, instrucciones, diets } =
    req.body;
  if (nombre && imagen && resumen && healthScore && instrucciones && diets) {
    next();
  } else return res.status(404).json({ message: "Faltan datos" });
};

recipesRouter.post("/", validate, async (req, res) => {
  const { nombre, imagen, resumen, healthScore, instrucciones, createdInDb, diets } =
    req.body;
  try {
    const newRecipe = postNewRecipe(
      nombre,
      imagen,
      resumen,
      healthScore,
      instrucciones,
      createdInDb,
      diets
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
    recipesRouter,
    getAllRecipes,
    getApiRecipes
};
