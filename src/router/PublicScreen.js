import React from 'react';
import PropTypes from 'prop-types';

import {Route, Redirect} from 'react-router-dom';

export const PublicScreen = ({
    authenticated,
    component:Component,
    ...rest
})=>{


    return (
        <Route  
            {...rest}
            component = { (props)=>
                (
                    (authenticated ===false)
                    ? (<Component {...props} />)
                    : (<Redirect to ='/'/>)
                )
            }
        />
    );
}