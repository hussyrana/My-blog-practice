import React, {useState} from 'react';
import AuthForm from './AuthForm';
import '../styles/auth.css';

const Auth = () => {
    const [signIn, setSignIn] = useState(false);
    const SwitchHandler = (e) => {
        setSignIn(!signIn);
    }
    return(
        <div className='main'>
            <div className='main__auth'>
                <h2>My Blog</h2>
            <AuthForm signInn = {signIn}/>
            <button className='switchButton' onClick={SwitchHandler}
            >
            {signIn ? 'Switch to SignUp' : 'Switch to SignIn'}
            </button>
            </div>
        </div>
    );
}
export default Auth;