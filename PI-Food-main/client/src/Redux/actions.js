import axios from "axios";
export const GET_ALLRECIPES = "GET_ALLRECIPES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_RECIPE_BYNAME = "GET_RECIPE_BYNAME";
export const ABC_ORDER = "ABC_ORDER";
export const HS_ORDER = "HS_ORDER";
export const DIET_FILTER = "DIET_FILTER";
export const REGISTER_FILTER = "REGISTER_FILTER";

export const getAllRecipes = () => {
  const endpoint = "http://localhost:3001/recipes/";
  return async (dispatch) => {
    try {
      const response = (await axios.get(endpoint)).data;
      return dispatch({
        type: GET_ALLRECIPES,
        payload: response,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getDetailsById = (id) => {
  const endpoint = `http://localhost:3001/recipes/${id}`;
  return async (dispatch) => {
    try {
      const response = (await axios.get(endpoint)).data;
      console.log('lo que me responde:', response)
      return dispatch({
        type: GET_DETAILS,
        payload: response,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const getRecipeByName = (nombre) => {
  const endpoint = `http://localhost:3001/recipes/?nombre=${nombre}`;
  return async (dispatch) => {
    try {
      const response = (await axios.get(endpoint)).data;
      return dispatch({
        type: GET_RECIPE_BYNAME,
        payload: response,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const abcOrder = (order) => {
  return {
    type: ABC_ORDER,
    payload: order,
  };
};

export const hsOrder = (order) => {
  return {
    type: HS_ORDER,
    payload: order,
  };
};

export const dietFilter = (dieta) => {
  return {
    type: DIET_FILTER,
    payload: dieta,
  };
};

export const registerFilter = (registro) => {
  return {
    type: REGISTER_FILTER,
    payload: registro,
  };
};
