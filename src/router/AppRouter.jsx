import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AppRouter = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={ CalendarScreen }/>    
                    <Route exact path="/login" component={ LoginScreen }/>    
                    <Route exact path="/regis" component={ RegisterScreen }/>
                    <Redirect to="/" />    
                </Switch>
            </Router>
        </div>
    )
}

