const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;
//get user information

//register new user
export const addStudent = createAsyncThunk(
  "addStudent",
  async (val: object) => {
    const userToken = getCookie("token");
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
  async (val:object) => {
    const userToken = getCookie("token");
    try {
      const createStudent = await axios.get(`${BASE_URL}/Student/get-all-students`,
        {params :val, headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createStudent.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  "fetchStudentById",
  async (studentId:string) => {
    const userToken = getCookie("token");
    try {
      const student = await axios.get(`${BASE_URL}/Student/get-student-details/${studentId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return student.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "updateStudent",
  async ({studentId, val} :{studentId:string, val:object} ) => {
    console.log(val);
    try {
      const userToken = getCookie("token");
      const student = await axios.put(`${BASE_URL}/Student/update-student/${studentId}`,val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(student.data);
      return student.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (studentId:string) => {
    const userToken = getCookie("token");
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

export const importExcelFile = createAsyncThunk(
  "importExcelFile",
  async (val: object) => {
    const userToken = getCookie("token");
    try {
      const createStudent = await axios.post(`${BASE_URL}/Student/import-excel-file`,val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return createStudent.data;
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
        state.student = null;
        state.error = null;
      })
      .addCase(fetchAllStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        console.log("<<<", action.payload.data)
        state.student = action.payload.data
      })
      .addCase(fetchAllStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentById.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(fetchStudentById.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(updateStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.student = state.student.filter((student:any) => student.userId !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(importExcelFile.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(importExcelFile.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(importExcelFile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// export const {student} = StudentSlice.actions;
export default StudentSlice.reducer;
