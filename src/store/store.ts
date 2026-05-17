// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
export type { RootState, AppDispatch } from './types';
// These imports will resolve once we migrate each slice in later steps.
// For now, they remain pointing to the JS files during the transition.
import userReducer from '@/store/user/userSlice';
import jobReducer from '@/store/job/jobSlice';
import allJobsReducer from '@/store/allJobs/allJobsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});
