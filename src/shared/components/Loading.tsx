// src/shared/components/Loading.tsx
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ $center?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  border-top-color: ${({ theme }) => theme.colors.primary[600]};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
  ${({ $center }) => $center && "margin: 2rem auto;"}
`;

interface LoadingProps {
  center?: boolean;
}

const Loading = ({ center }: LoadingProps) => (
  <Spinner $center={center} role="status" aria-label="Loading" />
);

export default Loading;
