import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { startCheking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    //Tengo que leer el estado del checking y uid en el store
    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch ( startCheking() );
    }, [dispatch])

    if ( checking ){ //Componente que saldrá mientras está haciendo el Cheking
        return ( <h1> ESPERE ...</h1>)
    }

    return (
        <div>
            <Router>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        component={ CalendarScreen }
                        isLoggedIn = { !!uid }
                    />    
                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isLoggedIn = { !!uid }
                    />    
                    <PublicRoute
                        exact
                        path="/regis"
                        component={ RegisterScreen }
                        isLoggedIn = { !!uid }
                    />
                    <Redirect to="/login"/>    
                </Switch>
            </Router>
        </div>
    )
}

