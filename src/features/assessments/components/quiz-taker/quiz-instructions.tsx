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
