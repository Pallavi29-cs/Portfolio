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

const EduCard = styled.div`
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

const DegreeTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 5px 0;
  color: ${(props) => props.theme.link};
`;

const CollegeText = styled.div`
  font-size: 1rem;
  opacity: 0.7;
  font-weight: bold;
  margin-bottom: 12px;
`;

const FocusText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0;
`;

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/education')
      .then((res) => setEducation(res.data))
      .catch((error) => console.error('Error fetching education:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <FullPageContainer>Loading...</FullPageContainer>;

  return (
    <FullPageContainer>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionTitle>Education Background</SectionTitle>
        <Subtitle>Academic qualifications and institutional benchmarks from my resume.</Subtitle>

        {education.map((edu) => (
          <EduCard key={edu.id}>
            <DegreeTitle>{edu.degree} in {edu.fieldOfStudy}</DegreeTitle>
            <CollegeText>{edu.institution} | {edu.startYear} - {edu.endYear}</CollegeText>
            <FocusText>🎓 {edu.grade}</FocusText>
          </EduCard>
        ))}
      </motion.div>
    </FullPageContainer>
  );
}

export default Education;