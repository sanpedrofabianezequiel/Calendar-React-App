import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateScreen } from './PrivateScreen';
import { PublicScreen } from './PublicScreen';
export const AppRouter = () => {


    const dispatch = useDispatch();
    const {checking,uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking()); //Go to auth/renew
    }, [dispatch])
    console.log(checking);

    if(checking){
        return (<h5>Espere...</h5>)
    }
    return (
        <Router>
            <div>
                <Switch>
                <PublicScreen exact path="/login"  component={LoginScreen} authenticated={!!uid} />
                <PrivateScreen exact path="/"  component={CalendarScreen}  authenticated={!!uid} />
                
                <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
