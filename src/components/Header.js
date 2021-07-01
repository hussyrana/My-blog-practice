import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../store/actions/Auth'
import {Link} from 'react-router-dom';
import '../styles/container.css';
import '../styles/header.css';


const Header = (props)=>{
   const logoutHandler = () =>{
        props.logout();
    }
    return(
        <div className='headerBox'>
        <div className='container headerBox__header'>
        <Link className='Link' to='/dashboard'>My Blog</Link>
        <button onClick={logoutHandler}>Logout</button>
        </div>
    </div>
);
    
};
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default connect(null, mapDispatchToProps)(Header);