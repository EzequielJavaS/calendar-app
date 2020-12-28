import { types } from "../types/types";

//Acción para crear un nuevo evento
export const aventAddNew = (event) => ({
        type: types.eventAddNew,
        payload: event
});

//Acción para marcar como activo el evento
export const aventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

//Acción paa limpira nota activa
export const eventClearActiveEvent = () => ({type: types.eventClearActiveEvent})

//Acción para editar el evento activo
export const evetUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event  
});

//Aación para borrar un evento
export const eventDeleted = () => ({type: types.eventDeleted})