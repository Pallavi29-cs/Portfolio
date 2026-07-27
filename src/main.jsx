import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Experience from './pages/Experience.jsx'
import Education from './pages/Education.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import AdminPortfolioEdit from './pages/AdminPortfolioEdit.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Portfolio">
      <Routes>
        {/* Login sits OUTSIDE the App layout - no navbar/footer here */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<App />}>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="experience" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
          <Route path="education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
          <Route path="skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
          <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="view-portfolio/:userId" element={<ProtectedRoute requireAdmin={true}><AdminPortfolioEdit /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)