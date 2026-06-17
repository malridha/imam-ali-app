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
import Teaching from './pages/Teaching'
import Family from './pages/Family'
import Reels from './pages/Reels'
import Unity from './pages/Unity'
import Testimonies from './pages/Testimonies'

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
      {/* v49 §80 — Family tree (parents, wives, children) */}
      <Route path="/family" element={<Family />} />
      {/* v46 §75 — Teachings library */}
      <Route path="/teachings" element={<Teachings />} />
      {/* v48 §76 — Global search across wisdom + du'as + poetry + letters + sermons + biography */}
      <Route path="/search" element={<Search />} />
      {/* v49 §77 — Discussion hub: explore philosophy, poetry, wisdom with the companion */}
      <Route path="/discuss" element={<Discuss />} />
      {/* v49 §78 — Du'a recitation coach: recite along, word-accuracy + AI guidance */}
      <Route path="/recite" element={<Recite />} />
      {/* v49 §79 — Single-teaching page (one teaching per page, flip + explain) */}
      <Route path="/teaching" element={<Teaching />} />
      {/* v50 §81 — Reflections: calm full-screen swipe-feed of authenticated teachings */}
      <Route path="/reflections" element={<Reels />} />
      {/* legacy alias so any early /reels links still resolve */}
      <Route path="/reels" element={<Navigate to="/reflections" replace />} />
      {/* v50 §82 — Our stance on unity: the anti-sectarian charter (Qur'an + Imam Ali) */}
      <Route path="/unity" element={<Unity />} />
      {/* v51 §83 — What was said about him: searchable testimonies + works, all traditions */}
      <Route path="/testimonies" element={<Testimonies />} />
    </Routes>
  )
}
