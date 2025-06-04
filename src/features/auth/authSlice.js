import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token || null,
  exerciseTable: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, {rejectWithValue}) => {
  try{
    const loginRes = await axios.post('http://localhost:3000/api/users/login', credentials);
    const token = loginRes.data;
    localStorage.setItem('token',token);
    const {identifier} = credentials;
    const userRes = await axios.get(`http://localhost:3000/api/users/login/${identifier}`,credentials.identifier, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userTable = await axios.get('http://localhost:3000/api/exerciseTable/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(userTable.data)
    
    return {token, user: userRes.data, exerciseTable: userTable.data};
  }catch(err){
    const message =
        err.response?.data?.message || 'Error en el login. Revisa tus credenciales.';
      return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.exerciseTable = action.payload.exerciseTable;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;