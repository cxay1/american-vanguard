import { useState, useEffect, useCallback, useRef } from 'react'
import type { Quiz, QuizSession, QuizResult } from '../types/assessment.types'

const STORAGE_KEY = 'quiz_session'
const AUTO_SAVE_INTERVAL = 10000 // 10 seconds

export function useQuizSession(quiz: Quiz) {
  const [session, setSession] = useState<QuizSession>({
    quizId: quiz.id,
    currentIndex: 0,
    answers: {},
    startTime: 0,
    isSubmitted: false,
    timeSpent: {},
  })
  const [hasStarted, setHasStarted] = useState(false)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const stored = localStorage.getItem(`${STORAGE_KEY}_${quiz.id}`)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as QuizSession
        if (!parsed.isSubmitted) {
          setSession(parsed)
          setHasStarted(true)
        }
      } catch {
        localStorage.removeItem(`${STORAGE_KEY}_${quiz.id}`)
      }
    }
  }, [quiz.id])

  // Auto-save every 10 seconds
  useEffect(() => {
    if (!hasStarted || session.isSubmitted) return

    autoSaveTimerRef.current = setInterval(() => {
      localStorage.setItem(`${STORAGE_KEY}_${quiz.id}`, JSON.stringify(session))
    }, AUTO_SAVE_INTERVAL)

    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current)
      }
    }
  }, [hasStarted, session, quiz.id])

  const startQuiz = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      startTime: Date.now(),
    }))
    setHasStarted(true)
  }, [])

  const selectAnswer = useCallback((questionId: string, optionId: string) => {
    setSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: [optionId],
      },
    }))
  }, [])

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < quiz.questions.length) {
      setSession((prev) => ({
        ...prev,
        currentIndex: index,
      }))
    }
  }, [quiz.questions.length])

  const nextQuestion = useCallback(() => {
    goToQuestion(session.currentIndex + 1)
  }, [session.currentIndex, goToQuestion])

  const prevQuestion = useCallback(() => {
    goToQuestion(session.currentIndex - 1)
  }, [session.currentIndex, goToQuestion])

  const submitQuiz = useCallback((): QuizResult => {
    let totalPoints = 0
    let earnedPoints = 0

    const questionResults = quiz.questions.map((question) => {
      totalPoints += question.points
      const selectedOptions = session.answers[question.id] || []
      const correctOptions = question.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id)

      const correct = 
        selectedOptions.length === correctOptions.length &&
        selectedOptions.every((id) => correctOptions.includes(id))

      const pointsEarned = correct ? question.points : 0
      earnedPoints += pointsEarned

      return {
        questionId: question.id,
        correct,
        selectedOptions,
        correctOptions,
        pointsEarned,
      }
    })

    const result: QuizResult = {
      score: earnedPoints,
      totalPoints,
      percentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0,
      passed: totalPoints > 0 ? (earnedPoints / totalPoints) * 100 >= quiz.passingScore : false,
      questionResults,
    }

    setSession((prev) => ({ ...prev, isSubmitted: true }))
    localStorage.removeItem(`${STORAGE_KEY}_${quiz.id}`)

    return result
  }, [quiz, session.answers])

  const currentQuestion = quiz.questions[session.currentIndex]
  const selectedAnswers = session.answers[currentQuestion?.id] || []

  return {
    session,
    hasStarted,
    currentQuestion,
    currentIndex: session.currentIndex,
    totalQuestions: quiz.questions.length,
    selectedAnswers,
    isFirstQuestion: session.currentIndex === 0,
    isLastQuestion: session.currentIndex === quiz.questions.length - 1,
    startQuiz,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  }
}
