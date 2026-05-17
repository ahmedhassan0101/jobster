// src/shared/types/api.ts
// Shared API envelope types used across all service layers.
// Domain-specific types (Job, User) live in their own feature's types.ts

export interface ApiError {
  msg: string;
}

// The user object returned by the API on login/register/update
export interface User {
  name: string;
  email: string;
  lastName: string;
  location: string;
  token: string;
}

// Wrapper for any endpoint that returns { user: User }
export interface UserResponse {
  user: User;
}