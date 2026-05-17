// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

// Globals that need theme access (fonts, base element styles).
// CSS-variable-based rules stay in index.css until all wrappers
// are migrated, then index.css gets deleted.

export const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    background: ${({ theme }) => theme.background};
    font-family: ${({ theme }) => theme.typography.bodyFont};
    font-weight: 400;
    line-height: 1.75;
    color: ${({ theme }) => theme.text};
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    margin-bottom: 1.38rem;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-weight: 400;
    line-height: 1.3;
    text-transform: capitalize;
    letter-spacing: ${({ theme }) => theme.letterSpacing};
  }
  p, span, a, li, button, input, label {
    font-family: ${({ theme }) => theme.typography.bodyFont};
  }

  h1 { font-size: 3.052rem; }
  h2 { font-size: 2.441rem; }
  h3 { font-size: 1.953rem; }
  h4 { font-size: 1.563rem; }
  h5 { font-size: 1.25rem; }

  a {
    text-decoration: none;
    letter-spacing: ${({ theme }) => theme.letterSpacing};
  }

  a, button { line-height: 1.15; }
  button:disabled { cursor: not-allowed; }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .img {
    width: 100%;
    display: block;
    object-fit: cover;
  }


  .loading {
    width: 6rem;
    height: 6rem;
    border: 5px solid ${({ theme }) => theme.colors.grey[400]};
    border-radius: 50%;
    border-top-color: ${({ theme }) => theme.colors.primary[600]};
    animation: spinner 2s linear infinite;
  }

  .loading-center {
    margin: 0 auto;
  }

  /* Toast override */
  .Toastify__toast {
    text-transform: capitalize;
  }


/* --- Base Button --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px; 
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid transparent; 

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
/* --- Button Variants --- */
.btn-primary {
  background: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary[700]};
  }
}

.btn-outline {
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary[600]};
  border-color: ${({ theme }) => theme.colors.primary[300]};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary[50]};
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }
}

.btn-add {
  background-color: ${({ theme }) => theme.colors.greenLight};
  border-color: ${({ theme }) => theme.colors.greenBorder};
  color: ${({ theme }) => theme.colors.greenDark};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.greenHoverBg};
    border-color: ${({ theme }) => theme.colors.greenDark};
  }
}

.btn-delete {
  background-color: ${({ theme }) => theme.colors.redLight};
  border-color: ${({ theme }) => theme.colors.redBorder};
  color: ${({ theme }) => theme.colors.redDark};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.redHoverBg};
    border-color: ${({ theme }) => theme.colors.redDark};
  }
}

.btn-block {
  width: 100%;
  height: 42px;
  margin-bottom: 0.75rem;
}


/* --- Icon Buttons Base --- */
.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
}

.toggle-btn {
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary[600]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
  }
}

.close-btn {
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.grey[500]};
  
  &:hover {
    color: ${({ theme }) => theme.colors.redDark};
    background: ${({ theme }) => theme.colors.redLight};
  }
}  

  label {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[700]};
    letter-spacing: 0.02em;
    text-transform: capitalize;
  }
/* Loading spinner — kept global because it's used across features */
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }

`;
