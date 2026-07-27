import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../api';

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
  padding: 0 10%;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 24px 0;
  letter-spacing: -1px;

  @media (max-width: 1200px) { font-size: 3.5rem; }
  @media (max-width: 768px) { font-size: 2.5rem; }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
  max-width: 700px;

  @media (max-width: 768px) { font-size: 1.1rem; }
`;

function Home() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get('/about')
      .then((res) => setAbout(res.data))
      .catch((error) => console.error('Error fetching about:', error));
  }, []);

  return (
    <FullPageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <MainTitle>Welcome to {about?.fullName ? `${about.fullName}'s` : ''} Portfolio</MainTitle>
        <Subtitle>{about?.shortDescription}</Subtitle>
      </motion.div>
    </FullPageContainer>
  );
}

export default Home;