
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
export {
    fetchSinToken
}