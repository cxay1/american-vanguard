import type { Quiz } from '../types/assessment.types'

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  // TODO: Replace with actual DB fetch using Prisma
  return null
}

export async function saveQuizAttempt(quizId: string, answers: Record<string, string[]>): Promise<void> {
  // TODO: Implement when needed
}
