const {Router} = require('express');
const dietsRouter = Router();
const getAllDiets = require('../controllers/getAllDiets')
const getApiRecipes = require('./recipesRouter')


dietsRouter.get('/', (req, res) => {
    try {
        const allDiets = getAllDiets(getApiRecipes);
        res.status(200).json(allDiets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

module.exports= dietsRouter;