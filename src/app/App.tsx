// /* eslint-disable no-unused-vars */
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   AddJob,
//   AllJobs,
//   ErrorPage,
//   Landing,
//   Profile,
//   Register,
//   RootLayout,
//   Stats,
//   ProtectedRoute,
// } from "./pages";

// const router = createBrowserRouter([
//   { path: "*", element: <ErrorPage /> },
//   { path: "landing", element: <Landing /> },
//   { path: "register", element: <Register /> },
//   {
//     path: "/",
//     element: (
//       // <ProtectedRoute>
//         <RootLayout />
//       // </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Stats /> },
//       { path: "add-job", element: <AddJob /> },
//       { path: "profile", element: <Profile /> },
//       { path: "all-jobs", element: <AllJobs /> },
//     ],
//   },
// ]);

// const App = () => {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <ToastContainer />
//     </>
//   );
// };

// export default App;

// src/app/App.tsx
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </ThemeProvider>
  );
};

export default App;
