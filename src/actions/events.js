import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";

//Comienza el proceso de gravación de un evento
export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState) => {
        const{ uid, name } = getState().auth;

        try {
            const resp = await fetchConToken( 'events', event, 'POST');
            const body = await resp.json();
            //console.log(body);

            if (body.ok){
                //Asigno al evento el id que le ha asignado la base de datos y el user que lo ha creado
                event.id = body.evento.id;
                //Los datos del user los puedo sacar de nuestro store del user autenticado
                event.user = {
                    _id: uid,
                    name: name
                }
                //console.log(event);

                dispatch(aventAddNew( event));
            }
        } catch (error) {
            console.log(error)   
        }
    }
} 


//Acción para crear un nuevo evento en calendar
//Solo deberá dispararse si el evento se ha gravado en la base de datos.
const aventAddNew = (event) => ({
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
export const eventDeleted = () => ({type: types.eventDeleted});

//Ación y leerá/recogerá todos los eventos de la base de datos.
export const eventStartLoading = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken( 'events');
            const body = await resp.json();
            const events =prepareEvents(body.eventos );
            dispatch( eventLoaded(events));
        } catch (error) {
            console.log(error)          
        }  
    }
}

const eventLoaded = (events) =>({
    type: types.eventLoaded,
    payload: events
})




//disparará la acción al reducer para cargar los eventos en el store.