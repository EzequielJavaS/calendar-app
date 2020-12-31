
const baseUrl = process.env.REACT_APP_API_URL;
//Esto va a ser = http://localhost:4000/api o https://calendario-backend.herokuapp.com/api dependiendo si estamos en desarrollo o producción

//fetchSinToken recibe el endpoint al que quiere llamar, la data que quiero postea o enviar y el method: GET, POST...
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET') {
        return fetch( url )
    }else{
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data ),
            cache: 'no-cache'
        });
    }
}

//Para cuando sea necesario utilizar el token en la operación
//Si es una petición GET, hay que mandar los Headers con e token. El tojen lo tengo en localStorage
const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token')||''; //Token será igual a el valor de localStorage o null.

    if ( method === 'GET') {
        return fetch( url,{
            method,
            headers:{
                'x-token': token
            }
        }
             )
    }else{
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data ),
            cache: 'no-cache'
        });
    }
}
export {
    fetchSinToken,
    fetchConToken
}