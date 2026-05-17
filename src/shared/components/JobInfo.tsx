// src/shared/components/JobInfo.tsx
import styled from 'styled-components';

const JobInfoWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grey[400]};

  .icon {
    display: grid;
    place-items: center;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .text {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.01em;
  }
`;

interface JobInfoProps {
  icon: React.ReactElement;
  text: string;
}

const JobInfo = ({ icon, text }: JobInfoProps) => (
  <JobInfoWrapper>
    <span className="icon" aria-hidden="true">{icon}</span>
    <span className="text">{text}</span>
  </JobInfoWrapper>
);

export default JobInfo;