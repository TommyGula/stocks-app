import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const context = useContext(UserContext);
    return(
            <Route
                {...rest}
                render = {props =>
                    context.userSignIn ? 
                        (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/sign-in"/>
                    )
                }
            />
    )
}

export default PrivateRoute;