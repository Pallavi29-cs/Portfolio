import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 40px 80px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid #555;
  color: ${(p) => p.theme.text};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 30px 0;
`;

const Section = styled.div`
  background-color: ${(p) => p.theme.navBg};
  border: 1px solid #333;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 16px 0;
  color: ${(p) => p.theme.link};
`;

const Input = styled.input`
  width: 100%;
  padding: 9px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: ${(p) => p.theme.body};
  color: ${(p) => p.theme.text};
  box-sizing: border-box;
  font-size: 0.9rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 9px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: ${(p) => p.theme.body};
  color: ${(p) => p.theme.text};
  box-sizing: border-box;
  font-size: 0.9rem;
  min-height: 70px;
  font-family: inherit;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: ${(p) => p.theme.link};
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
`;

const SmallButton = styled.button`
  background: none;
  border: 1px solid #555;
  color: ${(p) => p.theme.text};
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 6px;
`;

const ItemCard = styled.div`
  background-color: ${(p) => p.theme.body};
  border: 1px solid #333;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.div`
  font-weight: bold;
`;

const ItemSub = styled.div`
  opacity: 0.7;
  font-size: 0.85rem;
  margin-bottom: 6px;
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
`;

const Pill = styled.span`
  background-color: ${(p) => p.theme.body};
  border: 1px solid #444;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RemovePillBtn = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: ${(p) => p.theme.body};
  color: ${(p) => p.theme.text};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  margin-bottom: 10px;
