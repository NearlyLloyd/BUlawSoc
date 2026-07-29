import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteLayout } from './components/SiteLayout'
import { ContactPage } from './pages/ContactPage'
import { EducationPage } from './pages/EducationPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { JoiningPage } from './pages/JoiningPage'
import { ScholarshipsPage } from './pages/ScholarshipsPage'
import { SocietyPage } from './pages/SocietyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/society" element={<SocietyPage />} />
          <Route path="/joining" element={<JoiningPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
