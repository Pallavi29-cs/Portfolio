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

const SkillsBox = styled.div`
  background-color: ${(props) => props.theme.navBg};
  border: 1px solid #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const SkillPill = styled(motion.span)`
  background-color: ${(props) => props.theme.body};
  border: 1px solid #444;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
`;

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills')
      .then((res) => setSkills(res.data))
      .catch((error) => console.error('Error fetching skills:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullPageContainer>Loading...</FullPageContainer>;

  return (
    <FullPageContainer>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionTitle>Technical Competencies</SectionTitle>
        <Subtitle>Programming languages, design libraries, and developer tools from my resume.</Subtitle>

        <SkillsBox>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '1rem' }}>
            Core technological tools I implement across my engineering and development pipelines:
          </p>
          <PillGroup>
            {skills.map((skill) => (
              <SkillPill
                key={skill.skillId}
                whileHover={{ scale: 1.05, borderColor: '#66B2FF' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                💻 {skill.skillName}
              </SkillPill>
            ))}
          </PillGroup>
        </SkillsBox>
      </motion.div>
    </FullPageContainer>
  );
}

export default Skills;