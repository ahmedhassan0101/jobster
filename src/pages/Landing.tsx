// src/pages/Landing.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "@/layout/components/Logo";
import mainSvg from "@/assets/main.svg";

const LandingWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey[50]};

  nav {
    width: 90%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    height: ${({ theme }) => theme.layout.navHeight};
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  }

  .page {
    flex: 1;
    width: 90%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    display: grid;
    align-items: center;
    padding: 3rem 0;
  }

  .info {
    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 1.25rem;
      color: ${({ theme }) => theme.colors.grey[900]};

      span {
        color: ${({ theme }) => theme.colors.primary[600]};
      }
    }

    p {
      font-size: 1.25rem;
      color: ${({ theme }) => theme.colors.grey[600]};
      line-height: 1.8;
      max-width: 38ch;
      margin-bottom: 2rem;
    }
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      background: ${({ theme }) => theme.colors.primary[700]};
      box-shadow: ${({ theme }) => theme.shadows[2]};
    }
  }

  .main-img {
    display: none;
    width: 100%;
    max-width: 480px;
    margin-left: auto;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpointLg}) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 4rem;
    }
    .main-img {
      display: block;
    }
  }
`;

const Landing = () => (
  <LandingWrapper>
    <nav>
      <Logo />
    </nav>
    <div className="page">
      <div className="info">
        <h1>
          Track every <span>job application</span> in one place
        </h1>
        <p>
          Stay organized throughout your job search. Log applications, track
          interview stages, and get a clear picture of where you stand — all
          from one clean dashboard.
        </p>
        <Link to="/register" className="btn btn-primary">
          Get Started
        </Link>
      </div>
      <img src={mainSvg} alt="Job search illustration" className="main-img" />
    </div>
  </LandingWrapper>
);

export default Landing;
