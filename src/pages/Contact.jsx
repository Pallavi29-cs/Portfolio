import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../api';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ContactCard = styled.div`
  background-color: ${(props) => props.theme.navBg};
  border: 2px solid ${(props) => props.theme.link};
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InfoRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.body};
  border: 1px solid #333;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(8px);
    border-color: ${(props) => props.theme.link};
  }
`;

const IconBox = styled.span`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const DetailText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 2px;
`;

const ValueLink = styled.a`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.link};
  }
`;

const platformIcons = {
  LinkedIn: '💼',
  GitHub: '💻',
  Twitter: '🐦',
  Instagram: '📸'
};

function Contact() {
  const [contact, setContact] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/contact'),
      api.get('/sociallinks')
    ])
      .then(([contactRes, socialRes]) => {
        setContact(contactRes.data);
        setSocialLinks(socialRes.data);
      })
      .catch((error) => console.error('Error fetching contact data:', error))
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  if (loading) return <ContactContainer>Loading...</ContactContainer>;

  return (
    <ContactContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <ContactCard>
          <Title>Get In Touch</Title>

          <InfoList as={motion.div} variants={containerVariants} initial="hidden" animate="show">

            {contact?.phone && (
              <InfoRow variants={itemVariants}>
                <IconBox>📞</IconBox>
                <DetailText>
                  <Label>Phone</Label>
                  <ValueLink href={`tel:${contact.phone}`}>{contact.phone}</ValueLink>
                </DetailText>
              </InfoRow>
            )}

            {contact?.email && (
              <InfoRow variants={itemVariants}>
                <IconBox>✉️</IconBox>
                <DetailText>
                  <Label>Email</Label>
                  <ValueLink href={`mailto:${contact.email}`}>{contact.email}</ValueLink>
                </DetailText>
              </InfoRow>
            )}

            {socialLinks.map((link) => (
              <InfoRow key={link.id} variants={itemVariants}>
                <IconBox>{platformIcons[link.platform] || '🔗'}</IconBox>
                <DetailText>
                  <Label>{link.platform}</Label>
                  <ValueLink href={link.url} target="_blank" rel="noreferrer">
                    {link.url}
                  </ValueLink>
                </DetailText>
              </InfoRow>
            ))}

          </InfoList>
        </ContactCard>
      </motion.div>
    </ContactContainer>
  );
}

export default Contact;