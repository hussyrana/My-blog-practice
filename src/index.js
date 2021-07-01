import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {Provider} from 'react-redux';
import postReducer from './store/reducer/posts';
import filterReducer from './store/reducer/filters';
import authReducer from './store/reducer/auth';
import 'normalize.css';
import './index.css';
 
import {authStateCheck} from './store/actions/Auth';
import App, {history} from './App';
import reportWebVitals from './reportWebVitals';
import {startSetPosts} from './store/actions/posts';
import Spinner from './components/Spinner';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  posts: postReducer,
  filters: filterReducer,
  auth: authReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
let rendered = false;
const appRender = () => {
  if(!rendered){
    ReactDOM.render(app, document.getElementById('root'));
    rendered=true;
  }
}
store.dispatch(authStateCheck());
const auth = store.getState().auth;
if(auth.authenticated){
  ReactDOM.render(<div className='spinner'><Spinner/></div>, document.getElementById('root'));
  store.dispatch(startSetPosts()).then(()=>{
    appRender();
  });
}
else{
  appRender();
  history.push('/');
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
