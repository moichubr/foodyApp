const {Router} = require('express');
const dietsRouter = Router();
const getAllDiets = require('../controllers/getAllDiets')
// const getApiRecipes = require('./recipesRouter')


dietsRouter.get('/', async (req, res) => {
    try {
        const allDiets = await getAllDiets();
        res.status(200).json(allDiets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

module.exports= dietsRouter;