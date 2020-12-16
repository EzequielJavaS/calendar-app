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

