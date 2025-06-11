import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DialogExercise from './DialogExercise';
import { useState } from 'react';

const PlanButton = () => {
  const [open, setOpen] = useState(false);
  const [requiredGym, setRequiredGym] = useState(false);
  return (
    <Stack spacing={2} component={"section"} direction={{ xs: 'column', md: 'row' } }>
      <Button variant="contained" size='large'
      onClick={
        () => {
        setRequiredGym(false)
        setOpen(true)
        }
      }
      sx={{
        height: {
      xs: '30dvh',
      md: '40dvh',
    }, 
    width: {xs: '100%', md: '50%'},
    fontSize: '1.3rem',
    fontWeight: 900,
    backgroundColor: '#202020',
     border: '3px solid transparent',
     transition: 'border 0.3s ease',
  '&:hover': {
    borderColor: '#f5c518',
  }
      }}><HomeIcon sx={{ fontSize: 80, color: '#d2a119' }}/> Entrenamiento en casa </Button>
      <Button variant="contained" size='large'
      onClick={
        () => {
        setRequiredGym(true)
        setOpen(true)
        }
      }
      sx={{
        height: {
      xs: '30dvh',
      md: '40dvh',
    }, fontSize: '1.3rem',
     width: {xs: '100%', md: '50%'},
    fontWeight: 900,
    border: '3px solid transparent',
    backgroundColor: '#202020',
     transition: 'border 0.3s ease',
  '&:hover': {
    borderColor: '#f5c518',
  }
    
      }}><FitnessCenterIcon sx={{ fontSize: 80, color: '#d2a119' }}/>Entrenamiento en Gimnasio</Button>
    <DialogExercise  
    open={open}
    handleClose={() => setOpen(false)}
    requiredGym={requiredGym}
    />
    </Stack>
  )
}
export default PlanButton