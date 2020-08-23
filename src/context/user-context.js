import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

const UsuarioContext = React.createContext();

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const getUser = () => sleep(1000)
  // .then(() => ({ nombre: 'Maicol Duque' }))
  .then(() => null)

function UsuarioProvider({children}) {

  const [ user, setUser ] = useState({
    status: 'pending',
    error: null,
    user: null,
  });

  useEffect(() => {
    getUser()
      .then(user => setUser({status: 'success', error: null, user }) )
  }, [])

  return (
    <UsuarioContext.Provider value={{ user, setUser }}  >
      {user.status === 'pending' ? (
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
      )}
    </UsuarioContext.Provider>
  )
}

const useUsuario = () => React.useContext(UsuarioContext);

export { UsuarioProvider, useUsuario }