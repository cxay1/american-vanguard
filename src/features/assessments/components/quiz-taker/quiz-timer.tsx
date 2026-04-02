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
