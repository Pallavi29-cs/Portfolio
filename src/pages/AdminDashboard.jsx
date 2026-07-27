import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';

const DashboardContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px 40px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  opacity: 0.7;
  margin: 0 0 25px 0;
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.link};
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.theme.navBg};
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #444;
  opacity: 0.7;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #333;
`;

const RoleBadge = styled.span`
  background-color: ${(props) => (props.role === 'Admin' ? props.theme.link : '#444')};
  color: white;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid #555;
  color: ${(props) => props.theme.text};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 6px;
  font-size: 0.85rem;

  &:hover {
    border-color: ${(props) => props.theme.link};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  background-color: ${(props) => props.theme.navBg};
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 450px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  box-sizing: border-box;
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  flex: 1;
  background-color: ${(props) => props.theme.link};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`;

const SecondaryButton = styled.button`
  flex: 1;
  background: none;
  border: 1px solid #555;
  color: ${(props) => props.theme.text};
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
`;

const EmptyState = styled.p`
  text-align: center;
  opacity: 0.6;
  padding: 40px 0;
`;

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'User', portfolioTitle: '' });

  const fetchUsers = () => {
    setLoading(true);
    api.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setForm({ username: '', email: '', password: '', role: 'User', portfolioTitle: '' });
    setShowAddModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', form);
      setShowAddModal(false);
      fetchUsers();
    } catch (err) {
      alert('Error adding user: ' + (err.response?.data?.message || err.message));
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({ username: user.username, email: user.email, role: user.role, password: '', portfolioTitle: '' });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editingUser.id}`, {
        username: form.username,
        email: form.email,
        role: form.role
      });
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      alert('Error updating user: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.username}"? This can be undone in the database later (soft delete).`)) return;
    try {
      await api.delete(`/admin/users/${user.id}`);
      fetchUsers();
    } catch (err) {
      alert('Error deleting user: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleView = (user) => {
    navigate(`/view-portfolio/${user.id}`);
  };

  return (
    <DashboardContainer>
      <Title>Admin Dashboard</Title>
      <Subtitle>Manage portfolio users</Subtitle>

      <AddButton onClick={openAddModal}>+ Add User</AddButton>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <EmptyState>No users yet. Click "Add User" to create one.</EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td><RoleBadge role={user.role}>{user.role}</RoleBadge></Td>
                <Td>
                  <ActionButton onClick={() => handleView(user)}>View</ActionButton>
                  <ActionButton onClick={() => openEditModal(user)}>Edit</ActionButton>
                  <ActionButton onClick={() => handleDelete(user)}>Delete</ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showAddModal && (
        <ModalOverlay onClick={() => setShowAddModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>Add User</h3>
            <form onSubmit={handleAddSubmit}>
              <Input placeholder="Username" required
                value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <Input placeholder="Email" type="email" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Password" type="password" required
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Select>
              <Input placeholder="Portfolio Title (optional)"
                value={form.portfolioTitle} onChange={(e) => setForm({ ...form, portfolioTitle: e.target.value })} />
              <ModalButtonRow>
                <PrimaryButton type="submit">Create</PrimaryButton>
                <SecondaryButton type="button" onClick={() => setShowAddModal(false)}>Cancel</SecondaryButton>
              </ModalButtonRow>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}

      {showEditModal && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>Edit User</h3>
            <form onSubmit={handleEditSubmit}>
              <Input placeholder="Username" required
                value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <Input placeholder="Email" type="email" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Select>
              <ModalButtonRow>
                <PrimaryButton type="submit">Save Changes</PrimaryButton>
                <SecondaryButton type="button" onClick={() => setShowEditModal(false)}>Cancel</SecondaryButton>
              </ModalButtonRow>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}

export default AdminDashboard;