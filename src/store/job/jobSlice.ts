// src/store/job/jobSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiClient, getErrorMessage } from "@/services/apiClient";
import {
  getAllJobs,
  showLoading,
  hideLoading,
} from "@/store/allJobs/allJobsSlice";
import type { Job, JobStatus, JobType, EditJobPayload } from "./types";
import type { EditableJobField, RootState } from "../types";

// ─── State ─────────────────────────────────────────────────────────────────────

interface JobState {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobType: JobType;
  jobTypeOptions: JobType[];
  status: JobStatus;
  statusOptions: JobStatus[];
  isEditing: boolean;
  editJobId: string;
}

const initialState: JobState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

// ─── Thunks ─────────────────────────────────────────────────────────────────────

export const createJob = createAsyncThunk<
  Job,
  Partial<Omit<Job, "_id" | "createdAt">>,
  { rejectValue: string }
>("job/createJob", async (job, thunkAPI) => {
  try {
    const response = await apiClient.post<{ job: Job }>("/jobs", job);
    thunkAPI.dispatch(clearValues(""));
    return response.data.job;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteJob = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("job/deleteJob", async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await apiClient.delete<{ msg: string }>(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const editJob = createAsyncThunk<
  Job,
  EditJobPayload,
  { rejectValue: string }
>("job/editJob", async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await apiClient.patch<{ job: Job }>(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues(""));
    return response.data.job;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ─── Slice ──────────────────────────────────────────────────────────────────────

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // name مقيد بـ keyof JobState — لا يمكن الكتابة على key عشوائي
    // handleChange: (
    //   state,
    //   action: PayloadAction<{ name: keyof JobState; value: string }>,
    // ) => {
    //   const { name, value } = action.payload;
    //   // TypeScript يعرف أن القيمة string — الـ options arrays محمية
    //   (state[name] as string) = value;
    // },
    handleChange: (
      state,
      action: PayloadAction<{ name: EditableJobField; value: string }>,
    ) => {
      state[action.payload.name] = action.payload.value as never;
    },
    // location تأتي كـ payload من المكون — لا قراءة من localStorage داخل reducer
    clearValues: (state, action: PayloadAction<string | undefined>) => {
      return {
        ...initialState,
        jobLocation: action.payload ?? "",
      };
    },

    setEditJob: (
      state,
      action: PayloadAction<Partial<JobState> & { editJobId: string }>,
    ) => {
      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Create ──────────────────────────────────────────────────────────────
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Could not create job");
      })

      // ── Edit ─────────────────────────────────────────────────────────────────
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified");
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Could not edit job");
      })
      .addCase(deleteJob.fulfilled, (_, action) => {
        toast.success((action.payload as string) ?? "Job Deleted");
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error(action.payload ?? "Could not delete job");
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
