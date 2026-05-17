// src/store/user/localStorage.ts
import type { User } from '@/shared/types/api';

const USER_KEY = 'user';

export const addUserToLocalStorage = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const getUserFromLocalStorage = (): User | null => {
  try {
    const result = localStorage.getItem(USER_KEY);
    if (!result) return null;

    // JSON.parse returns unknown — we cast carefully after checking
    // the minimum required field (token) exists
    const parsed: unknown = JSON.parse(result);

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'token' in parsed &&
      typeof (parsed as Record<string, unknown>).token === 'string'
    ) {
      return parsed as User;
    }

    return null;
  } catch {
    // localStorage value was corrupted — treat as logged out
    localStorage.removeItem(USER_KEY);
    return null;
  }
};