import type { Answer } from '../types'

const REPO_KEY = 'repo-mate:repo'
const ANSWERS_KEY = 'repo-mate:answers'

export const storage = {
  getRepo: () => localStorage.getItem(REPO_KEY) ?? '',
  setRepo: (repo: string) => localStorage.setItem(REPO_KEY, repo),
  getAnswers: (): Answer[] => {
    try {
      return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? '[]') as Answer[]
    } catch {
      return []
    }
  },
  setAnswers: (answers: Answer[]) =>
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers)),
  clearAnswers: () => localStorage.removeItem(ANSWERS_KEY),
}
