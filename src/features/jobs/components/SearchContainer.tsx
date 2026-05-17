// src/features/jobs/components/SearchContainer.tsx
import { useState, useMemo } from "react";
import styled from "styled-components";
import FormRow from "@/shared/components/FormRow";
import FormSelect from "@/shared/components/FormSelect";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import { handleFilterChange, clearFilters } from "@/store/allJobs/allJobsSlice";
import type { FiltersState } from "@/store/allJobs/allJobsSlice";

const SearchWrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows[1]};

  h5 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary[600]};
    margin-bottom: 1.25rem;
  }

  .filters-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .clear-btn {
    align-self: flex-end;
  }
`;

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useAppDispatch();

  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((state) => state.allJobs);
    
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (state) => state.job,
  );

  // Dispatch filter change for non-search fields immediately
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      handleFilterChange({
        name: e.target.name as keyof FiltersState,
        value: e.target.value,
      }),
    );
  };

  // Debounce: local state updates immediately (responsive UI),
  // Redux dispatches after 800ms (avoids firing getAllJobs on every keystroke)
  const handleSearchDebounced = useMemo(() => {
    let timeout: ReturnType<typeof setTimeout>;

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(
          handleFilterChange({
            name: "search",
            value: e.target.value,
          }),
        );
      }, 800);
    };
  }, [dispatch]);

  const handleClear = () => {
    setLocalSearch("");
    dispatch(clearFilters());
  };

  return (
    <SearchWrapper>
      <h5>Search & Filter</h5>
      <div className="filters-grid">
        <FormRow
          type="text"
          name="search"
          value={localSearch}
          handleChange={handleSearchDebounced}
          labelText="Search position"
        />
        <FormSelect
          name="searchStatus"
          value={searchStatus}
          handleChange={handleSelectChange}
          list={["all", ...statusOptions]}
          labelText="Status"
        />
        <FormSelect
          name="searchType"
          value={searchType}
          handleChange={handleSelectChange}
          list={["all", ...jobTypeOptions]}
          labelText="Job type"
        />
        <FormSelect
          name="sort"
          value={sort}
          handleChange={handleSelectChange}
          list={sortOptions}
          labelText="Sort by"
        />
        <button
          type="button"
          className="btn action-btn btn-delete clear-btn"
          onClick={handleClear}
          disabled={isLoading}
        >
          Clear filters
        </button>
      </div>
    </SearchWrapper>
  );
};

export default SearchContainer;
