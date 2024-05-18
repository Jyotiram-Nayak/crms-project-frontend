const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;

//register new user
export const addJobApplication = createAsyncThunk(
  "addJobApplication",
  async (val: object) => {
    const userToken = getCookie("token");
    try {
      const applyJob = await axios.post(
        `${BASE_URL}/jobapplication/add-job-application`,
        val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return applyJob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const fetchAllJobApplication = createAsyncThunk(
  "fetchAllJobApplication",
  async () => {
    const userToken = getCookie("token");
    try {
      const getjob = await axios.get(
        `${BASE_URL}/jobapplication/get-job-applications/`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return getjob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const JobAssessment = createAsyncThunk(
  "JobAssessment",
  async ({applicationId,val}:{applicationId:string,val:object}) => {
    try {
      const userToken = getCookie("token");
      const getjob = await axios.put(
        `${BASE_URL}/jobapplication/job-assessment/${applicationId}`,val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return getjob.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//user initial state
const initialState = {
  jobApplication: [],
  error: null,
};

//student slice
const JobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addJobApplication.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addJobApplication.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(addJobApplication.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllJobApplication.pending, (state: any) => {
        state.status = "loading";
        state.jobApplication = null;
        state.error = null;
      })
      .addCase(fetchAllJobApplication.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        console.log("<<<jobApplication", action.payload.data)
        state.jobApplication = action.payload.data;
      })
      .addCase(fetchAllJobApplication.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(JobAssessment.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(JobAssessment.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(JobAssessment.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default JobApplicationSlice.reducer;
