// src/services/apiClient.ts
import axios from 'axios';
import type { AxiosError } from 'axios';
import { getUserFromLocalStorage } from '@/store/user/localStorage';

// Single axios instance for the entire app.
// All requests go through here — auth headers, base URL, error shape.
export const apiClient = axios.create({
  baseURL: 'https://redux-toolkit-jobster-api-server.onrender.com/api/v1',
});

// Attaches the Bearer token from localStorage on every outgoing request.
// This is the ONLY place the token is added — no manual headers in thunks.
apiClient.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Normalizes API errors into a consistent shape.
// Every thunk receives either response.data.msg or a fallback string —
// never a raw AxiosError object.
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // The API returns { msg: string } on errors
    const msg = (error.response?.data as { msg?: string })?.msg;
    return msg ?? error.message;
  }
  return 'An unexpected error occurred';
};