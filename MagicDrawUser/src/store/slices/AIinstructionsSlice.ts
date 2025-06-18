import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "../../authTokenManager";

// Type for the instructions state
export interface ColorInstructionsState {
  instructions: string;
  loading: boolean;
  error: string | null;
}
const baseUrl = 'https://magicdrawapi.onrender.com/api/';
// Async thunk to fetch color instructions from the AI API
export const fetchColorInstructions = createAsyncThunk(
  "colorInstructions/fetch",
  async (imageUrl: string, thunkAPI) => {
    console.log("Fetching color instructions for image:", imageUrl);

    try {
      const response = await axios.post(
        `${baseUrl}AIIndruction/aiDrawingInstructions`,
        { path: imageUrl },
        {
          headers: {
            ...getAuthHeader(),
          }
        }
      );
      return response.data as string;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Slice for color instructions
const colorInstructionsSlice = createSlice({
  name: "colorInstructions",
  initialState: {
    instructions: "",
    loading: false,
    error: null,
  } as ColorInstructionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColorInstructions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColorInstructions.fulfilled, (state, action) => {
        state.loading = false;
        state.instructions = action.payload;
      })
      .addCase(fetchColorInstructions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default colorInstructionsSlice.reducer;