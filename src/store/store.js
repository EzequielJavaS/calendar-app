

import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { rootReducer } from "../reducers/rootReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Al createStore enviamos el const reducers para poder utilizar todos los reducers que creemos
export const store = createStore(
    rootReducer,
    composeEnhancers( //Ponemos la constante potenciadora y aplicamos el Middleware
        applyMiddleware( thunk )
    )
);