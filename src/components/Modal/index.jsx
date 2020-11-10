import React from 'react'

// Components to implements modal
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Modal({ open, title, textCancel='Cancelar', textOk='Guardar', clickOk, close, children }) {

  return (
    <Dialog open={open}  aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={()=>close()}>
          {textCancel}
          </Button>
        <Button color="primary" onClick={()=>clickOk()}>
          {textOk}
          </Button>
      </DialogActions>
    </Dialog>
  )
}