import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducer";
import thunk from "redux-thunk"; //maneja asincronia dentro de REDUX

export const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
  
);
