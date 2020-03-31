
import React, { useEffect, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './actions/alerts';
import { loadUser } from './actions/auth';
import setAuthToken from './utlis/setAuthToken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Register1 = React.lazy(() => import('./views/Pages/Register1'));


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  toast.configure();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return <Fragment>
    <Provider store={store}>
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Alert />
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/Register1" name="Register Page" render={props => <Register1 {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>

        </React.Suspense>
      </HashRouter>
    </Provider>
  </Fragment>
}

export default App;
