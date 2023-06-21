require("dotenv").config();
const { Router } = require("express");
const recipesRouter = Router();
const URL = "https://api.spoonacular.com/recipes/"; //{id}/information
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db.js");
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postNewRecipe = require("../controllers/postNewRecipe");

//100 recetas de la api
const getApiRecipes = async () => {
  // const apiAuxInfo = (
  //   await axios.get("https://apimocha.com/n.s.recipes/allrecipes")
  // ).data;
  const apiURL = (await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data
  const apiInfo = apiURL.results.map((el) => {
    return {
      id: el.id,
      nombre: el.title,
      imagen: el.image,
      resumen: el.summary,
      healthScore: el.healthScore,
      diets: (el.diets?.map((el) => el)).join(", "),
      instrucciones: el.instructions
  }});
  // console.log('esto es apiinfo', apiInfo)
  return apiInfo;
};

//la info de la DB
const getDBrecipes = async () => {
  const dbrecipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log(dbrecipe)
  const dbmapeo = dbrecipe.map((el) => {
    return {
      id: el.dataValues.id,
      nombre: el.dataValues.nombre,
      imagen: el.dataValues.imagen,
      resumen: el.dataValues.resumen,
      healthScore: el.dataValues.healthScore,
      instrucciones: el.dataValues.instrucciones,
      createdInDb: el.dataValues.createdInDb,
      diets: el.dataValues.Diets.map((el) => el.nombre).join(", "), //atencion al nombre de la tabla con mayuscula
    };
  });
  // console.log(dbmapeo)
  return dbmapeo;
};

//todas las recetas
const getAllRecipes = async () => {
  const apiInfo = await getApiRecipes();
  const dbInfo = await getDBrecipes();
  const allRecipes = apiInfo.concat(dbInfo);
  return allRecipes;
};

//----------------ROUTERS----------------//

recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  // const apiRecipes = await getApiRecipes()
  // console.log('el id', id)
  try {
    const recipe = await getRecipeById(id, getDBrecipes);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

recipesRouter.get("/", async (req, res) => {
  const { nombre } = req.query;
  // console.log(nombre);
  const allRecipes = await getAllRecipes();
  try {
    if (nombre) {
      const recipe = await getRecipeByName(nombre, allRecipes);
      res.status(200).json(recipe);
    } else {
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  const {
    nombre,
    imagen,
    resumen,
    healthScore,
    instrucciones,
    diets,
    createdInDb,
  } = req.body;

  try {
    const newRecipe = postNewRecipe(
      nombre,
      imagen,
      resumen,
      healthScore,
      instrucciones,
      diets,
      createdInDb,
    );
    // console.log('la receta', newRecipe)
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  recipesRouter,
  getAllRecipes,
  getApiRecipes,
};
