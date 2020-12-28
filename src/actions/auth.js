//Para comenzar el preoceso de autenticación
//Es una función asícrona gracias al thunk, por eso ponemos un return. Si no es asíncrona no es necesario el return 
export const startLogin = (email, password) => {
    return async() => {
        console.log(email, password)
    }
}