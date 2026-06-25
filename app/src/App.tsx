import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// Setup is the landing page — keep it EAGER so the first paint is instant.
import Setup from './pages/Setup'

// v51 (C3) — every other page is lazy-loaded, so the initial bundle no longer
// carries them or the ~2 MB authenticated corpus they pull in. Each page (and
// the shared corpus chunk) loads on demand the first time its route is visited.
const Companion = lazy(() => import('./pages/Companion'))
const MyStory = lazy(() => import('./pages/MyStory'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Biography = lazy(() => import('./pages/Biography'))
const Teachings = lazy(() => import('./pages/Teachings'))
const Search = lazy(() => import('./pages/Search'))
const Discuss = lazy(() => import('./pages/Discuss'))
const Recite = lazy(() => import('./pages/Recite'))
const Teaching = lazy(() => import('./pages/Teaching'))
const Family = lazy(() => import('./pages/Family'))
const Reels = lazy(() => import('./pages/Reels'))
const Unity = lazy(() => import('./pages/Unity'))
const Testimonies = lazy(() => import('./pages/Testimonies'))
const Settings = lazy(() => import('./pages/Settings'))

// Brief, on-brand placeholder shown while a route chunk loads. Uses the app
// background so there's no white flash, with the threshold glyph dimmed.
function RouteFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--gold, #d4b364)',
        fontSize: 26,
        opacity: 0.5,
      }}
    >
      ◉
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
        {/* v53 — Settings: name, date of birth, gender, language. Collected once
            at first launch (Onboarding), editable any time from here on. */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
