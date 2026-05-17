// src/store/user/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { apiClient, getErrorMessage } from "@/services/apiClient";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "@/store/user/localStorage";
import type { User, UserResponse } from "@/shared/types/api";
import { clearAllJobsState } from "@/store/allJobs/allJobsSlice";
import { clearValues } from "@/store/job/jobSlice";
// ─── State Type ────────────────────────────────────────────────────────────────

interface UserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: User | null;
}

const initialState: UserState = {
  isLoading: false,
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
};

// ─── Credentials Types ─────────────────────────────────────────────────────────

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

// ─── Thunks ────────────────────────────────────────────────────────────────────

// The third generic on createAsyncThunk is ThunkApiConfig.
// { rejectValue: string } means payload on .rejected is always string, not unknown.

export const registerUser = createAsyncThunk<
  UserResponse,
  RegisterCredentials,
  { rejectValue: string }
>("user/registerUser", async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post<UserResponse>(
      "/auth/register",
      credentials,
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  UserResponse,
  LoginCredentials,
  { rejectValue: string }
>("user/loginUser", async (credentials, thunkAPI) => {

  try {
    const response = await apiClient.post<UserResponse>(
      "/auth/login",
      credentials,
    );
    
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk<
  UserResponse,
  Partial<User>,
  { rejectValue: string }
>("user/updateUser", async (userData, thunkAPI) => {
  try {
    const response = await apiClient.patch<UserResponse>(
      "/auth/updateUser",
      userData,
    );
    return response.data;
  } catch (error) {
    // 401 means the token expired — log the user out immediately
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      thunkAPI.dispatch(logoutUser());
    }
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const clearStore = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("user/clearStore", async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues(""));
    toast.success(message);
  } catch {
    return thunkAPI.rejectWithValue("Error logging out");
  }
});

// ─── Slice ─────────────────────────────────────────────────────────────────────

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // ── Register ──────────────────────────────────────────────────────────────
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(action.payload.user);
        toast.success(`Hello There ${action.payload.user.name}`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Registration failed");
      })

      // ── Login ─────────────────────────────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(action.payload.user);
        toast.success(`Welcome Back ${action.payload.user.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Login failed");
      })

      // ── Update User ───────────────────────────────────────────────────────────
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(action.payload.user);
        toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Update failed");
      })
      .addCase(clearStore.rejected, () => {
        toast.error("There was an error logging out");
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
