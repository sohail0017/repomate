import { ChevronDown, MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import type { Answer } from '../types'
import { RelevantFiles } from './RelevantFiles'

export function AnswerAccordion({ answer, defaultOpen = false }: { answer: Answer; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-7">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><MessageSquareText size={17} /></span>
        <span className="flex-1 text-sm font-bold leading-6 text-slate-800 sm:text-base">{answer.question}</span>
        <ChevronDown size={19} className={`shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-7 pt-6 sm:px-7">
          <div className="prose prose-slate max-w-none whitespace-pre-wrap text-sm leading-7 text-slate-600">{answer.summary}</div>
          <RelevantFiles files={answer.relevantFiles} />
        </div>
      )}
    </article>
  )
}
