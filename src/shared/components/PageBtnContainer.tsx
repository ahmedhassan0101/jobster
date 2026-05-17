// // src/shared/components/PageBtnContainer.tsx
// import styled from 'styled-components';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
// import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux';
// import { changePage } from '@/store/allJobs/allJobsSlice';

// const PaginationWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 0.5rem;
//   flex-wrap: wrap;
//   margin-top: 2rem;

//   .pages {
//     display: flex;
//     gap: 0.25rem;
//   }

//   button {
//     height: 34px;
//     border: 1px solid ${({ theme }) => theme.colors.grey[200]};
//     border-radius: ${({ theme }) => theme.borderRadius};
//     background: ${({ theme }) => theme.colors.white};
//     color: ${({ theme }) => theme.colors.grey[600]};
//     font-family: inherit;
//     font-size: 0.875rem;
//     font-weight: 500;
//     cursor: pointer;
//     transition: ${({ theme }) => theme.transition};
//     display: flex;
//     align-items: center;
//     gap: 0.375rem;
//     padding: 0 0.75rem;

//     &:hover:not(:disabled) {
//       border-color: ${({ theme }) => theme.colors.primary[400]};
//       color: ${({ theme }) => theme.colors.primary[600]};
//     }

//     &.page-btn { width: 34px; padding: 0; justify-content: center; }

//     &.active {
//       background: ${({ theme }) => theme.colors.primary[600]};
//       border-color: ${({ theme }) => theme.colors.primary[600]};
//       color: ${({ theme }) => theme.colors.white};
//     }

//     &:disabled {
//       opacity: 0.45;
//       cursor: not-allowed;
//     }
//   }
// `;

// const PageBtnContainer = () => {
//   const { numOfPages, page } = useAppSelector((state) => state.allJobs);
//   const dispatch = useAppDispatch();

//   const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

//   const prev = () => dispatch(changePage(page === 1 ? numOfPages : page - 1));
//   const next = () => dispatch(changePage(page === numOfPages ? 1 : page + 1));

//   if (numOfPages <= 1) return null;

//   return (
//     <PaginationWrapper aria-label="Pagination">
//       <button onClick={prev} aria-label="Previous page">
//         <HiChevronLeft /> Prev
//       </button>

//       <div className="pages">
//         {pages.map((p) => (
//           <button
//             key={p}
//             className={`page-btn${p === page ? ' active' : ''}`}
//             onClick={() => dispatch(changePage(p))}
//             aria-label={`Page ${p}`}
//             aria-current={p === page ? 'page' : undefined}
//           >
//             {p}
//           </button>
//         ))}
//       </div>

//       <button onClick={next} aria-label="Next page">
//         Next <HiChevronRight />
//       </button>
//     </PaginationWrapper>
//   );
// };

// export default PageBtnContainer;

// src/shared/components/PageBtnContainer.tsx
import styled from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import { changePage } from "@/store/allJobs/allJobsSlice";

// ─── Styled Component ──────────────────────────────────────────────────────────

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;


  .btn-container {
    background: ${({ theme }) => theme.colors.primary[100]};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    padding: 2px; 
  }

  /* أزرار الأرقام */
  .page-btn {
    background: transparent;
    border: none;
    width: 40px;
    height: 36px;
    font-weight: 600;
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.colors.primary[600]};
    transition: ${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(.active) {
      background: ${({ theme }) => theme.colors.primary[100] || "#d1e9ff"};
    }

    &.active {
      background: ${({ theme }) => theme.colors.primary[600]};
      color: ${({ theme }) => theme.colors.white};
    }
  }

 
`;

// ─── Component ─────────────────────────────────────────────────────────────────

const PageBtnContainer = () => {
  const { numOfPages, page } = useAppSelector((state) => state.allJobs);
  const dispatch = useAppDispatch();

  // بناء مصفوفة الصفحات
  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) newPage = numOfPages;
    dispatch(changePage(newPage));
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1;
    dispatch(changePage(newPage));
  };

  if (numOfPages <= 1) return null;

  return (
    <PaginationWrapper aria-label="Pagination Navigation">
      <button
        type="button"
        className="btn btn-outline"
        onClick={prevPage}
        aria-label="Previous page"
      >
        <HiChevronDoubleLeft /> prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={`page-btn${pageNumber === page ? " active" : ""}`}
            onClick={() => dispatch(changePage(pageNumber))}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-outline"
        onClick={nextPage}
        aria-label="Next page"
      >
       next
        <HiChevronDoubleRight />
      </button>
    </PaginationWrapper>
  );
};

export default PageBtnContainer;
