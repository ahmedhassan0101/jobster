import type { store } from './store';


// The single source of truth for Redux types in this project.
// Every useSelector and useDispatch call derives from these.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type EditableJobField = 'position' | 'company' | 'jobLocation' | 'jobType' | 'status';