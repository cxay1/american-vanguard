# Interactive Quiz Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build core quiz taking system with instructions screen, one-question-at-a-time navigation, timer, progress bar, and results display.

**Architecture:** Client-side state management with localStorage persistence. Components follow the features/assessments structure with hooks for logic, components for UI.

**Tech Stack:** Next.js, TailwindCSS, Framer Motion, TypeScript, Zod

---

## File Structure

```
src/features/assessments/
├── types/
│   └── assessment.types.ts       (NEW)
├── hooks/
│   ├── use-quiz-session.ts       (NEW)
│   └── use-timer.ts              (NEW)
├── components/
│   └── quiz-taker/
│       ├── quiz-container.tsx     (NEW)
│       ├── quiz-instructions.tsx  (NEW)
│       ├── quiz-question.tsx     (NEW)
│       ├── quiz-navigation.tsx    (NEW)
│       ├── quiz-timer.tsx         (NEW)
│       ├── quiz-progress.tsx      (NEW)
│       └── quiz-results.tsx       (NEW)
└── services/
    └── assessments.ts            (NEW) - stub for future DB integration

src/app/student/quiz/
└── [quizId]/
    └── page.tsx                  (NEW)
```

---

## Task 1: Type Definitions

**Files:**
- Create: `src/features/assessments/types/assessment.types.ts`

- [ ] **Step 1: Create types file**

```typescript
export type QuestionType = 'multiple-choice' | 'true-false'

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
  explanation?: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  mediaUrls?: string[]
  options: QuestionOption[]
  points: number
  tags?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface Quiz {
  id: string
  courseId: string
  title: string
  description?: string
  timeLimit: number
  shuffleQuestions: boolean
  showCorrectAnswers: boolean
  passingScore: number
  maxAttempts: number
  questions: Question[]
}

export interface QuizAnswer {
  questionId: string
  selectedOptions: string[]
  timeSpent: number
}

export interface QuizSession {
  quizId: string
  currentIndex: number
  answers: Record<string, string[]>
  startTime: number
  isSubmitted: boolean
  timeSpent: Record<string, number>
}

export interface QuizResult {
  score: number
  totalPoints: number
  percentage: number
  passed: boolean
  questionResults: {
    questionId: string
    correct: boolean
    selectedOptions: string[]
    correctOptions: string[]
    pointsEarned: number
  }[]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/assessments/types/assessment.types.ts
git commit -m "feat: add assessment type definitions"
```

---

## Task 2: Timer Hook

**Files:**
- Create: `src/features/assessments/hooks/use-timer.ts`

- [ ] **Step 1: Create timer hook**

```typescript
import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialTime: number // in seconds
  onTimeUp?: () => void
  autoStart?: boolean
}

export function useTimer({ initialTime, onTimeUp, autoStart = false }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onTimeUpRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback((newTime?: number) => {
    setTimeLeft(newTime ?? initialTime)
    setIsRunning(false)
  }, [initialTime])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    isRunning,
    isWarning: timeLeft > 0 && timeLeft <= 60,
    formattedTime: formatTime(timeLeft),
    start,
    pause,
    reset,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/assessments/hooks/use-timer.ts
git commit -m "feat: add useTimer hook"
```

---

## Task 3: Quiz Session Hook

**Files:**
- Create: `src/features/assessments/hooks/use-quiz-session.ts`

- [ ] **Step 1: Create quiz session hook**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/features/assessments/hooks/use-quiz-session.ts
git commit -m "feat: add useQuizSession hook"
```

---

## Task 4: Quiz Components

**Files:**
- Create: `src/features/assessments/components/quiz-taker/quiz-progress.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-timer.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-instructions.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-question.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-navigation.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-results.tsx`
- Create: `src/features/assessments/components/quiz-taker/quiz-container.tsx`

- [ ] **Step 1: Create quiz-progress component**

```typescript
import { motion } from 'framer-motion'

