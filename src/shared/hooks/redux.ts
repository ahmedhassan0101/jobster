// src/shared/hooks/redux.ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/types';

// Use these two hooks everywhere in the app instead of the raw ones.
// They carry the full store type so TypeScript knows the shape of state
// and the correct dispatch signature without any casting.

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;