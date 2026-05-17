// src/store/allJobs/allJobsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiClient, getErrorMessage } from "@/services/apiClient";
import type {
  Job,
  JobsResponse,
  StatsResponse,
  MonthlyApplication,
  SearchStatus,
  SearchType,
  SortOption,
  JobStatus,
} from "@/store/job/types";
import type { RootState } from "../types";
export type { FiltersState };
// ─── State ──────────────────────────────────────────────────────────────────────

interface FiltersState {
  search: string;
  searchStatus: SearchStatus;
  searchType: SearchType;
  sort: SortOption;
  sortOptions: SortOption[];
}

interface AllJobsState extends FiltersState {
  isLoading: boolean;
  jobs: Job[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: Partial<Record<JobStatus, number>>;
  monthlyApplications: MonthlyApplication[];
}

const initialFiltersState: FiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: AllJobsState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// ─── Thunks ──────────────────────────────────────────────────────────────────────

// export const getAllJobs = createAsyncThunk<
//   JobsResponse,
//   void,
//   { rejectValue: string }
// >("allJobs/getJobs", async (_, thunkAPI) => {
//   try {
//     const response = await apiClient.get<JobsResponse>("/jobs");
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(getErrorMessage(error));
//   }
// });
export const getAllJobs = createAsyncThunk<
  JobsResponse,
  void,
  { state: RootState; rejectValue: string }
>("allJobs/getJobs", async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  if (search) url += `&search=${search}`;

  try {
    const response = await apiClient.get<JobsResponse>(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
export const showStats = createAsyncThunk<
  StatsResponse,
  void,
  { rejectValue: string }
>("allJobs/showStats", async (_, thunkAPI) => {
  try {
    const response = await apiClient.get<StatsResponse>("/jobs/stats");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ─── Slice ───────────────────────────────────────────────────────────────────────

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // handleFilterChange مفيد لتحديث الـ filters من SearchContainer
    handleFilterChange: (
      state,
      action: PayloadAction<{ name: keyof FiltersState; value: string }>,
    ) => {
      state.page = 1;
      (state[action.payload.name] as string) = action.payload.value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ── Get All Jobs ──────────────────────────────────────────────────────────
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (state, action: PayloadAction<JobsResponse>) => {
          state.isLoading = false;
          state.jobs = action.payload.jobs;
          state.totalJobs = action.payload.totalJobs; // ← كان مفقوداً
          state.numOfPages = action.payload.numOfPages; // ← كان مفقوداً
        },
      )
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Could not fetch jobs");
      })

      // ── Show Stats ────────────────────────────────────────────────────────────
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        showStats.fulfilled,
        (state, action: PayloadAction<StatsResponse>) => {
          state.isLoading = false;
          state.stats = action.payload.defaultStats;
          state.monthlyApplications = action.payload.monthlyApplications;
        },
      )
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload ?? "Could not fetch stats");
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleFilterChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
