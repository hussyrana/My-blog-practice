import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = ({isAuth, component: Component, ...rest}) => (
    <Route {...rest} component={(props)=>(
        isAuth ? (
        <React.Fragment>
            {props.match.path === "/read/:id" ? null :<Header/>} 
            <Component {...props}/>
        </React.Fragment>
        ) : (<Redirect to="/"/>) 
    )}/>
);
const mapStateToProps = state => ({
    isAuth: state.auth.authenticated
});
export default connect(mapStateToProps)(PrivateRoute);