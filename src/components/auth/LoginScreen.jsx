import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { NavLink} from 'react-router-dom'



export const LoginScreen = () => {

    const dispatch = useDispatch();

    //Utilizo el custom hook useForm que me prove del método para recoger la información
    //de los inputs "handleLoginInputChange" y de los  valores introducidos "formLoginValues"
    //Dejo el objeto del estado inicial con valores para no tener que escribir
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });
    //Destructuro para poder utilizar las variables de formLoginValues
    const { lEmail, lPassword } = formLoginValues;
    const handleLogin = (e) => {
        e.preventDefault();
        //LLamo a la acción startLogin
        dispatch( startLogin (lEmail, lPassword) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Identificación</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="line">
                            <div className="form-group">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                            {/* <div className="form-group">
                                <input 
                                    type="button"
                                    className="btnSubmit"
                                    value="Registrarse"
                                />
                            </div> */}
                            <NavLink 
                                activeClassName="active"
                                // className="nav-item nav-link" 
                                exact
                                to="/regis"
                            >
                             o Registrarse
                            </NavLink>

                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}