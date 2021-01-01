import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ //Necesita unos props obligatorios:
    isLoggedIn,  //Necesito saber si está autenticado
    component: Component, //Necesito el componente a renderizar. Renombro el component a Component
    ...rest // El resto de argumentos como el exact, el path.., también los necesito. Los almaceno en el operador ...rest que crea un array para pasarlos al componente
}) => {
    // A través de: rest.location.pathname puedo llegar a la información del path actual
    return ( //Regresamos un <Route> con resto de propiedades que estoy recibiendo ...rest
        <Route {...rest}
            component={ (props) => (
                (isLoggedIn ) 
                    ? (<Component{...props} />)
                    : (<Redirect to="/login" />)
            )}
        />
    )
}

//Hago obligatorio el envío del isLoggedIn y del component
PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

//El <Route retorna el componente de forma condicional. El component se puede llamar con un callbak que recibe como
// argumentos las props: History, location, params y shearch
//El componente lo envío de forma condicional con un ternario. Si isAuthenticated es true Renderiza el Component solicitado com las props expandidad
//Si isAuthenticated es false redierecciona a la página login
//Importo el PropTypes para obligar a enviar los props del componente


