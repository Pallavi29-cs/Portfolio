import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../api';

const FullPageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 5px 0;
`;
const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.7;
  margin: 0 0 25px 0;
`;
const TimelineCard = styled.div`
  background-color: ${(props) => props.theme.navBg};
  border: 1px solid #333;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  &:last-child { margin-bottom: 0; }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${(props) => props.theme.link};
  }
`;
const RoleTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 5px 0;
  color: ${(props) => props.theme.link};
`;
const CompanyDuration = styled.div`
  font-size: 1rem;
  opacity: 0.7;
  font-weight: bold;
  margin-bottom: 15px;
`;
const BulletPoint = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0 0 10px 0;
  &:last-child { margin-bottom: 0; }
`;

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experience')
      .then((res) => setExperience(res.data))
      .catch((error) => console.error('Error fetching experience:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullPageContainer>Loading...</FullPageContainer>;

  return (
    <FullPageContainer>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionTitle>Work Experience</SectionTitle>
        <Subtitle>My professional track, technical internships, and engineering roles.</Subtitle>

        {experience.map((exp) => (
          <TimelineCard key={exp.id}>
            <RoleTitle>{exp.position}</RoleTitle>
            <CompanyDuration>
              {exp.company} | {exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}
            </CompanyDuration>
            {exp.description?.split('|').map((bullet, i) => (
              <BulletPoint key={i}>🔹 {bullet.trim()}</BulletPoint>
            ))}
          </TimelineCard>
        ))}
      </motion.div>
    </FullPageContainer>
  );
}
export default Experience;