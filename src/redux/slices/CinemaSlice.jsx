import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../utils/AxiosInstance";
import { decryptId } from "../../utils/Crypto";

const initialState = {
  loading: false,
  cinemas: [],
  currentPage: 1,
  totalPages: 1,
  totalCenima: 0,
  cinema: "",
  error: "",
};

export const getAllCinema = createAsyncThunk(
  "cinema/getAllCinema",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await Api.get(`cinema/all-cinema`, {
        params: { page, limit },
      });

      if (res.data.success) {
        return {
          cinemas: res.data.cinemas,
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalCenima: res.data.totalCenima,
        };
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signUpCinemaAdmin = createAsyncThunk(
  "cinema/signCinemaAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await Api.post(`cinema/signup`, credentials, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteCinema = createAsyncThunk(
  "users/deleteCinema",
  async ({ userId, page, limit }, { rejectWithValue, dispatch }) => {
    try {
        const decryptedId = decryptId(userId);
        await Api.delete(`cinema/delete/${decryptedId}`, { withCredentials: true });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const viewSelectedCinema = createAsyncThunk("cinema/viewSelectedCinema", async(userId, {rejectWithValue})=>{
  try {
      const decryptedId = decryptId(userId);
      const res = await Api.get(`cinema/cinema/${decryptedId}`, { withCredentials: true });
      return res.data;
  } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
  }
});

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
        state.cinema = "";
        state.error = action.payload;
      })
      .addCase(getAllCinema.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllCinema.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemas = action.payload.cinemas;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalCenima = action.payload.totalCenima;
        state.error = "";
      })
      .addCase(getAllCinema.rejected, (state, action) => {
        state.loading = false;
        state.cinemas = [];
        state.error = action.payload;
      });
  },
});

export default cinemaSlice.reducer;
