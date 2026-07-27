import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: sans-serif;
    transition: all 0.3s ease;
  }
`;

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const StyledHeader = styled.header`
  height: 70px;
  padding: 0 40px;
  background-color: ${(props) => props.theme.navBg};
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const NavLinksGroup = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.link};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.05rem;
  
  &:hover { text-decoration: underline; }
`;

const MainContentArea = styled.main`
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledFooter = styled.footer`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #333;
  font-size: 0.9rem;
  opacity: 0.7;
  background-color: ${(props) => props.theme.navBg};
  flex-shrink: 0;
`;

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('portfolioId');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppLayout>
        <StyledHeader>
          <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>PP</div>
          <NavLinksGroup>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/about">About</StyledLink>
            <StyledLink to="/experience">Experience</StyledLink>
            <StyledLink to="/education">Education</StyledLink>
            <StyledLink to="/skills">Skills</StyledLink>
            <StyledLink to="/projects">Projects</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
            {role === 'Admin' && <StyledLink to="/dashboard">Dashboard</StyledLink>}
            <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '6px 12px' }}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '6px 12px' }}>
              Logout
            </button>
          </NavLinksGroup>
        </StyledHeader>

        <MainContentArea>
          <Outlet />
        </MainContentArea>

        <StyledFooter>
          © 2026 Graduate @ AMC Engineering College
        </StyledFooter>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;