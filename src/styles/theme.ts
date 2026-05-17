// src/styles/theme.ts

// All design tokens in one place.
// Components access these via `${({ theme }) => theme.colors.primary[600]}`
// The CSS variables in index.css will be removed incrementally
// as each component migrates to use this theme object.

const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  grey: {
    50: "#f0f4f8",
    100: "#d9e2ec",
    200: "#bcccdc",
    300: "#9fb3c8",
    400: "#829ab1",
    500: "#627d98",
    600: "#486581",
    700: "#334e68",
    800: "#243b53",
    900: "#102a43",
  },
  black: "#222",
  white: "#fff",

  redLight: "#ffebee",
  redBorder: "#ffccd5",
  redHoverBg: "#ffd6dd",
  redDark: "#d93856",

  greenLight: "#e6f7f2",
  greenBorder: "#b3e6d5",
  greenHoverBg: "#d1f0e6",
  greenDark: "#0c6b58",
} as const;

const typography = {
  headingFont: "'Sora', Sans-Serif",
  bodyFont: "'Cabin', Sans-Serif",
  smallText: "0.875rem",
  extraSmall: "0.7em",
} as const;
const shadows = {
  1: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
  2: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  3: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
  4: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
} as const;

const layout = {
  maxWidth: "1320px",
  fixedWidth: "500px",
  fluidWidth: "90vw",
  breakpointLg: "992px",
  navHeight: "6rem",
} as const;

export const theme = {
  colors,
  typography,
  shadows,
  layout,
  // Semantic aliases — these are what components should use.
  // If the brand color changes, you update it here, not in 50 files.
  background: colors.grey[50],
  text: colors.grey[900],
  borderRadius: "0.25rem",
  letterSpacing: "1px",
  transition: "0.3s ease-in-out all",
} as const;

// Derive the type from the value — never maintain a separate interface
export type AppTheme = typeof theme;
