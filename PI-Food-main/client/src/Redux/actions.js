import axios from 'axios'
export const GET_ALLRECIPES = 'GET_ALLRECIPES';


export const getAllRecipes = () => {
    const endpoint = 'http://localhost:3001/recipes/';
    return async(dispatch)=> {
        try {
            const response = (await axios.get(endpoint)).data
            // console.log('lo que me responde:', response)
            return dispatch({
                type: GET_ALLRECIPES,
                payload: response
            })
        } catch (error) {
            throw Error(error.message)
        }

    }
}