interface QuizProgressProps {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-yellow-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create quiz-timer component**

```typescript
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface QuizTimerProps {
  timeLeft: number
  formattedTime: string
  isWarning: boolean
}

export function QuizTimer({ timeLeft, formattedTime, isWarning }: QuizTimerProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isWarning ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
      }`}
    >
      <Clock className="w-5 h-5" />
      <span className={`font-mono text-lg font-semibold ${isWarning ? 'animate-pulse' : ''}`}>
        {formattedTime}
      </span>
      {isWarning && (
        <motion.span
          className="text-xs text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Time Left
        </motion.span>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create quiz-instructions component**

```typescript
import { Clock, FileQuestion, Target } from 'lucide-react'

interface QuizInstructionsProps {
  title: string
  description?: string
  timeLimit: number
  questionCount: number
  passingScore: number
  onStart: () => void
}

export function QuizInstructions({
  title,
  description,
  timeLimit,
  questionCount,
  passingScore,
  onStart,
}: QuizInstructionsProps) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        {description && <p className="text-gray-600 mb-6">{description}</p>}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Clock className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{timeLimit}</p>
            <p className="text-sm text-gray-500">Minutes</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <FileQuestion className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{questionCount}</p>
            <p className="text-sm text-gray-500">Questions</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Target className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{passingScore}%</p>
            <p className="text-sm text-gray-500">Passing Score</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Instructions</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Answer all questions to the best of your ability</li>
            <li>• You can navigate between questions using Previous/Next buttons</li>
            <li>• Your answers are automatically saved every 10 seconds</li>
            <li>• The quiz will auto-submit when time runs out</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          aria-label="Start Quiz"
          className="w-full py-4 bg-yellow-600 text-white text-lg font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create quiz-question component**

```typescript
import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '../../types/assessment.types'

interface QuizQuestionProps {
  question: Question
  selectedOptions: string[]
  onSelect: (optionId: string) => void
}

export function QuizQuestion({ question, selectedOptions, onSelect }: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.text}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id)
            return (
              <motion.button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-yellow-400 hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 5: Create quiz-navigation component**

```typescript
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'

interface QuizNavigationProps {
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isFirst: boolean
  isLast: boolean
  hasAnswer: boolean
}

export function QuizNavigation({
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  hasAnswer,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        aria-label="Previous question"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isFirst
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          disabled={!hasAnswer}
          aria-label="Submit quiz"
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
            hasAnswer
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          aria-label="Next question"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Create quiz-results component**

```typescript
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react'
import type { QuizResult, Question } from '../../types/assessment.types'

interface QuizResultsProps {
  result: QuizResult
  questions: Question[]
  onRetake?: () => void
}

export function QuizResults({ result, questions, onRetake }: QuizResultsProps) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Trophy
              className={`w-20 h-20 mx-auto mb-4 ${
                result.passed ? 'text-yellow-500' : 'text-gray-400'
              }`}
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {result.passed ? 'Congratulations!' : 'Keep Trying!'}
          </h1>
          <p className="text-gray-600">
            {result.passed
              ? 'You passed the quiz!'
              : `You need ${result.totalPoints > 0 ? Math.ceil(result.totalPoints * 0.01 * 70) : 0} points to pass.`}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-800 mb-2">{result.percentage}%</p>
            <p className="text-gray-500">
              {result.score} / {result.totalPoints} points
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {result.questionResults.map((qr, index) => {
            const question = questions.find((q) => q.id === qr.questionId)
            return (
              <div
                key={qr.questionId}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  qr.correct ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {qr.correct ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-gray-700 flex-1">
                  Question {index + 1}: {question?.text.substring(0, 50)}...
                </span>
                <span className={`font-semibold ${qr.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {qr.pointsEarned}/{question?.points || 0}
                </span>
              </div>
            )
          })}
        </div>

        {onRetake && (
          <button
            onClick={onRetake}
            className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Retake Quiz
          </button>
        )}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 7: Create quiz-container component**

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QuizInstructions } from './quiz-instructions'
import { QuizQuestion } from './quiz-question'
import { QuizNavigation } from './quiz-navigation'
import { QuizTimer } from './quiz-timer'
import { QuizProgress } from './quiz-progress'
import { QuizResults } from './quiz-results'
import { useTimer } from '../../hooks/use-timer'
import { useQuizSession } from '../../hooks/use-quiz-session'
import type { Quiz, QuizResult } from '../../types/assessment.types'

interface QuizContainerProps {
  quiz: Quiz
}

export function QuizContainer({ quiz }: QuizContainerProps) {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)

  const {
    session,
    hasStarted,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswers,
    isFirstQuestion,
    isLastQuestion,
    startQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
  } = useQuizSession(quiz)

  const { timeLeft, formattedTime, isWarning, start: startTimer } = useTimer({
    initialTime: quiz.timeLimit * 60,
    onTimeUp: handleTimeUp,
    autoStart: false,
  })

  function handleTimeUp() {
    const quizResult = submitQuiz()
    setResult(quizResult)
  }

  const handleStart = useCallback(() => {
    startQuiz()
    startTimer()
  }, [startQuiz, startTimer])

  const handleSubmit = useCallback(() => {
    const quizResult = submitQuiz()
    setResult(quizResult)
  }, [submitQuiz])

  const handleRetake = useCallback(() => {
    router.refresh()
  }, [router])

  // Keyboard navigation
  useEffect(() => {
    if (!hasStarted || result) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLastQuestion) {
        nextQuestion()
      } else if (e.key === 'ArrowLeft' && !isFirstQuestion) {
        prevQuestion()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasStarted, result, isLastQuestion, isFirstQuestion, nextQuestion, prevQuestion])

  if (result) {
    return <QuizResults result={result} questions={quiz.questions} onRetake={handleRetake} />
  }

  if (!hasStarted) {
    return (
      <QuizInstructions
        title={quiz.title}
        description={quiz.description}
        timeLimit={quiz.timeLimit}
        questionCount={quiz.questions.length}
        passingScore={quiz.passingScore}
        onStart={handleStart}
      />
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <QuizProgress current={currentIndex} total={totalQuestions} />
        <QuizTimer
          timeLeft={timeLeft}
          formattedTime={formattedTime}
          isWarning={isWarning}
        />
      </div>

      {currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          selectedOptions={selectedAnswers}
          onSelect={selectAnswer}
        />
      )}

      <QuizNavigation
        onPrevious={prevQuestion}
        onNext={nextQuestion}
        onSubmit={handleSubmit}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        hasAnswer={selectedAnswers.length > 0}
      />
    </div>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/features/assessments/components/quiz-taker/
git add src/features/assessments/hooks/
git commit -m "feat: add quiz taker components and hooks"
```

---

## Task 5: Quiz Page Route

**Files:**
- Create: `src/features/assessments/services/assessments.ts` (stub)
- Create: `src/app/student/quiz/[quizId]/page.tsx`

- [ ] **Step 1: Create services stub**

```typescript
import type { Quiz } from '../types/assessment.types'

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  // TODO: Replace with actual DB fetch using Prisma
  return null
}

export async function saveQuizAttempt(quizId: string, answers: Record<string, string[]>): Promise<void> {
  // TODO: Implement when needed
}
```

- [ ] **Step 2: Create quiz page**

```typescript
import { notFound } from 'next/navigation'
import { QuizContainer } from '@/features/assessments/components/quiz-taker/quiz-container'
import { getQuizById } from '@/features/assessments/services/assessments'

interface PageProps {
  params: Promise<{ quizId: string }>
}

export default async function QuizPage({ params }: PageProps) {
  const { quizId } = await params
  const quiz = await getQuizById(quizId)
  
  if (!quiz) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <QuizContainer quiz={quiz} />
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/assessments/services/assessments.ts
git add src/app/student/quiz/\[quizId\]/page.tsx
git commit -m "feat: add quiz page route and services stub"
```

---

## Task 6: Verify and Test

- [ ] **Step 1: Run TypeScript check**

```bash
cd /home/n0ccx/Documents/projects/transit/not_yet/avi && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Run lint**

```bash
cd /home/n0ccx/Documents/projects/transit/not_yet/avi && npm run lint
```

Expected: No errors

- [ ] **Step 3: Test locally**

```bash
cd /home/n0ccx/Documents/projects/transit/not_yet/avi && npm run dev
```

Navigate to `/student/quiz/quiz-1` and verify:
- Instructions screen displays correctly
- Start button begins quiz
- Timer counts down
- Questions navigate correctly
- Answers can be selected
- Results show after submission

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "feat: complete interactive quiz Phase 1"
```

---

## Acceptance Criteria Checklist

- [ ] User sees instructions screen with quiz info and Start button
- [ ] Timer counts down and warns when under 1 minute
- [ ] User can navigate between questions with buttons and keyboard (arrow keys)
- [ ] Answers are visually highlighted when selected
- [ ] Progress bar updates smoothly
- [ ] Answers auto-save to localStorage every 10 seconds
- [ ] On page reload, answers are restored from localStorage
- [ ] Results screen shows score and breakdown
- [ ] Smooth animations for all transitions
- [ ] Accessible: ARIA labels, keyboard navigation

## Notes

- Network failure handling (queue and retry) deferred to Phase 2
- question-types/ folder simplified - all question rendering in quiz-question.tsx for Phase 1
- Future phases will add: Short Answer, Essay, Matching, Fill-in-blank, Code evaluation
