import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    font-family: sans-serif;
    margin: 0;
    transition: all 0.3s ease;
  }
`;

// App layout wrapper to keep footer pinned to bottom
const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledHeader = styled.header`
  padding: 20px 40px;
  background-color: ${(props) => props.theme.navBg};
  border-bottom: 1px solid #444;
  display: flex;
  justify-content: space-between; /* Pushes brand left, navigation right */
  align-items: center;
`;

const NavLinksGroup = styled.nav`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.link};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StyledFooter = styled.footer`
  margin-top: auto; /* Forces footer to bottom of screen */
  padding: 20px;
  text-align: center;
  border-top: 1px solid #444;
  font-size: 0.9rem;
  opacity: 0.7;
  background-color: ${(props) => props.theme.navBg};
`;

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      
      <AppLayout>
        {/* Top Header Section */}
        <StyledHeader>
          <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>PP</div>
          
          <NavLinksGroup>
            <StyledLink to="/">About</StyledLink>
            <StyledLink to="/projects">Projects</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
            
            <button 
              onClick={toggleTheme} 
              style={{ cursor: 'pointer', padding: '6px 12px', marginLeft: '10px' }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </NavLinksGroup>
        </StyledHeader>

        {/* Mid-Section Content View Area */}
        <main style={{ padding: '40px flex-grow' }}>
          <Outlet />
        </main>

        {/* Downside Footer Notice */}
        <StyledFooter>
          © 2026 Graduate @ AMC Engineering College
        </StyledFooter>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
