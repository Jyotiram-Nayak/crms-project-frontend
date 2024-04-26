const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;
//get user information
const userToken = getCookie("token");
//register new user
export const addApplication = createAsyncThunk(
  "addApplication",
  async (universityId: string) => {
    try {
      const createApplication = await axios.post(
        `${BASE_URL}/application/add-application/${universityId}`, null,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createApplication.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const fetchAllApplication = createAsyncThunk(
  "fetchAllApplication",
  async () => {
    try {
      const getApplication = await axios.get(`${BASE_URL}/application/get-all-applications/`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return getApplication.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//user initial state
const initialState = {
  application: [],
  error: null,
};

//student slice
const AppicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addApplication.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addApplication.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(addApplication.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllApplication.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllApplication.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(fetchAllApplication.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// export const {student} = StudentSlice.actions;
export default AppicationSlice.reducer;
