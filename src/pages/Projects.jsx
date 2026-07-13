import { motion } from 'framer-motion';
import styled from 'styled-components';

// This wrapper stretches tightly to fill up the screen view space without leaking downwards
const FixedFrameContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh; /* Adjusts beautifully within your app main screen frame */
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 5px 0;
  letter-spacing: -1px;
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.7;
  margin: 0 0 25px 0;
`;

// A tight grid structure designed specifically to house exactly 4 elements symmetrically
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Forms a balanced 2x2 grid layout block */
  gap: 20px; /* Reduced gap size to save space */
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Fallback stack layout solely on mobile screens */
    gap: 15px;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${(props) => props.theme.navBg};
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px; /* Slimmer inner padding */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => props.theme.link};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 8px 0;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.8;
  margin: 0 0 15px 0;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
  margin-top: auto; /* Securely locks tags near lower boundary line */
`;

const TechTag = styled.span`
  font-size: 0.7rem;
  background-color: ${(props) => props.theme.body};
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #444;
  font-weight: 600;
`;

const ProjectLink = styled.a`
  color: ${(props) => props.theme.link};
  text-decoration: none;
  font-weight: bold;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    text-decoration: underline;
  }
`;

function Projects() {
  const myProjectsData = [
    {
      title: "Smart Helmet 3.0",
      description: "An IoT safety system that disables motorcycle ignition if alcohol is detected or if the helmet isn't worn. Sends GPS coordinates via GSM SMS during a crash.",
      tags: ["IoT", "MQ3 Sensors", "IR Sensors", "GPS/GSM"],
      github: "https://github.com"
    },
    {
      title: "Shop Skin Care Website",
      description: "An e-commerce skin care platform utilizing a responsive React interface combined with a Python ML/Node.js backend for personalized routines.",
      tags: ["React.js", "Python", "Node.js", "OpenAI", "Streamlit"],
      github: "https://github.com"
    },
    {
      title: "Stock Prediction Analysis Platform",
      description: "Interactive financial visualizer tracking technical indicators (RSI, MACD, Bollinger Bands) backed by Hugging Face conversational AI tools.",
      tags: ["Python", "Streamlit", "Hugging Face", "Data Visualization"],
      github: "https://github.com"
    },
    {
      title: "Dark Pattern Detector",
      description: "Vulnerability assessor website designed to detect malicious pop-ups and SQL injections on e-commerce storefronts using Mistral AI reporting logs.",
      tags: ["Python", "Streamlit", "Mistral AI", "Cybersecurity"],
      github: "https://github.com"
    }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } }
  };

  return (
    <FixedFrameContainer>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <SectionTitle>My Projects</SectionTitle>
        <SectionSubtitle>Technical systems and software platforms I have developed at AMC Engineering College.</SectionSubtitle>
      </motion.div>

      <ProjectsGrid as={motion.div} variants={gridVariants} initial="hidden" animate="show">
        {myProjectsData.map((project, index) => (
          <ProjectCard 
            key={index} 
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            
            <TagGroup>
              {project.tags.map((tag, tIndex) => (
                <TechTag key={tIndex}>{tag}</TechTag>
              ))}
            </TagGroup>

            <div>
              <ProjectLink href={project.github} target="_blank" rel="noreferrer">
                💻 GitHub Code
              </ProjectLink>
            </div>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </FixedFrameContainer>
  );
}

export default Projects;
