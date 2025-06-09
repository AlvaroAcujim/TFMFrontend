import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import axios from 'axios';
import './RegisterDialog.css'
import Stack from '@mui/material/Stack';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import CachedIcon from '@mui/icons-material/Cached';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAutomaticExerciseTable } from '../features/exerciseTable/exerciseTableSlice'; // ajusta la ruta si es distinta
export default function DialogExercise({open, handleClose, requiredGym}) {
  const dispatch = useDispatch();

  const handleCreateTable = (type) => async () => {
  try {
    await dispatch(createAutomaticExerciseTable({ type, requiredGym }));
    handleClose();
  } catch (error) {
    console.error("Error creando tabla automática:", error);
  }
};
  
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => {
        handleClose();
      }}
      sx={{ backgroundColor: '#00000088' }}
    >
      <DialogTitle sx={{ backgroundColor: '#000000', color: 'white', textAlign: 'center'}}>
        Crear tabla automática o manual
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#000000' }}>
        <DialogContentText sx={{ color: 'white' }}>

            <Stack spacing={2} component={"section"} direction={{ xs: 'column', md: 'column' } }>
      <Button variant="contained" size='large'
      sx={{
        height: {
      xs: '50%',
      md: '50%',
    }, 
    width: {xs: '90%', md: '90%'},
    fontSize: '1rem',
    fontWeight: 900,
    boxSizing: 'content-box',
    backgroundColor: '#202020',
     border: '3px solid transparent',
     transition: 'border 0.3s ease',
  '&:hover': {
    borderColor: '#f5c518',
  }
      }}
       component={Link}
      to="/createExerciseTable"
       state={{ requiredGym: requiredGym }}><PanToolAltIcon sx={{ fontSize: 80, color: '#d2a119' }}/> Selección personalizada </Button>
      <Button variant="contained" size='large' 
      onClick={handleCreateTable('autoFullBody')}
      sx={{
        height: {
      xs: '50%',
      md: '50%',
    }, fontSize: '1rem',
    boxSizing: 'content-box',
     width: {xs: '90%', md: '90%'},
    fontWeight: 900,
    border: '3px solid transparent',
    backgroundColor: '#202020',
     transition: 'border 0.3s ease',
  '&:hover': {
    borderColor: '#f5c518',
  }
    
      }}><CachedIcon sx={{ fontSize: 80, color: '#d2a119' }}/>Selección automática. <br></br>fullBody (principiante)</Button>
    <Button variant="contained" size='large' 
    onClick={handleCreateTable('auto')} 
      sx={{
        height: {
      xs: '50%',
      md: '50%',
    }, fontSize: '1rem',
    boxSizing: 'content-box',
     width: {xs: '90%', md: '90%'},
    fontWeight: 900,
    border: '3px solid transparent',
    backgroundColor: '#202020',
     transition: 'border 0.3s ease',
  '&:hover': {
    borderColor: '#f5c518',
  }
    
      }}><CachedIcon sx={{ fontSize: 80, color: '#d2a119' }}/>Selección automática. <br></br>grupo muscular por día (avanzado) </Button>
    </Stack>
        </DialogContentText>

      </DialogContent>

      <DialogActions sx={{ backgroundColor: '#000000' }}>
        <Button
          onClick={() => {
            handleClose();
          }}
          sx={{ backgroundColor: '#d2a119', color: 'black' }}
        >
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
}