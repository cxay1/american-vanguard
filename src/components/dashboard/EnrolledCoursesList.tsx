'use client'

import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DashboardGrid } from '@/components/dashboard'
import { EnrolledCourse } from '@/types/dashboard'

interface EnrolledCoursesListProps {
  courses: EnrolledCourse[]
  className?: string
}

export function EnrolledCoursesList({ courses, className }: EnrolledCoursesListProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Enrolled Courses</h3>
      <DashboardGrid>
        {courses.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No courses enrolled yet</p>
        ) : (
          courses.slice(0, 4).map((course) => (
            <div 
              key={course.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-neutral-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-white">{course.code}</p>
                  <p className="text-sm text-neutral-400">{course.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={course.status === 'ENROLLED' ? 'bg-green-500' : 'bg-neutral-500'}>
                  {course.status}
                </Badge>
                <span className="text-sm text-neutral-500">{course.credits} credits</span>
              </div>
            </div>
          ))
        )}
        <Link 
          href="/courses" 
          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
        >
          <span>View all courses</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </DashboardGrid>
    </div>
  )
}

export default EnrolledCoursesList
