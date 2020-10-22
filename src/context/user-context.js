import React, { useState } from 'react';

import { LoginService } from '../services/user';
import Spinner from '../components/Spinner';

const UsuarioContext = React.createContext();

function UsuarioProvider({ children }) {
  const [token, setToken] = useState(
    () => window.sessionStorage.getItem('token')
  )

  const [user, setUser] = useState({
    status: 'success',
    error: null,
    info: token,
  });

  const login = () => {
    setUser({ ...user, status: 'pending' })
    LoginService({
      cbSuccess: (json) => {
        setUser({ status: 'success', error: null, info: json.user });
        setToken(json.token);
        window.sessionStorage.setItem('token', json.token);
      },
      cbError: (error) => {
        window.sessionStorage.removeItem('token')
        setUser({ info: null, status: 'error', error: { message: error.toString() } })
      }
    })
  }

  const register = () => { } // register the user

  const logout = () => {
    window.sessionStorage.removeItem('token');
    setToken(null);
    setUser({ status: 'success', error: null, user: null, });
  }

  return (
    <UsuarioContext.Provider value={{
      token: Boolean(token),
      login,
      logout,
      user,
      setUser,
      setToken
    }}  >
      {/* {user.status === 'pending' ? (
        <Spinner />
      ) : user.status === 'error' ? (
        <div>
          Oh no
          <div>
            <pre>{user.error.message}</pre>
          </div>
        </div>
      ) : (
            children
          )} */}
          { children }
    </UsuarioContext.Provider>
  )
}

const useUsuario = () => React.useContext(UsuarioContext);

export { UsuarioProvider, useUsuario }