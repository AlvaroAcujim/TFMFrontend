import Router  from './routes/Router.jsx'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
function App() {

  return (
    <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <BrowserRouter>
    <Router></Router>
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
    </>
  )
}

export default App
