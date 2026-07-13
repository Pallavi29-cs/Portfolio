import { motion } from 'framer-motion';
import styled from 'styled-components';

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
  gap: 25px; /* Perfect spacing between rows */
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
    transform: translateX(8px); /* Subtle shift right when hovered */
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

function Contact() {
  // Stagger animation rules for the list rows
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Elements pop in one after another
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

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
            
            {/* 1. Phone Number Row */}
            <InfoRow variants={itemVariants}>
              <IconBox>📞</IconBox>
              <DetailText>
                <Label>Phone</Label>
                <ValueLink href="tel:+917899309770">+91-7899309770</ValueLink>
              </DetailText>
            </InfoRow>

            {/* 2. Email Row */}
            <InfoRow variants={itemVariants}>
              <IconBox>✉️</IconBox>
              <DetailText>
                <Label>Email</Label>
                <ValueLink href="mailto:pallavishiva2902@gmail.com">pallavishiva2902@gmail.com</ValueLink>
              </DetailText>
            </InfoRow>

            {/* 3. LinkedIn Profile Row */}
            <InfoRow variants={itemVariants}>
              <IconBox>💼</IconBox>
              <DetailText>
                <Label>LinkedIn</Label>
                <ValueLink href="https://www.linkedin.com/in/pallaviscs/" target="_blank" rel="noreferrer">
                https://www.linkedin.com/in/pallaviscs/
                </ValueLink>
              </DetailText>
            </InfoRow>

            {/* 4. GitHub Profile Row */}
            <InfoRow variants={itemVariants}>
              <IconBox>💻</IconBox>
              <DetailText>
                <Label>GitHub</Label>
                <ValueLink href="https://github.com/Pallavi29-cs" target="_blank" rel="noreferrer">
                  https://github.com/Pallavi29-cs
                </ValueLink>
              </DetailText>
            </InfoRow>

          </InfoList>
        </ContactCard>
      </motion.div>
    </ContactContainer>
  );
}

export default Contact;
