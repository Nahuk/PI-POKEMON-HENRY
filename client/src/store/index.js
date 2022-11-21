import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) 

//el thunk puede ser usado para retrasar el envío de una acción hasta que se cumpla una línea de código asíncrona.
//thunks es un middleware que nos permite trabajar con peticiones asíncronas