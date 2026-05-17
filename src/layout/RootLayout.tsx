// src/layout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* يمنع overflow مع flex */
    background: ${({ theme }) => theme.background};
  }
  .page-container {
    flex: 1;
    width: 90%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 2rem 0;
  }
`;

const RootLayout = () => (
  <LayoutWrapper>
    <Sidebar />
    <div className="main-content">
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  </LayoutWrapper>
);

export default RootLayout;