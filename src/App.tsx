import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { MetrikaHit } from './components/MetrikaHit'
import { ProfilePage } from './pages/ProfilePage'
import { TricksPage } from './pages/TricksPage'
import { ToolsPage } from './pages/ToolsPage'
import { CounterPage } from './pages/CounterPage'
import { MetronomePage } from './pages/MetronomePage'
import { SignalsPage } from './pages/SignalsPage'
import { IntervalPage } from './pages/IntervalPage'
import { SectionPage } from './pages/SectionPage'
import { TrickListPage } from './pages/TrickListPage'
import { TrickDetailPage } from './pages/TrickDetailPage'
import { CompoundPage } from './pages/CompoundPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <MetrikaHit />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ProfilePage />} />
          <Route path="tricks" element={<TricksPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/counter" element={<CounterPage />} />
          <Route path="tools/metronome" element={<MetronomePage />} />
          <Route path="tools/signals" element={<SignalsPage />} />
          <Route path="tools/interval" element={<IntervalPage />} />
          <Route path="section/:sectionId" element={<SectionPage />} />
          <Route path="section/:sectionId/:listId" element={<TrickListPage />} />
          <Route
            path="section/:sectionId/:listId/compound"
            element={<CompoundPage />}
          />
          <Route
            path="section/:sectionId/:listId/:trickId"
            element={<TrickDetailPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
