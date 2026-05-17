// src/pages/dashboard/Stats.tsx
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux';
import { showStats } from '@/store/allJobs/allJobsSlice';
import StatsContainer from '@/features/jobs/components/StatsContainer';
import ChartsContainer from '@/features/jobs/components/ChartsContainer';
import Loading from '@/shared/components/Loading';

const Stats = () => {
  const dispatch = useAppDispatch();
  const { isLoading, monthlyApplications } = useAppSelector(
    (state) => state.allJobs
  );

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) return <Loading center />;

  return (
    <section>
      <StatsContainer />
      {monthlyApplications.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <ChartsContainer />
        </div>
      )}
    </section>
  );
};

export default Stats;