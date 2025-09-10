import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './RegisterDialog.css'
import { useState } from 'react';
import schema from '../components/Form/yupRegister'

export default function FormDialog({open, handleClose}) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'user'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post('https://tfmbackend-mr4r.onrender.com/api/users/', data);
      setSuccess('¡Cuenta creada con éxito!');
      reset();
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
        handleClose();
      }, 2500);
    } catch (err) {
      setError('Error al registrar usuario.');
      setLoading(false);
      console.log(err)
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => {
        reset();
        setError(null);
        setSuccess(null);
        handleClose();
      }}
      sx={{ backgroundColor: '#00000088' }}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
        sx: { backgroundColor: '#000', textAlign: 'center' }
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#000000', color: 'white' }}>
        Registro de usuario
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#000000' }}>
        <DialogContentText sx={{ color: 'white' }}>Rellene todos los campos</DialogContentText>

        <TextField
          autoFocus
          fullWidth
          variant="standard"
          label="Nombre"
          margin="dense"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            background: '#13131362',
            '& label': { color: '#ffffff' },
            '& label.Mui-focused': { color: '#ffffff' },
            '& .MuiInput-underline:after': { borderBottomColor: '#d2a119' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#ffffff' }
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          label="Nombre de usuario"
          margin="dense"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{
            background: '#13131362',
            '& label': { color: '#ffffff' },
            '& label.Mui-focused': { color: '#ffffff' },
            '& .MuiInput-underline:after': { borderBottomColor: '#d2a119' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#ffffff' }
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          label="Email"
          margin="dense"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            background: '#13131362',
            '& label': { color: '#ffffff' },
            '& label.Mui-focused': { color: '#ffffff' },
            '& .MuiInput-underline:after': { borderBottomColor: '#d2a119' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#ffffff' }
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          label="Contraseña"
          type="password"
          margin="dense"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            background: '#13131362',
            '& label': { color: '#ffffff' },
            '& label.Mui-focused': { color: '#ffffff' },
            '& .MuiInput-underline:after': { borderBottomColor: '#d2a119' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#ffffff' }
          }}
        />
        {error && (
          <p style={{ color: 'red', backgroundColor: 'black', marginTop: '10px' }}>{error}</p>
        )}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
      </DialogContent>

      <DialogActions sx={{ backgroundColor: '#000000' }}>
        <Button
          onClick={() => {
            reset();
            setError(null);
            setSuccess(null);
            handleClose();
          }}
          sx={{ backgroundColor: '#d2a119', color: 'black' }}
        >
          Salir
        </Button>
        <Button
          type="submit"
          disabled={loading}
          sx={{ backgroundColor: '#d2a119', color: 'black' }}
        >
          {loading ? 'Creando...' : 'Crear cuenta'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}