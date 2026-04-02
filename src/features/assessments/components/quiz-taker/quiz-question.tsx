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
