export type RelevantFile = {
  similarityScore: number
  fileName: string
  sourceCode: string
  fileSummary: string
}

export type Answer = {
  id: string
  question: string
  summary: string
  relevantFiles: RelevantFile[]
  createdAt: string
}

export type IndexResponse = { message: string }
export type AskResponse = {
  message: string
  AI_Summary: string
  relaventFiles?: RelevantFile[]
}
