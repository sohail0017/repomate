import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, GitBranch, LockKeyhole, Search, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { indexRepository } from '../lib/api'
import { storage } from '../lib/storage'
import { LoadingState } from '../components/LoadingState'

export function HomePage() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!url.trim()) return setError('Enter a GitHub repository URL to continue.')
    setError(''); setLoading(true)
    try {
      await indexRepository(url.trim(), token.trim())
      storage.setRepo(url.trim())
      storage.clearAnswers()
      navigate('/ask-repo')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to index this repository.')
    } finally { setLoading(false) }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <section>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-600">
            <Search size={14} /> Understand your codebase
          </div>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-[-0.065em] text-slate-950 sm:text-7xl">
            Your repo, <span className="text-indigo-600">finally</span> making sense.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">Repo Mate indexes your GitHub codebase and turns it into a conversation. Ask questions, find files, and move faster.</p>
          <form onSubmit={handleSubmit} className="mt-10 max-w-xl rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
            <div className="flex items-center gap-3 px-4 py-3">
              <GitBranch size={20} className="shrink-0 text-slate-400" />
              <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://github.com/owner/repository" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400" />
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 px-4 py-3">
              <LockKeyhole size={17} className="shrink-0 text-slate-400" />
              <input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="GitHub token (optional, for private repos)" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </div>
            {error && <p className="px-4 pb-2 text-sm font-semibold text-rose-600">{error}</p>}
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-indigo-600 disabled:cursor-wait disabled:opacity-70">
              {loading ? <LoadingState label="Indexing repository..." /> : <>Understand my repo <ArrowUpRight size={17} /></>}
            </button>
          </form>
          <Link
            to="/ask-repo"
            className="mt-4 flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Search size={17} /> Ask questions about your indexed repo
            <ArrowUpRight size={17} />
          </Link>
          <div className="mt-6 flex items-center gap-5 text-xs font-bold text-slate-400"><span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-500" /> No code stored externally</span><span>•</span><span>Works with public & private repos</span></div>
        </section>
        <div className="relative hidden min-h-[430px] items-center justify-center lg:flex">
          <div className="hero-orb absolute h-80 w-80 rounded-[5rem] bg-gradient-to-br from-indigo-500 to-violet-500 opacity-10 blur-2xl" />
          <div className="relative w-full max-w-md rotate-[-3deg] rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-indigo-200/60">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4"><span className="h-3 w-3 rounded-full bg-rose-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" /><span className="ml-auto mono text-[10px] text-slate-300">repo-mate.app</span></div>
            <div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-widest text-indigo-500">Ask your repo</p><p className="mt-3 text-lg font-bold leading-7 text-slate-800">How does authentication work?</p><div className="mt-5 h-2 w-4/5 rounded-full bg-slate-200" /><div className="mt-2 h-2 w-3/5 rounded-full bg-slate-200" /><div className="mt-7 rounded-xl bg-[#11151c] p-4 mono text-xs leading-6 text-lime-300">src/auth/middleware.ts<br />src/config/session.ts</div></div>
          </div>
        </div>
      </div>
    </main>
  )
}
