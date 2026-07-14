import { motion } from 'framer-motion';
import styled from 'styled-components';
import profileImg from '../assets/profile.jpeg';

// Spans the full height and width of the screen with comfortable 10% edge margins
const FullPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pushes text left, photo right */
  min-height: 80vh;               /* Uses almost the entire screen height */
  padding: 0 10%;                 
  gap: 5%;                        /* Fluid spacing between layout blocks */
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 0 5%;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Stacks image on top for mobile devices */
    text-align: center;
    justify-content: center;
    padding: 40px 20px;
    gap: 40px;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

// Massive prominent typography scales
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
  margin: 0 0 35px 0; /* Creates comfortable spacing before the button */
  max-width: 700px;

  @media (max-width: 1200px) { font-size: 1.5rem; }
  @media (max-width: 768px) { font-size: 1.2rem; }
`;

// Customized interactive call-to-action button
const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start; /* Prevents the button from expanding horizontally */
  background-color: ${(props) => props.theme.link};
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 6px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media (max-width: 768px) {
    align-self: center; /* Centers the button on mobile screens */
  }
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
  width: 35vw; /* Scales fluidly with the width of the display window */
  height: 35vw;
  max-width: 450px;
  min-width: 250px;
  object-fit: cover;
  border-radius: 0px; /* Crisp square borders */
  border: 6px solid ${(props) => props.theme.link};
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
`;

// Function name updated to Home to match your export tracking link parameters
function Home() {
  return (
    <FullPageContainer>
      
      {/* Left Block: Bold Greeting Typography */}
      <TextSection>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <MainTitle>Welcome to Pallavi's Portfolio</MainTitle>
          <Subtitle>I am a passionate engineer creating robust software interfaces.</Subtitle>
          
          {/* Points directly to public/resume.pdf and forces a new view tab workspace */}
          <ResumeButton
            href="/Portfolio/resume.pdf"
            target="_blank"                                           
            rel="noreferrer"                              
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            📄 View Resume
          </ResumeButton>
        </motion.div>
      </TextSection>

      {/* Right Block: Elastic Spring Dropping Photo Frame */}
      <PhotoSection>
        <motion.div
          initial={{ opacity: 0, y: -250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 70,
            damping: 12,
            delay: 0.4
          }}
        >
          <ProfileImage src={profileImg} alt="Pallavi Profile" />
        </motion.div>
      </PhotoSection>

    </FullPageContainer>
  );
}

export default Home;
