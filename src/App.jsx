import Router  from './routes/Router.jsx'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromToken } from './features/auth/authSlice';
function App() {
const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserFromToken());
    }
  }, [dispatch, token, user]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <BrowserRouter>
    <Router></Router>
    </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
