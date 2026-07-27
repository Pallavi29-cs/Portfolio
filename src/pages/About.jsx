import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../api';

const AboutContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 40px 80px 40px;
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.7;
  margin-bottom: 40px;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const InfoCard = styled.div`
  background-color: ${(props) => props.theme.navBg};
  border: 1px solid #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;

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

const CardHeading = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.link};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DetailItem = styled.div`
  margin-bottom: 15px;
  &:last-child { margin-bottom: 0; }
`;

const TextBold = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
`;

const TextMuted = styled.div`
  font-size: 0.95rem;
  opacity: 0.7;
  line-height: 1.4;
`;

const BulletDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.85;
  margin: 10px 0 0 0;
`;

const SkillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillPill = styled.span`
  background-color: ${(props) => props.theme.body};
  border: 1px solid #444;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.link};
    transform: scale(1.05);
  }
`;

function About() {
  const [about, setAbout] = useState(null);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/about'),
      api.get('/education'),
      api.get('/projects'),
      api.get('/skills')
    ])
      .then(([aboutRes, educationRes, projectsRes, skillsRes]) => {
        setAbout(aboutRes.data);
        setEducation(educationRes.data);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
      })
      .catch((error) => {
        console.error('Error fetching about page data:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AboutContainer>Loading...</AboutContainer>;

  return (
    <AboutContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>About Me</SectionTitle>
        <Subtitle>Professional summary and academic foundations from my resume.</Subtitle>

        <ContentLayout>
          <div>
            <InfoCard>
              <CardHeading>🎓 Education Background</CardHeading>
              {education.map((edu) => (
                <DetailItem key={edu.id}>
                  <TextBold>{edu.degree} in {edu.fieldOfStudy}</TextBold>
                  <TextMuted>{edu.institution} | {edu.startYear} - {edu.endYear}</TextMuted>
                  {edu.grade && <BulletDescription>Grade: {edu.grade}</BulletDescription>}
                </DetailItem>
              ))}
            </InfoCard>

            <InfoCard>
              <CardHeading>🎯 Professional Objective</CardHeading>
              <BulletDescription>{about?.longDescription}</BulletDescription>
            </InfoCard>

            <InfoCard>
              <CardHeading>🛠️ Key Project Highlights</CardHeading>
              {projects.map((project) => (
                <DetailItem key={project.id}>
                  <TextBold>{project.title}</TextBold>
                  <TextMuted>{project.technologyStack}</TextMuted>
                </DetailItem>
              ))}
            </InfoCard>
          </div>

          <div>
            <InfoCard>
              <CardHeading>💻 Technical Core Competencies</CardHeading>
              <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.5, marginBottom: '20px' }}>
                Here are the core programming languages, frameworks, libraries, and developer utilities I deploy across my software engineering pipelines:
              </p>
              <SkillGroup>
                {skills.map((skill) => (
                  <SkillPill key={skill.skillId}>{skill.skillName}</SkillPill>
                ))}
              </SkillGroup>
            </InfoCard>
          </div>
        </ContentLayout>
      </motion.div>
    </AboutContainer>
  );
}

export default About;