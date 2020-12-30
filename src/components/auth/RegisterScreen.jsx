import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const RegisterScreen = () => {
    const dispatch = useDispatch();


    const [formRegisValues, handleRegisInputChange] = useForm({
        rName: 'Diana',
        rEmail: 'diana@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'

    });

    const { rName, rEmail, rPassword1, rPassword2  } = formRegisValues;

    const handleRegister = ( e ) => {
        e.preventDefault();
        //Validar que las constraseñas son iguales
        if( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }


        dispatch( startRegister ( rEmail, rPassword1, rName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                {/* <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div> */}

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
