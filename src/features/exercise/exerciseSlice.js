import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExercises = createAsyncThunk(
  "exercise/fetchExercises",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/exercise", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Error al obtener ejercicios.");
    }
  }
);
export const fetchExercisesFiltered = createAsyncThunk(
  'exercise/fetchExercisesFiltered',
  async (requiredGym) => {
    const response = await axios.get(`http://localhost:3000/api/exercise/gymRequirement/${requiredGym}`);
    return response.data;
  }
);

const exerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    exercises: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExercisesFiltered.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchExercisesFiltered.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
    })
    .addCase(fetchExercisesFiltered.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default exerciseSlice.reducer;