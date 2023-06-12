import { GET_ALLRECIPES, GET_DETAILS, ABC_ORDER, HS_ORDER, DIET_FILTER, REGISTER_FILTER, GET_RECIPE_BYNAME } from "./actions";

const initialState = { allrecipes: [], getDetails: [], recipesAux: [] };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLRECIPES:
      return {
        ...state,
        allrecipes: action.payload,
        recipesAux: action.payload,
      };


    case GET_DETAILS:
      return {
        ...state,
        getDetails: action.payload,
      };
    
    case GET_RECIPE_BYNAME:
    return{ ...state, allrecipes: action.payload}

    case ABC_ORDER:
      let orderbyABC;

      if (action.payload === "asc") {
        orderbyABC = state.allrecipes.sort((a, b) =>
          a.nombre > b.nombre ? 1 : -1
        );
      } else {
        orderbyABC = state.allrecipes.sort((a, b) =>
          a.nombre < b.nombre ? 1 : -1
        );
      }
      return { ...state, allrecipes: [...orderbyABC] };


    case HS_ORDER:
        let orderByHS;

        if(action.payload === "mas") {
            orderByHS = state.allrecipes.sort((a, b) =>
            a.healthScore > b.healthScore ? 1 : -1);
        }else {
            orderByHS = state.allrecipes.sort((a, b) => 
            a.healthScore < b.healthScore ? 1 : -1);
        }
        return { ...state, allrecipes: [...orderByHS]};
        
    case DIET_FILTER:
        let filteredDiets = state.recipesAux.filter((recipe) => recipe.diets.includes(action.payload))
        return {...state, allrecipes: [...filteredDiets]};

    case REGISTER_FILTER:
        let filtro;

        if(action.payload === 'DB'){
            filtro = state.recipesAux.filter(el => el.createdInDb)
        }else {
            filtro = state.recipesAux.filter(el => !el.createdInDb)
        }
        return {...state, allrecipes: [...filtro]};

    default:
      return state;
  }
};

export default rootReducer;
