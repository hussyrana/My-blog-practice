import axios from 'axios';
import {history} from '../../App';
import {startSetPosts} from './posts';

export const authSuccess = (idToken, userId) => {
    return{
    type: 'AUTH_SUCCESS',
    idToken, 
    userId
}

};
export const authStart = ()=>({
    type:"AUTH_START"
})
export const authFail = (error) =>({
    type: "AUTH_FAIL",
    error
})
export const logout = ()=>{
history.push('/');
localStorage.removeItem('idToken');
localStorage.removeItem('userId');
localStorage.removeItem('expirationDate'); 
return{
     type: "AUTH_LOGOUT"
 }
};
export const TimeExpire = (time) => {
    return dispatch =>{
    setTimeout(() => {
       dispatch(logout());
    }, time * 1000);
 }
}

export const login = (email, password, signIn) => {
    return dispatch => {
        dispatch(authStart());
        let payLoad = {
            email,
            password,
            returnSecureToken:true
        }
        let apiKey;
        if(signIn){
            apiKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTXLOSPXyePfea5_fUnPtpqjI69r9H00M';
        }
        else{
            apiKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTXLOSPXyePfea5_fUnPtpqjI69r9H00M'
        };
        axios.post(apiKey, payLoad).then((res)=>{
            dispatch(TimeExpire(res.data.expiresIn));
            const date =new Date(new Date().getTime() + res.data.expiresIn * 1000);
            
             localStorage.setItem('idToken', res.data.idToken);
             localStorage.setItem('userId', res.data.localId);
             localStorage.setItem('expirationDate', date);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(startSetPosts());
            history.push('/dashboard');
            
        }).catch(err => {
            dispatch(authFail(err.response.data.error));
        });

    }
}
export const authStateCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken');
        if(token){
            const date = new Date(localStorage.getItem('expirationDate'));
            if(date > new Date()){
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                const time = (date.getTime() - new Date().getTime())/1000;
                dispatch(TimeExpire(time));
                if(history.location.pathname ==='/'){
                    history.push('/dashboard');  
                }
                
            }else{
                dispatch(logout());
            }   
        }
    }
}