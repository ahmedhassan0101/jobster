# Jobster

A job application tracking dashboard. Built with React, TypeScript, and Redux Toolkit.

---

## Live Demo

[jobster.vercel.app](https://jobster.vercel.app)

```
Email:    testUser@test.com
Password: secret
```

---

## What it does

- Register and log in — JWT auth, token attached to every request automatically
- Add, edit, and delete job applications
- Track each application by status: pending, interview, or declined
- Search and filter jobs by status, type, and sort order
- Debounced search input — waits for you to stop typing before hitting the API
- Server-side pagination
- Stats overview with monthly application charts (bar and area)
- Fully responsive — collapsible sidebar on desktop, drawer on mobile

---

## Stack

| | |
|---|---|
| React 18 | UI |
| TypeScript | strict mode throughout |
| Redux Toolkit | global state + async thunks |
| Styled Components v6 | typed theme system |
| React Router DOM v6 | data API, protected routes |
| Axios | HTTP client with request interceptor |
| Recharts | charts |
| date-fns | date formatting |
| Vite | build tool |

---

## A few things worth noting

**Redux slices are fully typed.** Every `createAsyncThunk` call has explicit generics for the fulfilled payload, the argument, and the rejected value — no `unknown` leaking through:

```ts
export const loginUser = createAsyncThunk<
  UserResponse,
  LoginCredentials,
  { rejectValue: string }
>('user/loginUser', async (credentials, thunkAPI) => {
  // ...
});
```

**Debounce without a library.** The search input uses a `useMemo`-based debounce — keeps local state in sync immediately while delaying the Redux dispatch:

```ts
const handleSearchDebounced = useMemo(() => {
  let timeout: ReturnType<typeof setTimeout>;
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(handleFilterChange({ name: 'search', value: e.target.value }));
    }, 800);
  };
}, [dispatch]);
```

**Theme-connected charts.** Recharts reads colors directly from the Styled Components theme via `useTheme()`, so the chart palette stays in sync with the rest of the UI automatically.

**Status colors are type-safe.** Badge and card colors come from a `Record<JobStatus, StyleConfig>` — if you add a new status to the union type, TypeScript won't compile until you handle it:

```ts
const STATUS_STYLES: Record<JobStatus, { color: string; background: string }> = {
  pending:   { color: '#633806', background: '#FAEEDA' },
  interview: { color: '#3C3489', background: '#EEEDFE' },
  declined:  { color: '#712B13', background: '#FAECE7' },
};
```

---

## Project structure

```
src/
├── app/              # router, App entry
├── features/
│   └── jobs/         # Job card, JobsContainer, SearchContainer, charts
├── layout/           # Navbar, Sidebar, NavLinks
├── pages/
│   └── dashboard/    # Stats, AllJobs, AddJob, Profile
├── services/         # Axios instance + error helper
├── shared/           # FormRow, FormSelect, Loading, StatItem, hooks, types
├── store/            # userSlice, jobSlice, allJobsSlice, RootState
└── styles/           # theme.ts, GlobalStyle, styled.d.ts
```

---

## Running locally

```bash
git clone https://github.com/your-username/jobster.git
cd jobster
npm install
npm run dev
```

No `.env` needed.

---

## Credit

Original course project by [John Smilga](https://github.com/john-smilga). This version adds TypeScript throughout.

---
