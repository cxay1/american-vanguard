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
