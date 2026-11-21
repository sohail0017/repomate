import { FileCode2 } from 'lucide-react'
import type { RelevantFile } from '../types'

export function RelevantFiles({ files }: { files: RelevantFile[] }) {
  if (!files.length) return null
  return (
    <section className="mt-7 border-t border-slate-200 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">Relevant files</h3>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">{files.length} found</span>
      </div>
      <div className="space-y-5">
        {files.map((file) => (
          <article key={file.fileName} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <FileCode2 size={17} className="text-indigo-500" />
                <span className="mono text-sm">{file.fileName}</span>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {(file.similarityScore * 100).toFixed(1)}% match
              </span>
            </div>
            <div className="bg-[#11151c] px-5 py-5 text-[13px] leading-7 text-lime-300">
              <pre className="mono max-h-80 overflow-auto whitespace-pre-wrap break-words">{file.sourceCode}</pre>
            </div>
            <div className="px-5 py-4">
              <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">File summary</p>
              <p className="text-sm leading-6 text-slate-600">{file.fileSummary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
