import Dashboard from './components/Dashboard';
import createHistory from 'history/createBrowserHistory';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ReadPost from './components/ReadPost';
import { Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import PrivateRoute from './routes/PrivateRoutes';
import PublicRoute from './routes/PublicRoutes';

export const history = createHistory();
const App = () => {
  return (
    <Router history = {history}>
        <Switch>
        <PrivateRoute path='/create' component={CreatePost}/>
        <PrivateRoute path='/edit/:id' component={EditPost}/>
        <PrivateRoute path='/read/:id' component={ReadPost}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PublicRoute path='/' component={Auth} exact/>
        <Route path='/'/>
        </Switch>
    </Router>
  );
}
export default App;
