import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PublicRoutes = ({isAuth, component:Component, ...rest})=> (
    <Route {...rest} component={(props)=>(
        isAuth ? <Redirect to='/dashboard'/> : <Component {...props}/>
    )}/>
);
const mapStateToProps = state => ({
    isAuth: state.auth.authenticated
});
export default connect(mapStateToProps)(PublicRoutes);