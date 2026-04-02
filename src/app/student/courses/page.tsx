'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  CourseCatalog,
  RegisteredCourses,
  CourseFilters,
} from '@/components/courses'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StudentLayout } from '@/components/features/student-dashboard'
import { GraduationCap, Search } from 'lucide-react'

interface Course {
  id: number
  code: string
  name: string
  credits: number
  maxCapacity: number
  enrolledCount: number
  schedule?: any
  department: { name: string }
  instructor?: { firstName: string; lastName: string } | null
}

interface Registration {
  id: number
  course: Course
}

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [departmentId, setDepartmentId] = useState('all')
  const [semester, setSemester] = useState('Fall 2025')
  const [academicYear] = useState('2025/2026')

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (departmentId !== 'all') params.set('departmentId', departmentId)
      params.set('semester', semester)
      params.set('academicYear', academicYear)

      const res = await fetch(`/api/courses?${params.toString()}`)
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }, [search, departmentId, semester, academicYear])

  const fetchMyCourses = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      params.set('semester', semester)
      params.set('academicYear', academicYear)

      const res = await fetch(`/api/courses/my?${params.toString()}`)
      const data = await res.json()
      setRegistrations(data.registrations || [])
    } catch (error) {
      console.error('Error fetching my courses:', error)
    }
  }, [semester, academicYear])

  useEffect(() => {
    fetchCourses()
    fetchMyCourses()
  }, [fetchCourses, fetchMyCourses])

  const handleRegister = async (courseId: number) => {
    try {
      const res = await fetch('/api/courses/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, semester, academicYear }),
      })

      if (res.ok) {
        fetchCourses()
        fetchMyCourses()
      }
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  const handleDrop = async (registrationId: number) => {
    try {
      const res = await fetch(`/api/courses/register?id=${registrationId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchCourses()
        fetchMyCourses()
      }
    } catch (error) {
      console.error('Error dropping:', error)
    }
  }

  const registeredCourseIds = registrations.map((r) => r.course.id)
  const totalCredits = registrations.reduce((sum, r) => sum + r.course.credits, 0)

  return (
    <StudentLayout studentName="Adeniyi Victor">
      <div className="min-h-screen bg-neutral-950">
        {/* Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-yellow-500" />
                Course Registration
              </h1>
              <p className="text-neutral-400 mt-1">{semester} • {academicYear} Academic Year</p>
            </div>
            <div className="bg-neutral-800 rounded-lg px-4 py-3 border border-neutral-700">
              <p className="text-sm text-neutral-400">Registered Credits</p>
              <p className="text-xl font-bold text-yellow-500">{totalCredits}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="catalog">
            <TabsList className="bg-neutral-800 border border-neutral-700">
              <TabsTrigger value="catalog" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                Course Catalog
              </TabsTrigger>
              <TabsTrigger value="my" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                My Courses ({registrations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="mt-6">
              <div className="mb-6">
                <CourseFilters
                  search={search}
                  departmentId={departmentId}
                  semester={semester}
                  onSearchChange={setSearch}
                  onDepartmentChange={setDepartmentId}
                  onSemesterChange={setSemester}
                  departments={[]}
                />
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-600"></div>
                </div>
              ) : (
                <CourseCatalog
                  courses={courses}
                  registeredCourseIds={registeredCourseIds}
                  onRegister={handleRegister}
                  onDrop={(id) => handleDrop(id)}
                />
              )}
            </TabsContent>

            <TabsContent value="my" className="mt-6">
              <RegisteredCourses
                courses={registrations}
                onDrop={handleDrop}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StudentLayout>
  )
}
