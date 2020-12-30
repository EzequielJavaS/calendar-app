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
                checking: false,
                ...action.payload
            }
        default:
            return state;
    }
}