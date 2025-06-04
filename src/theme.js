import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#1976d2'
    },
    background: {
      default: '',
    },
    text: {
      primary: '#ffff',
      secondary: '#ffff',
      
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          transition: 'transform 1s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            backgroundColor: '#1976d2',
            
          },
          backgroundColor: '#1976d2', // puedes cambiarlo a algo más personalizado
        },
      },
      defaultProps: {
        elevation: 4,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          textAlign: 'center',
          gap: '100px'
        },
      },
    },
  },
});

export default theme;