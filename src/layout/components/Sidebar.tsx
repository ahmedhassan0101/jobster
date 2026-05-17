// src/layout/components/Sidebar.tsx
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import { toggleSidebar } from "@/store/user/userSlice";

// ─── Mobile Overlay Sidebar ────────────────────────────────────────────────────

const SmallSidebarWrapper = styled.aside`
  @media (min-width: ${({ theme }) => theme.layout.breakpointLg}) {
    display: none;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: -1;
    opacity: 0;
    transition: ${({ theme }) => theme.transition};
  }

  .overlay.open {
    z-index: 100;
    opacity: 1;
  }

  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: ${({ theme }) => theme.colors.white};
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 101;
    display: flex;
    flex-direction: column;
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }

  .drawer.open {
    transform: translateX(0);
  }

  .drawer-header {
    height: ${({ theme }) => theme.layout.navHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
    flex-shrink: 0;
  }

 
`;

// ─── Desktop Persistent Sidebar ────────────────────────────────────────────────

const BigSidebarWrapper = styled.aside`
  display: none;

  @media (min-width: ${({ theme }) => theme.layout.breakpointLg}) {
    display: block;
    width: 260px;
    flex-shrink: 0;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.collapsed {
      width: 0;
      overflow: hidden;
    }

    .sidebar-inner {
      width: 260px;
      min-height: 100vh;
      background: ${({ theme }) => theme.colors.white};
      /* border-right: 1px solid ${({ theme }) => theme.colors.grey[100]}; */
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .sidebar-header {
      height: ${({ theme }) => theme.layout.navHeight};

      display: grid;
      place-items: center;
      /* border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]}; */
      padding: 0 1.5rem;
      /* border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]}; */
      flex-shrink: 0;
    }
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────────

const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const close = () => dispatch(toggleSidebar());

  return (
    <>
      {/* Mobile */}
      <SmallSidebarWrapper>
        <div
          className={`overlay${isSidebarOpen ? " open" : ""}`}
          onClick={close}
          aria-hidden="true"
        />
        <div
          className={`drawer${isSidebarOpen ? " open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="drawer-header">
            <Logo />
            <button
              className="btn-icon close-btn"
              onClick={close}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          <NavLinks onNavigate={close} />
        </div>
      </SmallSidebarWrapper>

      {/* Desktop */}
      <BigSidebarWrapper className={isSidebarOpen ? "" : "collapsed"}>
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <Logo />
          </div>
          <NavLinks />
        </div>
      </BigSidebarWrapper>
    </>
  );
};

export default Sidebar;
