'use client'

import React, { useState } from 'react'
import {
  StudentLayout,
  StudentInfoCard,
  StatsWidget,
  DashboardTabs,
  CourseRegistrationTab,
  ElectionTab,
  TimetableTab,
  NotificationsTab,
  QuickLinksWidget,
  DeadlinesWidget,
  AnnouncementsPreview,
  QuickStatsWidget,
} from '@/components/features/student-dashboard'
import { GradesView } from '@/components/dashboard/GradesView'
import SupportChat from '@/components/features/SupportChat'
import type { StudentInfo, UnitStats, FeeInfo, DashboardTab } from '@/types/studentDashboard'
import { Bell, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const mockStudentInfo: StudentInfo = {
  matricNumber: '2005003013',
  regNumber: '22259597CF',
  firstName: 'Adeniyi Victor',
  lastName: 'Ayomide',
  email: 'adeniyi.victor@example.com',
  faculty: 'Engineering',
  department: 'Electrical & Electronic Engineering',
  programme: 'B.Eng. Electrical & Electronic Engineering',
  level: 500,
  status: 'Active',
  session: '2025/2026',
  semester: 'FIRST SEMESTER',
  entryMode: 'UTME',
  entryYear: 2020,
  profileImage: '../uploads/11015-d14efe5e-7045-42a4-9e53-0b597c3643c0_11zon-3.jpeg',
}

const mockUnitStats: UnitStats = {
  maximumUnit: 28,
  registeredUnit: 0,
  unusedUnit: 28,
  compulsoryUnit: 0,
  requiredUnit: 0,
  electiveUnit: 0,
}

const mockFeeInfo: FeeInfo = {
  totalBill: 1392000,
  totalPayment: 896375,
  totalOutstanding: 495625,
}

const mockCourses = [
  { code: 'EEE 501', name: 'Advanced Power Systems', unit: 3 },
  { code: 'EEE 503', name: 'Digital Signal Processing', unit: 3 },
  { code: 'EEE 505', name: 'Control Systems II', unit: 3 },
  { code: 'EEE 507', name: 'Microelectronics', unit: 3 },
]

const mockPolls = [
  { title: 'Student Union Election 2025', description: 'Vote for your next student union representative', isActive: true },
]

const mockTimetable = [
  { courseCode: 'EEE 501', courseName: 'Advanced Power Systems', day: 'Monday', time: '9:00 - 11:00', venue: 'LT 1' },
  { courseCode: 'EEE 503', courseName: 'Digital Signal Processing', day: 'Tuesday', time: '11:00 - 13:00', venue: 'LT 2' },
  { courseCode: 'EEE 505', courseName: 'Control Systems II', day: 'Wednesday', time: '14:00 - 16:00', venue: 'LT 1' },
]

const mockNotifications = [
  { title: 'Welcome', message: 'Welcome back to the portal!', timestamp: new Date(), read: false },
  { title: 'Course Registration', message: 'Course registration is now open', timestamp: new Date(), read: true },
]

export default function StudentDashboardPage() {
  const dashboardTabs: DashboardTab[] = [
    {
      id: 'registration',
      label: 'My Registration',
      icon: 'registration',
      content: <CourseRegistrationTab courses={mockCourses} />,
    },
    {
      id: 'grades',
      label: 'Grades',
      icon: 'grades',
      content: <GradesView />,
    },
    {
      id: 'election',
      label: 'Online Election',
      icon: 'election',
      content: <ElectionTab polls={mockPolls} />,
    },
    {
      id: 'timetable',
      label: 'Lecture Timetable',
      icon: 'timetable',
      content: <TimetableTab entries={mockTimetable} />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications',
      content: <NotificationsTab notifications={mockNotifications} />,
    },
  ]

  const unreadNotifications = mockNotifications.filter((n) => !n.read).length

  return (
    <StudentLayout studentName={`${mockStudentInfo.firstName} ${mockStudentInfo.lastName}`} studentImage={mockStudentInfo.profileImage}>
      <div className="min-h-screen bg-neutral-950">
        {/* Page Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                Dashboard
                <span className="px-3 py-1 text-sm font-normal bg-green-500/20 text-green-400 rounded-full">
                  Welcome Back {mockStudentInfo.firstName}!
                </span>
              </h1>
            </div>
            <Link
              href="/student/notifications"
              className="relative p-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:border-yellow-600 transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-400" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Student Info */}
            <div className="lg:col-span-1 space-y-6">
              <StudentInfoCard student={mockStudentInfo} />
              <QuickStatsWidget />
            </div>

            {/* Right Column - Widgets & Tabs */}
            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickLinksWidget />
                <DeadlinesWidget />
              </div>
              <AnnouncementsPreview />
              <StatsWidget unitStats={mockUnitStats} feeInfo={mockFeeInfo} />
              <DashboardTabs tabs={dashboardTabs} defaultTab="registration" />
            </div>
          </div>
        </div>
      </div>
      <SupportChat />
    </StudentLayout>
  )
}
