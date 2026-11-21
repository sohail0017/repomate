import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, CircleDot, Sparkles } from 'lucide-react'

export function Header() {
  const location = useLocation()
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
            <Sparkles size={19} />
          </span>
          <span className="text-lg font-extrabold tracking-[-0.04em]">REPO MATE</span>
        </Link>
        {location.pathname === '/ask-repo' ? (
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950">
            <ArrowLeft size={16} /> New repository
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            <CircleDot size={13} className="text-emerald-500" /> AI code companion
          </div>
        )}
      </div>
    </header>
  )
}
