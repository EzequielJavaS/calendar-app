import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

//Para comenzar el preoceso de autenticación
//Es una función asícrona gracias al thunk, por eso ponemos un return. Si no es asíncrona no es necesario el return 
export const startLogin = (email, password) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth', {email, password }, 'POST' );
        const body = await resp.json();
        //console.log(body);

        if( body.ok ){
            //Guardo el token el el localStorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth/new', {email, password, name }, 'POST' );
        const body = await resp.json();
        console.log(body);

        if( body.ok ){
            //Guardo el token el el localStorage
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

//Ahora hay que hacer el dispatch para gravar la información del usuario
const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})