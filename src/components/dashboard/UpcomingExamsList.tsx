'use client'

import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DashboardGrid } from '@/components/dashboard'
import { Exam } from '@/types/dashboard'

interface UpcomingExamsListProps {
  exams: Exam[]
  className?: string
}

export function getExamTypeColor(type: string) {
  switch (type) {
    case 'Final':
      return 'bg-red-500'
    case 'Midterm':
      return 'bg-yellow-500'
    case 'Quiz':
      return 'bg-blue-500'
    default:
      return 'bg-neutral-500'
  }
}

export function UpcomingExamsList({ exams, className }: UpcomingExamsListProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Upcoming Exams</h3>
      <DashboardGrid>
        {exams.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No upcoming exams</p>
        ) : (
          exams.slice(0, 4).map((exam) => (
            <div 
              key={exam.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-neutral-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-white">{exam.courseCode}</p>
                  <p className="text-sm text-neutral-400">{exam.courseName}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getExamTypeColor(exam.type)}>
                  {exam.type}
                </Badge>
                <p className="text-xs text-neutral-500 mt-1">{exam.date} at {exam.time}</p>
                <p className="text-xs text-neutral-500">{exam.venue}</p>
              </div>
            </div>
          ))
        )}
      </DashboardGrid>
    </div>
  )
}

export default UpcomingExamsList
