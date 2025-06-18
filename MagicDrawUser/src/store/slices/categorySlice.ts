import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader } from "../../authTokenManager";

// API base URL
const baseUrl = 'https://magicdrawapi.onrender.com/api/';

// Fetch all categories from the server
export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, thunkAPI) => {
    try {
        console.log('Fetching categories...');
        // const token = sessionStorage.getItem('authToken'); // Retrieve the token from session storage
        const response = await axios.get(`${baseUrl}Category`,
            {
                headers: {
                    ...getAuthHeader(),
                }
            }
        );
        console.log('Categories fetched:', response.data);
        return response.data; // Ensure this matches your API response structure
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

// Create the slice
const categorySlice = createSlice({
    name: 'categories',
    initialState: { list: [] as string[], loading: false, error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                console.log('Fetching categories...');
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                console.log('Fetch categories fulfilled');
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.log('Fetch categories failed');
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;