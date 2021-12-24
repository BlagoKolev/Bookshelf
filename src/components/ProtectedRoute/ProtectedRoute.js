import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from "../../Context/Context";
import { useContext } from 'react'

function ProtectedRoute({ isAuthenticated: isAuthenticated, component: Component, ...rest }) {

    const {user} = useContext(UserContext);

    return (
        <Route {...rest} render={(props) => {
            if (user) {
                return <Component />;
            } else {
                return (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                );
            }
        }}
        />
    );
}

export default ProtectedRoute;