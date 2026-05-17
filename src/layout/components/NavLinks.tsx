// src/layout/components/NavLinks.tsx
import { NavLink } from "react-router-dom";
import { navLinks } from "@/layout/constants/navLinks";
import styled from "styled-components";

interface NavLinksProps {
  onNavigate?: () => void;
}

const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-right: 1px solid ${({ theme }) => theme.colors.grey[200]};
  flex: 1;

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.9rem 1.5rem;
    color: ${({ theme }) => theme.colors.grey[500]};
    text-transform: capitalize;
    font-size: 1.2rem;
    font-weight: 400;
    font-family: ${({ theme }) => theme.typography.bodyFont};
    letter-spacing: 0.03em;
    transition: ${({ theme }) => theme.transition};
    border-left: 4px solid transparent;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme.colors.grey[900]};
      background: ${({ theme }) => theme.colors.grey[50]};
      border-left-color: ${({ theme }) => theme.colors.primary[200]};

      .icon {
        color: ${({ theme }) => theme.colors.primary[600]};
      }
    }

    &.active {
      color: ${({ theme }) => theme.colors.grey[900]};
      background: ${({ theme }) => theme.colors.primary[50]};
      border-left-color: ${({ theme }) => theme.colors.primary[600]};

      .icon {
        color: ${({ theme }) => theme.colors.primary[600]};
      }
    }
  }

  .icon {
    font-size: 1.25rem;
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.colors.grey[400]};
    transition: ${({ theme }) => theme.transition};
    flex-shrink: 0;
  }
`;

const NavLinks = ({ onNavigate }: NavLinksProps) => (
  <NavLinksWrapper>
    {navLinks.map(({ id, text, path, icon }) => (
      <NavLink
        key={id}
        to={path}
        end
        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        onClick={onNavigate}
      >
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    ))}
  </NavLinksWrapper>
);

export default NavLinks;
