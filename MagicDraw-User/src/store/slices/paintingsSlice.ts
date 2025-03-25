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
            const formData = new FormData();
            Object.entries(paintingData).forEach(([key, value]) => {
                formData.append(key, value);
            });

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
            });
    },
});

export default paintingsSlice.reducer;