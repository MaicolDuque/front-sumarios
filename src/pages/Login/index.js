import React, { useEffect, useState } from 'react'

import { useUsuario } from '../../context/user-context'
import logoGoogle from './btn_google.png'
import Spinner from '../../components/Spinner'
import './estilos.css'

export default () => {
  const [infoLogin, setInfoLogin] = useState({ email: '', password: '' });
  const { user, login } = useUsuario();

  useEffect(() => {
    login()
  }, [])

  const handleSumbit = (e) => {
    e.preventDefault();
    window.open("http://localhost:4000/auth/google", "_self");
  }

  const handleChange = (e) => {
    setInfoLogin({
      ...infoLogin,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="content-login">
      { user.status === 'pending' ? <Spinner /> : null }
      <div className="form-login">
        <h2 className="form-title">Log in</h2>
        <form className="form">
          <div>
            <img onClick={handleSumbit} src={logoGoogle} alt="Sign in with google" className="btn-google" />
          </div>
        </form>
      </div>
    </div>
  )
}