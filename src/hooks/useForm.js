/* *
 * 
 * Lee la caja de texto de un input
 * */

import { useState } from 'react'

export const useForm = ( initialState = {}) => { //El estado inicial va a ser un objeto. Lo ponemos vacío para que no pete si no se envía nada

    const [values, setValues] = useState(initialState);

    // creo un método para resetear la lisra de todos
    const reset = () => {
        setValues( initialState ) //Da a values el estado inicial
    }

    const handleInputChange = ( {target} )=>{ //la función recibe el evento del onChange del input. Extraigo del evento el target
                                              //Con esto puedo acceder a todos los atributos del input
        //Para que se vea la información del input en cuadro de texto hay que llamar al setValues
        setValues({ 
            ...values, //Desestructuramos el values por si acaso hay propiedades que no están cambiando
            [target.name]: target.value //El nombre de la propiedad está calculado. Viene deñ target, y su valor vendrá tambien del target.hljs-value
        });
    }

    //Se puede retornar como un objetos, como un array o solo los values. En este caso lo haremos como u arreglo.
    return [values, handleInputChange, reset ] //El segundo elemento está retornando una función para poner los valores al formulario
}
