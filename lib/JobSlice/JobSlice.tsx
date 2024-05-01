const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;
//get user information
const userToken = getCookie("token");
//register new user
export const addJob = createAsyncThunk(
  "addJob",
  async (val: object) => {
    try {
      const createJob = await axios.post(
        `${BASE_URL}/job/add-job`,
        val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createJob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const fetchAllJob = createAsyncThunk(
  "fetchAllJob",
  async () => {
    try {
      const getjob = await axios.get(
        `${BASE_URL}/job/get-all-job/`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return getjob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const approveJob = createAsyncThunk(
  "approveJob",
  async (jobId: string) => {
    try {
      const approvejob = await axios.put(
        `${BASE_URL}/job/approve/${jobId}`,
        null,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = approvejob.data;
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const rejectjob = createAsyncThunk(
  "rejectjob",
  async (jobId: string) => {
    try {
      const rejectjob = await axios.put(
        `${BASE_URL}/job/reject/${jobId}`,
        null,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return rejectjob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);


//user initial state
const initialState = {
  job: [],
  error: null,
};

//student slice
const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addJob.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(addJob.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllJob.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllJob.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(fetchAllJob.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(approveJob.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(approveJob.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(approveJob.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(rejectjob.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(rejectjob.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(rejectjob.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// export const {student} = StudentSlice.actions;
export default JobSlice.reducer;
