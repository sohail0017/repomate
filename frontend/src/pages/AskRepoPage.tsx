import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUp, BookOpen, GitBranch, Sparkles } from 'lucide-react'
import { askQuestion } from '../lib/api'
import { storage } from '../lib/storage'
import type { Answer } from '../types'
import { AnswerAccordion } from '../components/AnswerAccordion'
import { LoadingState } from '../components/LoadingState'

export function AskRepoPage() {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState<Answer[]>(storage.getAnswers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const repo = storage.getRepo()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!question.trim() || loading) return
    const asked = question.trim(); setQuestion(''); setError(''); setLoading(true)
    try {
      const response = await askQuestion(asked)
      const next: Answer = { id: crypto.randomUUID(), question: asked, summary: response.AI_Summary, relevantFiles: response.relaventFiles ?? [], createdAt: new Date().toISOString() }
      const updated = [next, ...answers]; setAnswers(updated); storage.setAnswers(updated)
    } catch (requestError) {
      setQuestion(asked); setError(requestError instanceof Error ? requestError.message : 'Unable to answer this question.')
    } finally { setLoading(false) }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-12">
      <div className="mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400"><span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm"><GitBranch size={13} /> {repo || 'Indexed repository'}</span><span>is ready to explore</span></div>
        <h1 className="text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">Ask your repository<span className="text-indigo-600">.</span></h1>
        <p className="mt-3 text-base text-slate-500">Get precise answers grounded in the files that matter.</p>
      </div>
      <form onSubmit={handleSubmit} className="sticky top-5 z-10 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
        <div className="flex items-center gap-3 px-4 py-2"><Sparkles size={19} className="text-indigo-500" /><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="e.g. How does the authentication flow work?" className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold outline-none placeholder:text-slate-400" /><button aria-label="Ask question" disabled={loading || !question.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-indigo-600 disabled:opacity-40"><ArrowUp size={18} /></button></div>
        {error && <p className="px-4 pb-2 text-sm font-semibold text-rose-600">{error}</p>}
      </form>
      {loading && <LoadingState label="Reading your codebase..." />}
      <section className="mt-10 space-y-4">
        {answers.length === 0 && !loading ? <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center"><BookOpen className="mx-auto text-indigo-400" size={30} /><h2 className="mt-4 font-extrabold text-slate-800">Start a conversation</h2><p className="mt-2 text-sm text-slate-500">Ask anything about the indexed repository.</p></div> : answers.map((answer, index) => <AnswerAccordion key={answer.id} answer={answer} defaultOpen={index === 0} />)}
      </section>
    </main>
  )
}
