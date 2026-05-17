// src/pages/dashboard/AddJob.tsx
import { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import FormRow from "@/shared/components/FormRow";
import FormSelect from "@/shared/components/FormSelect";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "@/store/job/jobSlice";
import type { EditableJobField } from "@/store/types";

// ─── Shared form page style — used by AddJob and Profile ──────────────────────

export const FormPageWrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  padding: 2rem;
  width: 100%;

  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.grey[800]};
    margin-bottom: 1.75rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    align-self: flex-end;

    @media (min-width: 992px) {
      margin-top: 0;
    }
  }

  .submit-btn {
    height: 38px;
    background: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary[700]};
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .clear-btn {
    height: 38px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.redDark};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.colors.redDark};
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────────

const AddJob = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useAppSelector((state) => state.job);

  const { user } = useAppSelector((state) => state.user);

  // On mount (add mode only): pre-fill jobLocation from user profile
  useEffect(() => {
    if (!isEditing) {
      dispatch(clearValues(user?.location ?? ""));
    }
  }, [dispatch, isEditing, user?.location]);

  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch(
      handleChange({
        name: e.target.name as EditableJobField,
        value: e.target.value,
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        }),
      );
    } else {
      dispatch(createJob({ position, company, jobLocation, jobType, status }));
    }
  };

  return (
    <FormPageWrapper>
      <h3 className="page-title">{isEditing ? "Edit job" : "Add job"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormSelect
            name="jobType"
            labelText="Job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-delete"
              onClick={() => dispatch(clearValues(user?.location ?? ""))}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isEditing ? "Save changes" : "Add job"}
            </button>
          </div>
        </div>
      </form>
    </FormPageWrapper>
  );
};

export default AddJob;
