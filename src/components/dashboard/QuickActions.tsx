'use client'

import Link from 'next/link'
import { 
  BookOpen, 
  CreditCard, 
  ClipboardList, 
  Clock3, 
  FileText, 
  Laptop, 
  Library, 
  User 
} from 'lucide-react'

const quickActions = [
  { href: '/student/courses', icon: BookOpen, label: 'Course Registration' },
  { href: '/student/fees', icon: CreditCard, label: 'Pay Fees' },
  { href: '/student/grades', icon: ClipboardList, label: 'View Grades' },
  { href: '/student/timetable', icon: Clock3, label: 'Timetable' },
  { href: '/student/exams', icon: FileText, label: 'Exams' },
  { href: '/student/elearning', icon: Laptop, label: 'E-Learning' },
  { href: '/student/library', icon: Library, label: 'Library' },
  { href: '/student/profile', icon: User, label: 'My Profile' },
]

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <Link 
            key={action.href}
            href={action.href} 
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-600 hover:bg-neutral-800 transition-all group"
          >
            <action.icon className="w-8 h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-neutral-300 text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
