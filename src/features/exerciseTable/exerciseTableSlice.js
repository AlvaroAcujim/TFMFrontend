import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  exerciseTable: [],
  status: 'idle',
  error: null,
  editingTable: null
};
const API_URL = process.env.REACT_APP_API_URL;
export const fetchUserExerciseTable = createAsyncThunk(
  'exerciseTable/fetchUserExerciseTable',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`${API_URL}exerciseTable/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al cargar tablas');
    }
  }
);

export const deleteTable = createAsyncThunk(
  'exerciseTable/deleteTable',
  async (tableId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${API_URL}/exerciseTable/${tableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return tableId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al eliminar tabla');
    }
  }
);
export const createExerciseTable = createAsyncThunk(
  'exerciseTable/createExerciseTable',
  async ({name, exercisesByDay}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/exerciseTable`,
        { name, exercisesByDay },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al crear la tabla');
    }
  }
);

const exerciseTableSlice = createSlice({
  name: 'exerciseTable',
  initialState,
  reducers: {
    setEditingTable: (state, action) => {
      state.editingTable = action.payload;
    },
    clearEditingTable: (state) => {
      state.editingTable = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserExerciseTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserExerciseTable.fulfilled, (state, action) => {
        if (action.payload) {
        state.status = 'succeeded';
        state.exerciseTable = action.payload;
        }
      })
      .addCase(fetchUserExerciseTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.exerciseTable = state.exerciseTable.filter((t) => t._id !== action.payload);
      })
      .addCase(createExerciseTable.pending, (state) => {
      state.status = 'loading';
      })
      .addCase(createExerciseTable.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exerciseTable.push(action.payload);
      })
      .addCase(createExerciseTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      
  },
});

export const { setEditingTable, clearEditingTable } = exerciseTableSlice.actions;
export default exerciseTableSlice.reducer;