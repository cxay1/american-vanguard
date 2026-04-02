'use client'

import { GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DashboardGrid } from '@/components/dashboard'
import { Grade } from '@/types/dashboard'

interface RecentGradesListProps {
  grades: Grade[]
  className?: string
}

export function getGradeColor(grade: string) {
  if (grade.startsWith('A')) return 'bg-green-500'
  if (grade.startsWith('B')) return 'bg-blue-500'
  if (grade.startsWith('C')) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function RecentGradesList({ grades, className }: RecentGradesListProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Grades</h3>
      <DashboardGrid>
        {grades.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No grades posted yet</p>
        ) : (
          grades.slice(0, 4).map((grade) => (
            <div 
              key={grade.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-neutral-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-white">{grade.courseCode}</p>
                  <p className="text-sm text-neutral-400">{grade.courseName}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getGradeColor(grade.grade)}>
                  {grade.grade}
                </Badge>
                <p className="text-xs text-neutral-500 mt-1">{grade.semester}</p>
              </div>
            </div>
          ))
        )}
      </DashboardGrid>
    </div>
  )
}

export default RecentGradesList
