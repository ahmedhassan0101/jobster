// src/features/jobs/components/Job.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import JobInfo from "@/shared/components/JobInfo";
import { useAppDispatch } from "@/shared/hooks/redux";
import { deleteJob, setEditJob } from "@/store/job/jobSlice";
import type { Job as JobType } from "@/store/job/types";
import type { JobStatus } from "@/store/job/types";

// ─── Status config — one place to change colors for all statuses ───────────────

const STATUS_STYLES: Record<JobStatus, { color: string; background: string }> =
  {
    pending: { color: "#D46B08", background: "#FFF4E5" },
    interview: { color: "#0369A1", background: "#E8F4FD" },
    declined: { color: "#D93856", background: "#FFEBEB" },
  };

// ─── Styled Component ──────────────────────────────────────────────────────────

const JobCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  display: grid;
  grid-template-rows: auto 1fr;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  .card-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .company-initial {
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.primary[600]};
    display: grid;
    place-items: center;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .job-title {
    flex: 1;
    min-width: 0;

    h5 {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 0 0 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.grey[400]};
    }
  }

  .card-body {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid ${({ theme }) => theme.colors.grey[100]};
  }

  .action-btn {
    flex: 1;
    text-decoration: none;
  }
`;

const StatusBadge = styled.span<{ $status: JobStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
  background: ${({ $status }) => STATUS_STYLES[$status].background};
  color: ${({ $status }) => STATUS_STYLES[$status].color};
  margin-left: auto;
  flex-shrink: 0;
`;

// ─── Component ─────────────────────────────────────────────────────────────────

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}: JobType) => {
  const dispatch = useAppDispatch();
  const date = format(new Date(createdAt), "MMM d, yyyy");

  return (
    <JobCard>
      <div className="card-header">
        <div className="company-initial" aria-hidden="true">
          {company.charAt(0)}
        </div>
        <div className="job-title">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
        <StatusBadge $status={status}>{status}</StatusBadge>
      </div>

      <div className="card-body">
        <div className="meta-grid">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
        </div>

        <div className="actions">
          <Link
            to="/add-job"
            className="btn action-btn btn-outline"
            onClick={() =>
              dispatch(
                setEditJob({
                  editJobId: _id,
                  position,
                  company,
                  jobLocation,
                  jobType,
                  status,
                }),
              )
            }
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn action-btn btn-delete"
            onClick={() => dispatch(deleteJob(_id))}
          >
            Delete
          </button>
        </div>
      </div>
    </JobCard>
  );
};

export default Job;
