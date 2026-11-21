import { LoaderCircle } from 'lucide-react'

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-5 text-sm font-semibold text-slate-500">
      <LoaderCircle className="animate-spin text-indigo-600" size={18} /> {label}
    </div>
  )
}
