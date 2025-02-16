import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";

const initialState = {
  loading: false,
  cinema: '',
  error: '',
};

export const signUpCinemaAdmin = createAsyncThunk(
  'cinema/signCinemaAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`cinema/signup`, credentials,{ withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const cinemaSlice = createSlice({
  name: "cinema",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpCinemaAdmin.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(signUpCinemaAdmin.fulfilled, (state, action) => { 
        state.loading = false;
        state.error = "";
      })
      .addCase(signUpCinemaAdmin.rejected, (state, action) => {
        state.loading = false;
        state.cinema = '';
        state.error = action.payload; 
      })
  },
});

export default cinemaSlice.reducer;
