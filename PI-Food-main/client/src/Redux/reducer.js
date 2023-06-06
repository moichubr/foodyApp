import  {GET_ALLRECIPES}  from "./actions";

const initialState = { allrecipes: [] }

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALLRECIPES:
            return {
                ...state,
                allrecipes: action.payload
            };

        default:
            return state;
    }
}

export default rootReducer;