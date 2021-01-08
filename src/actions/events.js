import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

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

//Acción para iniciar la modificación de un evento en la base de datos
export const eventStartUpdate = ( event ) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventUpdated( event ));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

//Acción para editar el evento activo en strore
const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event  
});

//Acción para iniciar la eliminación de un evento
export const eventStartDelete = () => {
    //Necesito acceder a datos estados del store:
    return async (dispatch, getState) => {
        const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken( `events/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventDeleted());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

//Aación para borrar un evento en el store
const eventDeleted = () => ({type: types.eventDeleted});

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

export const eventLogout =() => ({type: types.eventLogout});




//disparará la acción al reducer para cargar los eventos en el store.