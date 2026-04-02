'use client'

import { 
  DashboardContainer,
  DashboardHeader,
  DashboardSection,
  QuickActions,
  EnrolledCoursesList,
  RecentGradesList,
  PaymentStatusList,
  UpcomingExamsList,
  NotificationGrid,
  StatsDisplay,
  Button
} from '@/components/dashboard'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useDashboard } from '@/hooks/useDashboard'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations'

export function DashboardClient({ userId, userName }: { userId: string | null; userName?: string | null }) {
  const { stats, enrolledCourses, recentGrades, upcomingExams, payments, notifications, isLoading, error, refresh } = useDashboard(userId)

  if (isLoading) {
    return (
      <DashboardContainer>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
        </div>
      </DashboardContainer>
    )
  }

  if (error) {
    return (
      <DashboardContainer>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error loading dashboard: {error}</p>
          <Button onClick={refresh}>Try Again</Button>
        </div>
      </DashboardContainer>
    )
  }

  const unreadNotifications = notifications.filter(n => !n.isRead).length

  return (
    <DashboardContainer>
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <div className="flex items-center justify-between">
          <DashboardHeader 
            title={userName ? `Welcome back, ${userName}!` : "Welcome back!"} 
            description="Here's what's happening with your studies"
          />
          <Link 
            href="/student/notifications" 
            className="relative p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-yellow-600 transition-colors"
          >
            <Bell className="w-6 h-6 text-neutral-400" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </Link>
        </div>

        <DashboardSection title="Your Stats">
          <StatsDisplay 
            enrolledCourses={stats?.enrolledCourses ?? 0}
            totalCredits={stats?.totalCredits ?? 0}
            gpa={stats?.gpa ?? 0}
            pendingPayments={stats?.pendingPayments ?? 0}
          />
        </DashboardSection>

        <QuickActions className="mt-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <DashboardSection title="Enrolled Courses">
            <EnrolledCoursesList courses={enrolledCourses} />
          </DashboardSection>

          <DashboardSection title="Recent Grades">
            <RecentGradesList grades={recentGrades} />
          </DashboardSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <DashboardSection title="Fee Payment Status">
            <PaymentStatusList payments={payments} />
          </DashboardSection>

          <DashboardSection title="Upcoming Exams">
            <UpcomingExamsList exams={upcomingExams} />
          </DashboardSection>
        </div>

        <NotificationGrid notifications={notifications} className="mt-6" />
      </motion.div>
    </DashboardContainer>
  )
}
