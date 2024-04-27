const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;
//get user information
const userToken = getCookie("token");
//register new user
export const addStudent = createAsyncThunk(
  "addStudent",
  async (val: object) => {
    try {
      const createStudent = await axios.post(`${BASE_URL}/Student/add-student`,val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createStudent.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const fetchAllStudent = createAsyncThunk(
  "fetchAllStudent",
  async () => {
    try {
      const createStudent = await axios.get(`${BASE_URL}/Student/get-all-students`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createStudent.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (studentId:string) => {
    try {
      const deleteStudent = await axios.delete(`${BASE_URL}/Student/delete-student/${studentId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return deleteStudent.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//user initial state
const initialState = {
  student: [],
  error: null,
};

//student slice
const StudentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addStudent.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(addStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllStudent.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(fetchAllStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(deleteStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// export const {student} = StudentSlice.actions;
export default StudentSlice.reducer;