`;

const emptyProject = { title: '', description: '', technologyStack: '', githubUrl: '', liveUrl: '', startDate: null, endDate:null };
const emptyExperience = { company: '', position: '', employmentType: '', description: '', startDate: null, endDate: null, isCurrent: false };
const emptyEducation = { institution: '', degree: '', fieldOfStudy: '', startYear: null, endYear: null, grade: '' };
const emptySocialLink = { platform: '', url: '' };

function AdminPortfolioEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState({ fullName: '', shortDescription: '', longDescription: '' });
  const [contact, setContact] = useState({ email: '', phone: '', address: '', city: '', country: '' });
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsMaster, setSkillsMaster] = useState([]);
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState('');

  const [addingProject, setAddingProject] = useState(false);
  const [projectDraft, setProjectDraft] = useState(emptyProject);
  const [addingExperience, setAddingExperience] = useState(false);
  const [experienceDraft, setExperienceDraft] = useState(emptyExperience);
  const [addingEducation, setAddingEducation] = useState(false);
  const [educationDraft, setEducationDraft] = useState(emptyEducation);
  const [addingSocialLink, setAddingSocialLink] = useState(false);
  const [socialLinkDraft, setSocialLinkDraft] = useState(emptySocialLink);

  const [editingItem, setEditingItem] = useState(null);
  const [editDraft, setEditDraft] = useState({});

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get(`/admin/users/${userId}/portfolio`),
      api.get('/admin/users/skills-master')
    ]).then(([portfolioRes, skillsRes]) => {
      const d = portfolioRes.data;
      setAbout(d.about || { fullName: '', shortDescription: '', longDescription: '' });
      setContact(d.contact || { email: '', phone: '', address: '', city: '', country: '' });
      setProjects(d.projects || []);
      setExperience(d.experience || []);
      setEducation(d.education || []);
      setSocialLinks(d.socialLinks || []);
      setSkills(d.skills || []);
      setSkillsMaster(skillsRes.data || []);
    }).catch((err) => console.error('Error loading portfolio:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, [userId]);

  const saveAbout = async () => {
    try {
      await api.put(`/admin/users/${userId}/portfolio/about`, about);
      alert('About saved');
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const saveContact = async () => {
    try {
      await api.put(`/admin/users/${userId}/portfolio/contact`, contact);
      alert('Contact saved');
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const addSkill = async () => {
    if (!selectedSkillToAdd) return;
    try {
      await api.post(`/admin/users/${userId}/portfolio/skills/${selectedSkillToAdd}`);
      setSelectedSkillToAdd('');
      loadData();
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const removeSkill = async (skillId) => {
    try {
      await api.delete(`/admin/users/${userId}/portfolio/skills/${skillId}`);
      loadData();
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const addItem = async (section, endpoint, draft, resetDraft, setAdding) => {
    try {
      await api.post(`/admin/users/${userId}/portfolio/${endpoint}`, draft);
      resetDraft();
      setAdding(false);
      loadData();
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const startEdit = (section, item) => {
    setEditingItem({ section, id: item.id });
    setEditDraft({ ...item });
  };

  const cancelEdit = () => { setEditingItem(null); setEditDraft({}); };

  const saveEdit = async (endpoint) => {
    try {
      await api.put(`/admin/users/portfolio/${endpoint}/${editingItem.id}`, editDraft);
      cancelEdit();
      loadData();
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  const deleteItem = async (endpoint, id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`/admin/users/portfolio/${endpoint}/${id}`);
      loadData();
    } catch (err) { alert('Error: ' + (err.response?.data?.message || err.message)); }
  };

  if (loading) return <PageContainer>Loading...</PageContainer>;

  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/dashboard')}>← Back to Dashboard</BackButton>
      <PageTitle>Editing Portfolio</PageTitle>

      <Section>
        <SectionTitle>About</SectionTitle>
        <Input placeholder="Full Name" value={about.fullName || ''}
          onChange={(e) => setAbout({ ...about, fullName: e.target.value })} />
        <Input placeholder="Short Description" value={about.shortDescription || ''}
          onChange={(e) => setAbout({ ...about, shortDescription: e.target.value })} />
        <TextArea placeholder="Long Description" value={about.longDescription || ''}
          onChange={(e) => setAbout({ ...about, longDescription: e.target.value })} />
        <SaveButton onClick={saveAbout}>Save About</SaveButton>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Input placeholder="Email" value={contact.email || ''}
          onChange={(e) => setContact({ ...contact, email: e.target.value })} />
        <Input placeholder="Phone" value={contact.phone || ''}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
        <Input placeholder="Address" value={contact.address || ''}
          onChange={(e) => setContact({ ...contact, address: e.target.value })} />
        <Row>
          <Input placeholder="City" value={contact.city || ''}
            onChange={(e) => setContact({ ...contact, city: e.target.value })} />
          <Input placeholder="Country" value={contact.country || ''}
            onChange={(e) => setContact({ ...contact, country: e.target.value })} />
        </Row>
        <SaveButton onClick={saveContact}>Save Contact</SaveButton>
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <PillGroup>
          {skills.map((s) => (
            <Pill key={s.skillId}>
              {s.skillName}
              <RemovePillBtn onClick={() => removeSkill(s.skillId)}>✕</RemovePillBtn>
            </Pill>
          ))}
        </PillGroup>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Select value={selectedSkillToAdd} onChange={(e) => setSelectedSkillToAdd(e.target.value)}>
            <option value="">Select a skill to add...</option>
            {skillsMaster
              .filter((sm) => !skills.some((s) => s.skillId === sm.skillId))
              .map((sm) => (
                <option key={sm.skillId} value={sm.skillId}>{sm.skillName} ({sm.categoryName})</option>
              ))}
          </Select>
          <SaveButton onClick={addSkill}>Add</SaveButton>
        </div>
      </Section>

      <Section>
        <SectionTitle>Projects</SectionTitle>
        {projects.map((p) => (
          <ItemCard key={p.id}>
            {editingItem?.section === 'project' && editingItem.id === p.id ? (
              <>
                <Input placeholder="Title" value={editDraft.title || ''} onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} />
                <TextArea placeholder="Description" value={editDraft.description || ''} onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })} />
                <Input placeholder="Technology Stack" value={editDraft.technologyStack || ''} onChange={(e) => setEditDraft({ ...editDraft, technologyStack: e.target.value })} />
                <Input placeholder="GitHub URL" value={editDraft.githubUrl || ''} onChange={(e) => setEditDraft({ ...editDraft, githubUrl: e.target.value })} />
                <SmallButton onClick={() => saveEdit('projects')}>Save</SmallButton>
                <SmallButton onClick={cancelEdit}>Cancel</SmallButton>
              </>
            ) : (
              <>
                <ItemTitle>{p.title}</ItemTitle>
                <ItemSub>{p.technologyStack}</ItemSub>
                <SmallButton onClick={() => startEdit('project', p)}>Edit</SmallButton>
                <SmallButton onClick={() => deleteItem('projects', p.id)}>Delete</SmallButton>
              </>
            )}
          </ItemCard>
        ))}

        {addingProject ? (
          <ItemCard>
            <Input placeholder="Title" value={projectDraft.title} onChange={(e) => setProjectDraft({ ...projectDraft, title: e.target.value })} />
            <TextArea placeholder="Description" value={projectDraft.description} onChange={(e) => setProjectDraft({ ...projectDraft, description: e.target.value })} />
            <Input placeholder="Technology Stack (comma separated)" value={projectDraft.technologyStack} onChange={(e) => setProjectDraft({ ...projectDraft, technologyStack: e.target.value })} />
            <Input placeholder="GitHub URL" value={projectDraft.githubUrl} onChange={(e) => setProjectDraft({ ...projectDraft, githubUrl: e.target.value })} />
            <SmallButton onClick={() => addItem('project', 'projects', projectDraft, () => setProjectDraft(emptyProject), setAddingProject)}>Add Project</SmallButton>
            <SmallButton onClick={() => setAddingProject(false)}>Cancel</SmallButton>
          </ItemCard>
        ) : (
          <SaveButton onClick={() => setAddingProject(true)}>+ Add Project</SaveButton>
        )}
      </Section>

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {experience.map((exp) => (
          <ItemCard key={exp.id}>
            {editingItem?.section === 'experience' && editingItem.id === exp.id ? (
              <>
                <Input placeholder="Company" value={editDraft.company || ''} onChange={(e) => setEditDraft({ ...editDraft, company: e.target.value })} />
                <Input placeholder="Position" value={editDraft.position || ''} onChange={(e) => setEditDraft({ ...editDraft, position: e.target.value })} />
                <TextArea placeholder="Description" value={editDraft.description || ''} onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })} />
                <SmallButton onClick={() => saveEdit('experience')}>Save</SmallButton>
                <SmallButton onClick={cancelEdit}>Cancel</SmallButton>
              </>
            ) : (
              <>
                <ItemTitle>{exp.position}</ItemTitle>
                <ItemSub>{exp.company}</ItemSub>
                <SmallButton onClick={() => startEdit('experience', exp)}>Edit</SmallButton>
                <SmallButton onClick={() => deleteItem('experience', exp.id)}>Delete</SmallButton>
              </>
            )}
          </ItemCard>
        ))}

        {addingExperience ? (
          <ItemCard>
            <Input placeholder="Company" value={experienceDraft.company} onChange={(e) => setExperienceDraft({ ...experienceDraft, company: e.target.value })} />
            <Input placeholder="Position" value={experienceDraft.position} onChange={(e) => setExperienceDraft({ ...experienceDraft, position: e.target.value })} />
            <Input placeholder="Employment Type" value={experienceDraft.employmentType} onChange={(e) => setExperienceDraft({ ...experienceDraft, employmentType: e.target.value })} />
            <TextArea placeholder="Description" value={experienceDraft.description} onChange={(e) => setExperienceDraft({ ...experienceDraft, description: e.target.value })} />
            <CheckboxLabel>
              <input type="checkbox" checked={experienceDraft.isCurrent} onChange={(e) => setExperienceDraft({ ...experienceDraft, isCurrent: e.target.checked })} />
              Currently working here
            </CheckboxLabel>
            <SmallButton onClick={() => addItem('experience', 'experience', experienceDraft, () => setExperienceDraft(emptyExperience), setAddingExperience)}>Add Experience</SmallButton>
            <SmallButton onClick={() => setAddingExperience(false)}>Cancel</SmallButton>
          </ItemCard>
        ) : (
          <SaveButton onClick={() => setAddingExperience(true)}>+ Add Experience</SaveButton>
        )}
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {education.map((ed) => (
          <ItemCard key={ed.id}>
            {editingItem?.section === 'education' && editingItem.id === ed.id ? (
              <>
                <Input placeholder="Institution" value={editDraft.institution || ''} onChange={(e) => setEditDraft({ ...editDraft, institution: e.target.value })} />
                <Input placeholder="Degree" value={editDraft.degree || ''} onChange={(e) => setEditDraft({ ...editDraft, degree: e.target.value })} />
                <Input placeholder="Field of Study" value={editDraft.fieldOfStudy || ''} onChange={(e) => setEditDraft({ ...editDraft, fieldOfStudy: e.target.value })} />
                <SmallButton onClick={() => saveEdit('education')}>Save</SmallButton>
                <SmallButton onClick={cancelEdit}>Cancel</SmallButton>
              </>
            ) : (
              <>
                <ItemTitle>{ed.degree} in {ed.fieldOfStudy}</ItemTitle>
                <ItemSub>{ed.institution} | {ed.startYear} - {ed.endYear}</ItemSub>
                <SmallButton onClick={() => startEdit('education', ed)}>Edit</SmallButton>
                <SmallButton onClick={() => deleteItem('education', ed.id)}>Delete</SmallButton>
              </>
            )}
          </ItemCard>
        ))}

        {addingEducation ? (
          <ItemCard>
            <Input placeholder="Institution" value={educationDraft.institution} onChange={(e) => setEducationDraft({ ...educationDraft, institution: e.target.value })} />
            <Input placeholder="Degree" value={educationDraft.degree} onChange={(e) => setEducationDraft({ ...educationDraft, degree: e.target.value })} />
            <Input placeholder="Field of Study" value={educationDraft.fieldOfStudy} onChange={(e) => setEducationDraft({ ...educationDraft, fieldOfStudy: e.target.value })} />
            <Row>
              <Input placeholder="Start Year" type="number" value={educationDraft.startYear} onChange={(e) => setEducationDraft({ ...educationDraft, startYear: e.target.value })} />
              <Input placeholder="End Year" type="number" value={educationDraft.endYear} onChange={(e) => setEducationDraft({ ...educationDraft, endYear: e.target.value })} />
            </Row>
            <Input placeholder="Grade" value={educationDraft.grade} onChange={(e) => setEducationDraft({ ...educationDraft, grade: e.target.value })} />
            <SmallButton onClick={() => addItem('education', 'education', educationDraft, () => setEducationDraft(emptyEducation), setAddingEducation)}>Add Education</SmallButton>
            <SmallButton onClick={() => setAddingEducation(false)}>Cancel</SmallButton>
          </ItemCard>
        ) : (
          <SaveButton onClick={() => setAddingEducation(true)}>+ Add Education</SaveButton>
        )}
      </Section>

      <Section>
        <SectionTitle>Social Links</SectionTitle>
        {socialLinks.map((link) => (
          <ItemCard key={link.id}>
            {editingItem?.section === 'sociallink' && editingItem.id === link.id ? (
              <>
                <Input placeholder="Platform" value={editDraft.platform || ''} onChange={(e) => setEditDraft({ ...editDraft, platform: e.target.value })} />
                <Input placeholder="URL" value={editDraft.url || ''} onChange={(e) => setEditDraft({ ...editDraft, url: e.target.value })} />
                <SmallButton onClick={() => saveEdit('sociallinks')}>Save</SmallButton>
                <SmallButton onClick={cancelEdit}>Cancel</SmallButton>
              </>
            ) : (
              <>
                <ItemTitle>{link.platform}</ItemTitle>
                <ItemSub>{link.url}</ItemSub>
                <SmallButton onClick={() => startEdit('sociallink', link)}>Edit</SmallButton>
                <SmallButton onClick={() => deleteItem('sociallinks', link.id)}>Delete</SmallButton>
              </>
            )}
          </ItemCard>
        ))}

        {addingSocialLink ? (
          <ItemCard>
            <Input placeholder="Platform (e.g. GitHub)" value={socialLinkDraft.platform} onChange={(e) => setSocialLinkDraft({ ...socialLinkDraft, platform: e.target.value })} />
            <Input placeholder="URL" value={socialLinkDraft.url} onChange={(e) => setSocialLinkDraft({ ...socialLinkDraft, url: e.target.value })} />
            <SmallButton onClick={() => addItem('sociallink', 'sociallinks', socialLinkDraft, () => setSocialLinkDraft(emptySocialLink), setAddingSocialLink)}>Add Link</SmallButton>
            <SmallButton onClick={() => setAddingSocialLink(false)}>Cancel</SmallButton>
          </ItemCard>
        ) : (
          <SaveButton onClick={() => setAddingSocialLink(true)}>+ Add Social Link</SaveButton>
        )}
      </Section>
    </PageContainer>
  );
}

export default AdminPortfolioEdit;