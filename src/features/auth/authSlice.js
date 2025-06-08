import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data: token } = await axios.post('http://localhost:3000/api/users/login', credentials);
      localStorage.setItem('token', token);
      const userRes = await axios.get(`http://localhost:3000/api/users/login/${credentials.identifier}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { token, user: userRes.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Datos incorrectos');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: token || null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;