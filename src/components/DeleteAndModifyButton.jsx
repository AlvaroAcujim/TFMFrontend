import React from 'react'

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export const DeleteAndModifyButton = ({type, color, onClick}) => {

  return (
    <>
      <Button variant="contained" size='large'
      onClick={
        () => {
          onClick()
        }
      }
      sx={{
        height: {
      xs: '20dvh',
      md: '20dvh',
    }, 
    //onClick={},
    width: {xs: '100%', md: '50%'},
    fontSize: '1.3rem',
    fontWeight: 900,
    backgroundColor: '#202020',
     border: '3px solid transparent',
     transition: 'border 0.3s ease',
     color: color,
  '&:hover': {
    borderColor: color,
  }
      }}>{type === 'delete' ? (<><DeleteIcon/>Eliminar tabla</>) :  <><EditIcon/>Editar tabla</>} </Button>
    </>
  )
}
export default DeleteAndModifyButton;
