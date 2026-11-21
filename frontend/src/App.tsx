import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { AskRepoPage } from './pages/AskRepoPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7f8fb] text-slate-950">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask-repo" element={<AskRepoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
