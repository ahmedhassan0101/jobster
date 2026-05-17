// src/features/jobs/components/ChartsContainer.tsx
import { useState } from 'react';
import styled from 'styled-components';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppSelector } from '@/shared/hooks/redux';

const ChartsWrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows[1]};

  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};

    h5 {
      font-size: 1.5rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.grey[700]};
      margin: 0;
    }
  }
`;

const ChartsContainer = () => {
  const [showBar, setShowBar] = useState(true);
  const { monthlyApplications } = useAppSelector((state) => state.allJobs);

  return (
    <ChartsWrapper>
      <div className="chart-header">
        <h5>Monthly Applications</h5>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setShowBar((v) => !v)}
        >
          {showBar ? 'Area chart' : 'Bar chart'}
        </button>
      </div>
      {showBar
        ? <BarChart  data={monthlyApplications} />
        : <AreaChart data={monthlyApplications} />
      }
    </ChartsWrapper>
  );
};

export default ChartsContainer;