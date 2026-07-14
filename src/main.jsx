import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx' // Changed About to Home
import About from './pages/Home.jsx' // New separate About page
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Portfolio">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* Home handles the splash screen */}
          <Route path="about" element={<About />} /> {/* About handles resume details */}
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
