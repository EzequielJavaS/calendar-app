import { types } from "../types/types";

const initialState = {
    checking: true, //Al comenzar la aplicación, debo chequera el estado del usuario
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authChekingFinish:
            return {
                ...state,
                checking: false
            }      
        default:
            return state;
    }
}