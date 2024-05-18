const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { deleteCookie, setCookie, getCookie } from "cookies-next";

//base url for backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_OFFLINE;

//register new user
export const userRegister = createAsyncThunk(
  "userRegister",
  async (val: object) => {
    try {
      const createUser = await axios.post(
        `${BASE_URL}/Account/register-user`,
        val
      );
      return createUser.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

//login user
export const userLogin = createAsyncThunk("userLogin", async (val: object) => {
  try {
    console.log("Values",val)
    const existingUser = await axios.post(
      `${BASE_URL}/Account/login-user`,
      val
    );
    const data = await existingUser.data;
    console.log(data);
    setCookie("role", data?.data?.role);
    setCookie("token", data?.data?.token);
    return data;
  } catch (error: any) {
    console.log(error);
    throw error?.response?.data?.message;
  }
});

export const getUserProfile = createAsyncThunk("getUser", async () => {
  try {
    const userToken = getCookie("token");
    const existingUser = await axios.get(
      `${BASE_URL}/Account/get-user-profile`,

      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    const data = await existingUser.data;
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

//update user profile
export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (updatedata: object) => {
    const userToken = getCookie("token");
    try {
      const existingUser = await axios.put(
        `${BASE_URL}/Account/update-user`,updatedata,

        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (updatedata: object) => {
    const userToken = getCookie("token");
    try {
      const existingUser = await axios.put(
        `${BASE_URL}/Account/change-password`,updatedata,

        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email: string) => {
    const userToken = getCookie("token");
    try {
      const existingUser = await axios.post(
        `${BASE_URL}/Account/forgot-password/${email}`,

        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (val: object) => {
    const userToken = getCookie("token");
    try {
      const existingUser = await axios.put(
        `${BASE_URL}/Account/reset-password`,val,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const getAllUniversity = createAsyncThunk(
  "getAllUniversity",
  async () => {
    const userToken = getCookie("token");
    try {
      const existingUser = await axios.get(
        `${BASE_URL}/Account/get-all-university`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      const data = await existingUser.data;
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  }
);

export const getAllCompany = createAsyncThunk("getAllCompany", async () => {
  try {
    const userToken = getCookie("token");
    const existingUser = await axios.get(
      `${BASE_URL}/Account/get-all-company`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    const data = await existingUser.data;
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

export const getUniversityDashboard = createAsyncThunk(
  "getUniversityDashboard", async () => {
  try {
    const userToken = getCookie("token");
    const existingUser = await axios.get(
      `${BASE_URL}/Account/university-dashboard`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    const data = await existingUser.data;
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

export const getCompanyDashboard = createAsyncThunk(
  "getCompanyDashboard", async () => {
  try {
    const userToken = getCookie("token");
    const existingUser = await axios.get(
      `${BASE_URL}/Account/company-dashboard`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    const data = await existingUser.data;
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

export const getStudentDashboard = createAsyncThunk(
  "getStudentDashboard", async () => {
  try {
    const userToken = getCookie("token");
    const existingUser = await axios.get(
      `${BASE_URL}/Account/student-dashboard`,
      { headers: { Authorization: `Bearer ${userToken}` } }
    );
    const data = await existingUser.data;
    return data;
  } catch (error: any) {
    throw error?.response?.data;
  }
});

//user initial state
const initialState = {
  user: {},
  error: null,
};

//user slice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: any, action: any) => {
      state.user = null;
      state.error = null;
      deleteCookie("token");
      deleteCookie("role");
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(userRegister.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        
      })
      .addCase(userRegister.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(userLogin.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        console.log("<<<", action.payload.data.user)
        state.user = {...action.payload.data.user}
      })
      .addCase(userLogin.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state: any) => {
        state.status = "loading";
        state.user = null;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(getUserProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        if (action.payload?.success) {
          state.user = { ...state.user, ...action.payload.data.user };
        }
      })
      .addCase(updateUserProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUniversityDashboard.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUniversityDashboard.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(getUniversityDashboard.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
