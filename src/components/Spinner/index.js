import { CircularProgress } from '@material-ui/core'
import React from 'react'
import './estilos.css'

export default () => (
  <div className="bg-loading">
    <CircularProgress disableShrink className="loader" size="4rem" color="inherit"/>
  </div>
)