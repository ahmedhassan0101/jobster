// src/app/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { Landing, ErrorPage, Register, ProtectedRoute } from "@/pages";
import { Stats, AddJob, AllJobs, Profile } from "@/pages/dashboard";
import RootLayout from "@/layout/RootLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    // errorElement here catches loader/action errors for all child routes
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Stats /> },
      { path: "add-job", element: <AddJob /> },
      { path: "profile", element: <Profile /> },
      { path: "all-jobs", element: <AllJobs /> },
    ],
  },
  { path: "landing", element: <Landing /> },
  { path: "register", element: <Register /> },
  { path: "*", element: <ErrorPage /> },
]);
