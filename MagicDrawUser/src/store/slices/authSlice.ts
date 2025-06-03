import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserLoginType } from "../../types/UserLoginType";
import { UserRegisterType } from "../../types/UserRegisterType";

// API base URL
const baseUrl = 'https://magicdrawapi.onrender.com/api/';

// Login to the server
export const login = createAsyncThunk('data/login', async (data: UserLoginType, thunkAPI) => {
  try {
    console.log('Logging in...');
    console.log("data", data);
    console.log("url", `${baseUrl}Auth/login`);

    const response = await axios.post(`${baseUrl}Auth/login`,
      {
        email: data.mail,
        password: data.password,
      }
    );
    console.log(response);
    sessionStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    return response.data; // Ensure this matches your API response structure
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// Add a new user to the database
export const addUser = createAsyncThunk('data/addUser', async (data: UserRegisterType, thunkAPI) => {
  try {
    console.log('Adding user...');
    console.log("data", data);
    console.log("url", `${baseUrl}Auth/register`);

    const response = await axios.post(`${baseUrl}Auth/register`,
      {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.mail,
        Password: data.password,
      }
    );
    console.log(response.data);
    return response.data; // Ensure this matches your API response structure
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// Create the slice
const loginSlice = createSlice({
  name: 'data',
  initialState: { list: [] as UserLoginType[], loading: true, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled');
        state.list = [...state.list, { ...action.payload }];
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login failed');
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        console.log('Logging in...');
        state.error = null;
      })
      // Add user cases
      .addCase(addUser.fulfilled, (state, action) => {
        console.log('Add user fulfilled');
        state.list = [...state.list, { ...action.payload }];
      })
      .addCase(addUser.rejected, (state, action) => {
        console.log('Add user failed');
        state.error = action.payload as string;
      })
      .addCase(addUser.pending, (state) => {
        console.log('Adding user...');
        state.error = null;
      });
  },
});

export default loginSlice.reducer;