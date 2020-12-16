import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //new Date()
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notas: 'Comprar el pastel',
        user:{
            _id: '123',
            name: 'Ezequiel'
        }
    }],
    activeEvent: null
}

export const calendarReducer = ( state = initialState, action ) => {
    
    switch ( action.type ){

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [ //Evensts será un array con los eventos anteriores más el actual
                    ...state.events,
                    action.payload
                ]
            }    
            
        default:
            return state;
    }
} 