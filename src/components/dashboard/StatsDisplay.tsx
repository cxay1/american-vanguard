'use client'

import { BookOpen, GraduationCap, DollarSign, FileText } from 'lucide-react'
import { DashboardStatsGrid, DashboardStat } from '@/components/dashboard'

interface StatsDisplayProps {
  enrolledCourses: number
  totalCredits: number
  gpa: number
  pendingPayments: number
  className?: string
}

export function mapStatsToDisplay(stats: { enrolledCourses: number; totalCredits: number; gpa: number; pendingPayments: number } | null): DashboardStat[] {
  if (!stats) return []
  
  return [
    { label: 'Enrolled Courses', value: stats.enrolledCourses.toString(), icon: BookOpen, change: 'Current' },
    { label: 'Total Credits', value: stats.totalCredits.toString(), icon: GraduationCap, change: 'Spring 2026' },
    { label: 'GPA', value: stats.gpa.toFixed(2), icon: FileText, change: 'Out of 4.0' },
    { label: 'Pending Payments', value: stats.pendingPayments.toString(), icon: DollarSign, change: 'Due Soon' },
  ]
}

export function StatsDisplay({ enrolledCourses, totalCredits, gpa, pendingPayments, className }: StatsDisplayProps) {
  const stats = mapStatsToDisplay({ enrolledCourses, totalCredits, gpa, pendingPayments })

  return (
    <div className={className}>
      <DashboardStatsGrid stats={stats} />
    </div>
  )
}

export default StatsDisplay
