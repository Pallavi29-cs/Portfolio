import { motion } from 'framer-motion';
import styled from 'styled-components';
import profileImg from '../assets/profile.jpeg';

const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  padding: 0 10%;
  gap: 5%;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 0 5%;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 40px;
  }
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: 1.8rem;
  line-height: 1.5;
  opacity: 0.85;
  margin: 0;
  max-width: 700px;

  @media (max-width: 1200px) { font-size: 1.5rem; }
  @media (max-width: 768px) { font-size: 1.2rem; }
`;

const PhotoSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ProfileImage = styled.img`
  width: 35vw;
  height: 35vw;
  max-width: 450px;
  min-width: 250px;
  object-fit: cover;
  border-radius: 0px;
  border: 6px solid ${(props) => props.theme.link};
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
`;

function About() {
  return (
    <FullPageContainer>
      
      {/* Text Section: Elegant fade and reveal */}
      <TextSection>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <MainTitle>Welcome to Pallavi's Portfolio</MainTitle>
          <Subtitle>I am a passionate engineer creating robust software interfaces.</Subtitle>
        </motion.div>
      </TextSection>

      {/* Photo Section: Next-Level Elastic Spring Drop from the Top */}
      <PhotoSection>
        <motion.div
          initial={{ opacity: 0, y: -250 }}         // Starts high up off the screen and completely invisible
          animate={{ opacity: 1, y: 0 }}            // Drops straight down to its resting position
          transition={{ 
            type: 'spring',                         // Activates physics-based spring physics instead of flat timing
            stiffness: 70,                          // Controls the speed of the drop (Higher = faster drop)
            damping: 12,                            // Controls the bouncy elastic rebound (Lower = more physics bounce)
            delay: 0.4                              // Wait for the text to appear slightly first
          }}
        >
          <ProfileImage src={profileImg} alt="Pallavi Profile" />
        </motion.div>
      </PhotoSection>

    </FullPageContainer>
  );
}

export default About;
