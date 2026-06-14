// src/features/jobs/components/JobsContainer.tsx
import { useEffect } from "react";
import styled from "styled-components";
import Job from "./Job";
import Loading from "@/shared/components/Loading";
import PageBtnContainer from "@/shared/components/PageBtnContainer";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import { getAllJobs } from "@/store/allJobs/allJobsSlice";

const JobsWrapper = styled.section`
  margin-top: 2rem;

  .results-header {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 600; 
    color: ${({ theme }) => theme.colors.grey[700]}; 
    margin-bottom: 1.75rem;
    padding-bottom: 0.875rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey[100]};
    text-transform: capitalize;

    span { 
      color: ${({ theme }) => theme.colors.primary[600]}; 
      font-weight: 800;
      background: ${({ theme }) => theme.colors.primary[50] || '#e8f4fd'};
      padding: 0.35rem 0.75rem; /* كبسولة أكبر حول الرقم ليلفت الانتباه فوراً */
      border-radius: ${({ theme }) => theme.borderRadius || '6px'};
      margin-right: 0.65rem;
    }
  }

  .empty-state {
    text-align: center;
    padding: 5rem 2rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px dashed ${({ theme }) => theme.colors.grey[200]};
    color: ${({ theme }) => theme.colors.grey[400]};

    h4 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.grey[600]};
    }

    p {
      font-size: 0.9375rem;
    }
  }

  .jobs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 1320px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const JobsContainer = () => {
  const dispatch = useAppDispatch();
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppSelector((state) => state.allJobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch, page, search, searchStatus, searchType, sort]);

  if (isLoading) return <Loading center />;

  return (
    <JobsWrapper>
      {!jobs.length  ? (
        <div className="empty-state">
          <h4>No jobs found</h4>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="results-header">
            <span>{totalJobs}</span>
            {totalJobs === 1 ? "job" : "jobs"} found
          </div>

          <div className="jobs-grid">
            {jobs.map((job) => (
              <Job key={job._id} {...job} />
            ))}
          </div>

          {numOfPages > 1 && <PageBtnContainer />}
        </>
      )}
    </JobsWrapper>
  );
};

export default JobsContainer;
