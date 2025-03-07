import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import axios from "axios";

const initialState = {
  loading: false,
  user: '',
  error: '',
};

export const loggWebAdmin = createAsyncThunk(
  'user/loggWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`auth/signin`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signUpWebAdmin = createAsyncThunk(
  'user/signUpWebAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`auth/signup`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async ( _, { rejectWithValue }) => {
    try {
      const res = await Api.post(`auth/signout`, null, { withCredentials: true });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const webAdminSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loggWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(loggWebAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(loggWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.user = '';
        state.error = action.payload; 
      })
      .addCase(signUpWebAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(signUpWebAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(signUpWebAdmin.rejected, (state, action) => {
        state.loading = false;
        state.user = '';
        state.error = action.payload; 
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.user = '';
        state.error = action.payload; 
      })
  },
});

export default webAdminSlice.reducer;
