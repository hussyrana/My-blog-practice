import React, {useState} from 'react';
import { connect } from 'react-redux';
import {login} from '../store/actions/Auth';
import '../styles/authForm.css';
import Spinner from './Spinner';

const AuthForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const emailChangeHandler = (e)=>{
        const email = e.target.value;
        setEmail(email);
        setError(null);    
    }
    const passwordChangeHandler = (e)=>{
        const password = e.target.value;
        setPassword(password);
        setError(null);
    }
    const checkValidity= (mail, pasword)=>{
        
           const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
           const mailValid = emailPattern.test(mail);
           if(mailValid && pasword.length>= 6){
            return true;
           }
           else if(!mailValid){
            setError('Please enter valid email.');
           }
           else{
            setError('Password length must be greater than 5.');
           }
        
        return false;
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(checkValidity(email, password)){
 
        props.startAuthenticate(email, password, props.signInn);
        
        }
        else{
            if(props.signInn){
            setError('Please enter the correct Email and Password.');
            }
        }

    }
    let form;
    if(props.loading){
        form = <Spinner/>
    }else{ 
    form= (
    <React.Fragment>
        <input 
        value = {email} 
        onChange={emailChangeHandler} 
        type='email' 
        placeholder='E-mail'
        autoFocus/>
        <input 
        value = {password}
        onChange = {passwordChangeHandler} 
        type='password' 
        placeholder='Password'/>
        {props.error? <p style={{color:'red', fontStyle:'italic'}}>{props.error.message}</p>: null}
        <p style={{color:'red', fontStyle:'italic'}}>{error}</p>
        <button type='submit'>{props.signInn ? 'SignIn' : 'SignUp'}</button>
    </React.Fragment>);
    }
    return(

            <form className="authForm" onSubmit = {formSubmitHandler}>
            {form}
            </form>
    );
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error
})
const mapDispatchToProps = dispatch =>({
    startAuthenticate: (email, password, signIn) => dispatch(login(email, password, signIn))
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);