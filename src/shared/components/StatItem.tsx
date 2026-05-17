// src/shared/components/StatItem.tsx
import styled from 'styled-components';

const StatCard = styled.article<{ $accentColor: string; $bgColor: string }>`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.grey[200]};
  border-top: 4px solid ${({ $accentColor }) => $accentColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .count {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ $accentColor }) => $accentColor};
    line-height: 1;
  }

  .icon-wrap {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background: ${({ $bgColor }) => $bgColor};
    display: grid;
    place-items: center;
    flex-shrink: 0;

    svg { font-size: 1.75rem; color: ${({ $accentColor }) => $accentColor}; }
  }

  .title {
    font-size: 1.25rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grey[600]};
    text-transform: capitalize;
    letter-spacing: 0.03em;
    margin: 0;
  }
`;

interface StatItemProps {
  count:       number;
  title:       string;
  icon:        React.ReactElement;
  color:       string;
  bcg:         string;
}

const StatItem = ({ count, title, icon, color, bcg }: StatItemProps) => (
  <StatCard $accentColor={color} $bgColor={bcg}>
    <div className="stat-header">
      <span className="count">{count}</span>
      <span className="icon-wrap">{icon}</span>
    </div>
    <p className="title">{title}</p>
  </StatCard>
);

export default StatItem;