import React, { useState, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import UnauthenticateHeader from './components/Header/unauthenticate';
import Menu from './components/Menu';
import Footer from './components/footer'
import Spinner from './components/Spinner'

import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';

import { useUsuario } from './context/user-context'

// Import with lazy loading
const Users = React.lazy(() => import('./pages/users'));


function UnauthenticateApp() {
  return (
    <div className="App-unauthenticate">
      <BrowserRouter>
        <UnauthenticateHeader />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>        
        <Footer />
      </BrowserRouter>
    </div>
  )
}

function AuthenticateApp() {
  const { user: { user } } = useUsuario();
  const [classApp, setClassApp] = useState('app-responsive');
  const [classMenu, setClassMenu] = useState({ 0: 'menu fade', 1: 'hide-menu' });
  const showHideMenu = (show) => {
    if (show) {
      setClassApp('App');
      setClassMenu({ 0: 'menu fade show', 1: 'content-menu' });
    } else {
      setClassApp('app-responsive');
      setClassMenu({ 0: 'menu fade', 1: 'hide-menu' });
    }
  }

  return (
    <div className={classApp}>
      <BrowserRouter>
        <Header showHideMenu={showHideMenu} />
        <Menu classMenu={classMenu} />
        <Suspense fallback={<Spinner />}>
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
            </Switch>
          </div>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

function App() {
  const { user: { info } } = useUsuario();
  return info ? <AuthenticateApp /> : <UnauthenticateApp />
}

export default App;
