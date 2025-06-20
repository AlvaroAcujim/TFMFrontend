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
      const res = await axios.get('https://tfmbackend-mr4r.onrender.com/api/exerciseTable/user', {
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
      await axios.delete(`https://tfmbackend-mr4r.onrender.com/api/exerciseTable/${tableId}`, {
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
        'https://tfmbackend-mr4r.onrender.com/api/exerciseTable',
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
        endpoint = 'https://tfmbackend-mr4r.onrender.com/api/exerciseTable/auto';
      } else if (type === 'autoFullBody') {
        endpoint = 'https://tfmbackend-mr4r.onrender.com/api/exerciseTable/autoFullBody';
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
        `https://tfmbackend-mr4r.onrender.com/api/exerciseTable/${tableId}/images`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { tableId, images: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al cargar imágenes');
    }
  }
);
export const updateExerciseTable = createAsyncThunk(
  'exerciseTable/updateExerciseTable',
  async ({ tableId, name,  updatedExercisesByDay }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://tfmbackend-mr4r.onrender.com/api/exerciseTable/${tableId}`,
        { name, exercisesByDay: updatedExercisesByDay },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error al actualizar la tabla');
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
    addExerciseTable(state, action) {
      state.exerciseTable.push(action.payload);
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
      })
      .addCase(updateExerciseTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExerciseTable.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.exerciseTable.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.exerciseTable[index] = action.payload;
        }
      })
      .addCase(updateExerciseTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      
  },
});

export const { setEditingTable, clearEditingTable, addExerciseTable  } = exerciseTableSlice.actions;
export default exerciseTableSlice.reducer;