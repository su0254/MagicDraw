import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UpLoadPaintingPaintedType } from "../../types/UpLoadPaintingPaintedType";

// API base URL
const baseUrl = 'http://localhost:5058/api/';

// Async thunk for adding a painted painting
export const addPaintedPainting = createAsyncThunk(
  'paintedPaintings/add',
  async (paintingData: UpLoadPaintingPaintedType, thunkAPI) => {
    try {
        paintingData.userId = localStorage.getItem('userId') as string;
        const formData = new FormData();
        Object.entries(paintingData).forEach(([key, value]) => {
          formData.append(key, value);
        });

      const response = await axios.post(`${baseUrl}PaintedPainting`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // Return the response data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching painted paintings by user ID
export const fetchPaintedPaintingsByUser = createAsyncThunk(
  'paintedPaintings/fetchByUser',
  async (_, thunkAPI) => {
    try {
      const userId = localStorage.getItem('userId'); // שליפת מזהה המשתמש מ-localStorage
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const response = await axios.get(`${baseUrl}PaintedPainting/paintedPaintings/user/${userId}`);
      return response.data; // החזרת רשימת הציורים הצבועים
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const paintingPaintedSlice = createSlice({
  name: 'paintedPaintings',
  initialState: {
    list: [] as any[], // List of painted paintings
    loading: false, // Loading state
    error: null as string | null, // Error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add painted painting
      .addCase(addPaintedPainting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaintedPainting.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new painted painting to the list
      })
      .addCase(addPaintedPainting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch painted paintings by user ID
      .addCase(fetchPaintedPaintingsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaintedPaintingsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Update the list with fetched painted paintings
      })
      .addCase(fetchPaintedPaintingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paintingPaintedSlice.reducer;