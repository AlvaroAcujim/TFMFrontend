import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data: token } = await axios.post('https://tfmbackend-mr4r.onrender.com/api/users/login', credentials);
      localStorage.setItem('token', token);
      const userRes = await axios.get(`https://tfmbackend-mr4r.onrender.com/api/users/login/${credentials.identifier}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { token, user: userRes.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Datos incorrectos');
    }
  }
);
export const fetchUserFromToken = createAsyncThunk(
  'auth/fetchUserFromToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await axios.get('https://tfmbackend-mr4r.onrender.com/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { user: response.data, token };
    } catch (error) {
      return rejectWithValue('Invalid token or failed to fetch user', error);
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
      }).addCase(fetchUserFromToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFromToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchUserFromToken.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;