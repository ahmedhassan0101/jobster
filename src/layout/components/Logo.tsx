// src/layout/components/Logo.tsx
import styled from "styled-components";

const LogoWrapper = styled.span`
  font-family: ${({ theme }) => theme.typography.headingFont};
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  user-select: none;

  .accent {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const Logo = () => (
  <LogoWrapper aria-label="Jobster">
    Job<span className="accent">ster</span>
  </LogoWrapper>
);

export default Logo;
