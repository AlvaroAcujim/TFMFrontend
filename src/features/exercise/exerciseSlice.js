import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch de ejercicios
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
      return rejectWithValue(error.response?.data?.message || "Error al obtener ejercicios.");
    }
  }
);

// Fetch filtrado por requiredGym
export const fetchExercisesFiltered = createAsyncThunk(
  "exercise/fetchExercisesFiltered",
  async (requiredGym, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/exercise/gymRequirement/${requiredGym}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener ejercicios filtrados.");
    }
  }
);

// Fetch de imágenes
export const fetchExerciseImages = createAsyncThunk(
  "exercise/fetchExerciseImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/exercise/exerciseImages");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error al obtener imágenes.");
    }
  }
);

// Fetch combinado: ejercicios + imágenes + filtrado opcional
export const fetchExercisesWithImages = createAsyncThunk(
  "exercise/fetchExercisesWithImages",
  async (requiredGym = undefined, { dispatch, rejectWithValue }) => {
    try {
      //const token = localStorage.getItem("token");

      // Fetch ejercicios (filtrado si se pasa requiredGym)
      const exercises = requiredGym
        ? await dispatch(fetchExercisesFiltered(requiredGym)).unwrap()
        : await dispatch(fetchExercises()).unwrap();

      // Fetch imágenes
      const images = await dispatch(fetchExerciseImages()).unwrap();

      // Combinar por nombre (slugify)
      const merged = exercises.map(exercise => {
        const matchedImage = images.find(
          img => img.name.toLowerCase().replace(/\s/g, '-') === exercise.name.toLowerCase().replace(/\s/g, '-')
        );
        return {
          ...exercise,
          imagebase: matchedImage ? matchedImage.base64 : null
        };
      });

      return merged;
    } catch (error) {
      return rejectWithValue(error.message || "Error al combinar ejercicios e imágenes.");
    }
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
      })
      .addCase(fetchExercisesWithImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercisesWithImages.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercisesWithImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default exerciseSlice.reducer;