import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  exerciseTable: [],
  tableImages: {},
  status: 'idle',
  error: null,
  editingTable: null
};

export const fetchUserExerciseTable = createAsyncThunk(
  'exerciseTable/fetchUserExerciseTable',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get('http://localhost:3000/api/exerciseTable/user', {
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
      await axios.delete(`http://localhost:3000/api/exerciseTable/${tableId}`, {
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
        'http://localhost:3000/api/exerciseTable',
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
export const createAutomaticExerciseTable = createAsyncThunk(
  'exerciseTable/createAutomaticExerciseTable',
  async ({ type, requiredGym }, { rejectWithValue }) => {
    try {
      console.log("Thunk ejecutado con:", type, requiredGym);
      const token = localStorage.getItem("token");

      let endpoint;
      if (type === 'auto') {
        endpoint = 'http://localhost:3000/api/exerciseTable/auto';
      } else if (type === 'autoFullBody') {
        endpoint = 'http://localhost:3000/api/exerciseTable/autoFullBody';
      } else {
        throw new Error('Tipo de tabla automática no válido');
      }

      const res = await axios.post(
        endpoint,
        { requiredGym },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al crear la tabla automática');
    }
  }
);
export const fetchTableImages = createAsyncThunk(
  'exerciseTable/fetchTableImages',
  async (tableId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/exerciseTable/${tableId}/images`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { tableId, images: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al cargar imágenes');
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
      })
      .addCase(createAutomaticExerciseTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAutomaticExerciseTable.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exerciseTable.push(action.payload);
      })
      .addCase(createAutomaticExerciseTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchTableImages.fulfilled, (state, action) => {
        const { tableId, images } = action.payload;
        state.tableImages[tableId] = images;
      })
      .addCase(fetchTableImages.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  },
});

export const { setEditingTable, clearEditingTable } = exerciseTableSlice.actions;
export default exerciseTableSlice.reducer;