// src/layout/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaUserCircle, FaCaretDown, FaBars } from "react-icons/fa";
import Logo from "./Logo";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux";
import { toggleSidebar, clearStore } from "@/store/user/userSlice";

const NavbarWrapper = styled.nav`
  height: ${({ theme }) => theme.layout.navHeight};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;

  .nav-inner {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Logo visible only on mobile */
  .mobile-logo {
    @media (min-width: ${({ theme }) => theme.layout.breakpointLg}) {
      display: none;
    }
  }

  /* Page title visible only on desktop */
  .page-title {
    display: none;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.grey[700]};
    letter-spacing: 0.02em;
    text-transform: uppercase;

    @media (min-width: ${({ theme }) => theme.layout.breakpointLg}) {
      display: block;
    }
  }

  /* User menu */
  .user-menu {
    position: relative;
  }

  .user-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: 2rem;
    padding: 0.375rem 0.875rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.grey[700]};
    font-size: 1rem;
    font-weight: 500;
    transition: ${({ theme }) => theme.transition};
    font-family: inherit;
    text-transform: capitalize;
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary[400]};
      color: ${({ theme }) => theme.colors.grey[900]};
    }

    svg:first-child {
      font-size: 1.25rem;
      color: ${({ theme }) => theme.colors.primary[500]};
    }

    .caret {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.grey[400]};
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.grey[100]};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows[3]};
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s;

    &.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

   .logout-btn {
    width: 100%;

  } 
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavbarWrapper>
      <div className="nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            className="btn-icon toggle-btn"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
          <span className="mobile-logo">
            <Logo />
          </span>
        </div>
        <p className="page-title">dashboard</p>

        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className="user-btn"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown className={`caret${isOpen ? " open" : ""}`} />
          </button>

          <div className={`dropdown${isOpen ? " open" : ""}`} role="menu">
            <button
              type="button"
              className="btn btn-delete logout-btn"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                dispatch(clearStore("Logout successful"));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
