import { Navigate, Route, Routes } from 'react-router-dom'
import Setup from './pages/Setup'
import Companion from './pages/Companion'
import MyStory from './pages/MyStory'
import Calendar from './pages/Calendar'
import Privacy from './pages/Privacy'
import Biography from './pages/Biography'
import Teachings from './pages/Teachings'
import Search from './pages/Search'
import Discuss from './pages/Discuss'
import Recite from './pages/Recite'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Setup />} />
      <Route path="/chat" element={<Companion />} />
      {/* v15 removed the four-path system. Any old links to
          /paths or /companion/* are redirected to the unified chat. */}
      <Route path="/paths" element={<Navigate to="/" replace />} />
      <Route path="/companion/:path" element={<Navigate to="/chat" replace />} />
      <Route path="/story" element={<MyStory />} />
      {/* v27 §53 — Voice is locked. Old /voice picker route now sends
          the user home so bookmarks don't 404. */}
      <Route path="/voice" element={<Navigate to="/" replace />} />
      {/* v24 §50 — Islamic religious calendar */}
      <Route path="/calendar" element={<Calendar />} />
      {/* v41 §70 — Privacy policy */}
      <Route path="/privacy" element={<Privacy />} />
      {/* v46 §74 — Biography of Imam Ali */}
      <Route path="/biography" element={<Biography />} />
      {/* v46 §75 — Teachings library */}
      <Route path="/teachings" element={<Teachings />} />
      {/* v48 §76 — Global search across wisdom + du'as + poetry + letters + sermons + biography */}
      <Route path="/search" element={<Search />} />
      {/* v49 §77 — Discussion hub: explore philosophy, poetry, wisdom with the companion */}
      <Route path="/discuss" element={<Discuss />} />
      {/* v49 §78 — Du'a recitation coach: recite along, word-accuracy + AI guidance */}
      <Route path="/recite" element={<Recite />} />
    </Routes>
  )
}
