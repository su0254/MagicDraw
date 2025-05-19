import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UpLoadPaintingType } from "../../types/UpLoadPaintingType";

// API base URL
const baseUrl = 'http://localhost:5058/api/';

// Async thunk for adding a new painting
export const addPainting = createAsyncThunk(
  'paintings/add',
  async (paintingData: UpLoadPaintingType, thunkAPI) => {
    try {
      paintingData.userId = localStorage.getItem('userId') as string;
      console.log('paintingData', paintingData);
      const formData = new FormData();
      Object.entries(paintingData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log('formData פשןמאןמע', formData);

      const response = await axios.post(`${baseUrl}Painting`, formData, {
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

// Async thunk for fetching all paintings
export const fetchPaintings = createAsyncThunk(
  'paintings/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}Painting`);
      console.log('response', response.data);
      
      return response.data; // Return the list of paintings
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for fetching paintings by category
export const fetchPaintingsByCategory = createAsyncThunk(
  'paintings/fetchByCategory',
  async (categoryId: string, thunkAPI) => {
    try {
      console.log('categoryId', categoryId);
      const response = await axios.get(`${baseUrl}Painting/GetByCategory/${categoryId}`);
      return response.data; // Return the list of paintings for the given category
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    list: [] as any[], // List of paintings
    loading: false, // Loading state
    error: null as string | null, // Error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add painting
      .addCase(addPainting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPainting.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // Add the new painting to the list
      })
      .addCase(addPainting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch paintings
      .addCase(fetchPaintings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaintings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Update the list with fetched paintings
      })
      .addCase(fetchPaintings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch paintings by category
      .addCase(fetchPaintingsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaintingsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Update the list with paintings for the given category
      })
      .addCase(fetchPaintingsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paintingsSlice.reducer;