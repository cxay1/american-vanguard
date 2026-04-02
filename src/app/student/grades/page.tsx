'use client'

import React, { useState, useEffect } from 'react'
import { StudentLayout } from '@/components/features/student-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, BookOpen, TrendingUp } from 'lucide-react'

interface Grade {
  id: number
  score: number
  grade: string
  semester: string
  academicYear: string
  course: {
    code: string
    name: string
    credits: number
  }
}

const gradeColors: Record<string, string> = {
  'A': 'bg-green-500/20 text-green-400',
  'B': 'bg-blue-500/20 text-blue-400',
  'C': 'bg-yellow-500/20 text-yellow-400',
  'D': 'bg-orange-500/20 text-orange-400',
  'F': 'bg-red-500/20 text-red-400'
}

const gradePoints: Record<string, number> = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 }

export default function StudentGradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [semester, setSemester] = useState('all')
  const [academicYear, setAcademicYear] = useState('all')

  const semesters = ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026']
  const academicYears = ['2024/2025', '2025/2026']

  useEffect(() => {
    fetchGrades()
  }, [semester, academicYear])

  const fetchGrades = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (semester !== 'all') params.set('semester', semester)
      if (academicYear !== 'all') params.set('academicYear', academicYear)

      const res = await fetch(`/api/grades?${params.toString()}`)
      const data = await res.json()
      setGrades(data.grades || [])
    } catch (error) {
      console.error('Error fetching grades:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateGPA = (gradeList: Grade[]) => {
    if (gradeList.length === 0) return '0.00'
    const totalPoints = gradeList.reduce((sum, g) => sum + (gradePoints[g.grade] || 0), 0)
    return (totalPoints / gradeList.length).toFixed(2)
  }

  const totalCredits = grades.reduce((sum, g) => sum + g.course.credits, 0)
  const currentGPA = calculateGPA(grades)
  const semestersWithGrades = Array.from(new Set(grades.map(g => `${g.semester} ${g.academicYear}`)))

  return (
    <StudentLayout studentName="Adeniyi Victor">
      <div className="min-h-screen bg-neutral-950">
        {/* Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              Check Result
            </h1>
            <p className="text-neutral-400 mt-1">View your grades and academic performance</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                >
                  <option value="all">All Semesters</option>
                  {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                >
                  <option value="all">All Years</option>
                  {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-200">Current GPA</p>
                        <p className="text-3xl font-bold text-white">{currentGPA}</p>
                        <p className="text-xs text-blue-200 mt-1">out of 4.0</p>
                      </div>
                      <Award className="w-10 h-10 text-white/50" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-400">Total Credits</p>
                        <p className="text-3xl font-bold text-white">{totalCredits}</p>
                        <p className="text-xs text-neutral-500 mt-1">completed</p>
                      </div>
                      <BookOpen className="w-10 h-10 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-400">Courses</p>
                        <p className="text-3xl font-bold text-white">{grades.length}</p>
                        <p className="text-xs text-neutral-500 mt-1">completed</p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Grades Table */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white">Grade Report</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-600"></div>
                    </div>
                  ) : grades.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400">
                      <p>No grades available for selected filters</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-800">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Course</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Credits</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-neutral-400">Score</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-neutral-400">Grade</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Point</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-400">Semester</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grades.map((grade) => (
                            <tr key={grade.id} className="border-t border-neutral-800">
                              <td className="px-4 py-3">
                                <p className="font-medium text-white">{grade.course.code}</p>
                                <p className="text-sm text-neutral-400">{grade.course.name}</p>
                              </td>
                              <td className="px-4 py-3 text-neutral-400">{grade.course.credits}</td>
                              <td className="px-4 py-3 text-center text-neutral-400">{grade.score}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2 py-1 rounded text-sm font-medium ${gradeColors[grade.grade] || 'bg-neutral-500/20 text-neutral-400'}`}>
                                  {grade.grade}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-neutral-400">{gradePoints[grade.grade]?.toFixed(1)}</td>
                              <td className="px-4 py-3 text-neutral-500">{grade.semester} {grade.academicYear}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Semester Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {semestersWithGrades.length === 0 ? (
                    <p className="text-neutral-500 text-sm">No data available</p>
                  ) : (
                    <div className="space-y-3">
                      {semestersWithGrades.map((sem) => {
                        const semGrades = grades.filter(g => `${g.semester} ${g.academicYear}` === sem)
                        const semGPA = calculateGPA(semGrades)
                        return (
                          <div key={sem} className="flex justify-between items-center p-2 bg-neutral-800 rounded-lg">
                            <span className="text-sm text-neutral-400">{sem}</span>
                            <span className="font-medium text-yellow-500">GPA: {semGPA}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Grade Scale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-neutral-400">A (90-100)</span><span className="font-medium text-green-400">4.0</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">B (80-89)</span><span className="font-medium text-blue-400">3.0</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">C (70-79)</span><span className="font-medium text-yellow-400">2.0</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">D (60-69)</span><span className="font-medium text-orange-400">1.0</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">F (0-59)</span><span className="font-medium text-red-400">0.0</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
