// src/pages/ErrorPage.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import notFoundSvg from "@/assets/not-found.svg";

const ErrorWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.background};

  img {
    width: 90vw;
    max-width: 400px;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.grey[800]};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.grey[500]};
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  /* a {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-weight: 500;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.colors.primary[700]};
    }
  } */
`;

const ErrorPage = () => (
  <ErrorWrapper>
    <img src={notFoundSvg} alt="" aria-hidden="true" />
    <h3>Page not found</h3>
    <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
    <Link className="btn btn-primary" to="/">
      Back to dashboard
    </Link>
  </ErrorWrapper>
);

export default ErrorPage;
