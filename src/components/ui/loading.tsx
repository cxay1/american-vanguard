/**
 * Reusable Loading Skeleton Components
 * Use these for consistent loading states across the app
 */

import { motion } from 'framer-motion'

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="h-12 bg-gray-50 border-b flex items-center px-6 gap-4">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-16 border-b flex items-center px-6 gap-4">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-200 rounded w-48" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
        <div className="h-12 bg-gray-200 rounded w-32" />
      </div>
    </div>
  )
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-16" />
        <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="w-64 bg-red-600 p-4 space-y-6">
      <div className="h-12 bg-red-700 rounded" />
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-red-700 rounded" />
        ))}
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
        <TableSkeleton />
      </div>
    </div>
  )
}

/**
 * Error Boundary Component
 */
'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="/student/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Empty State Component
 */
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-center mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
