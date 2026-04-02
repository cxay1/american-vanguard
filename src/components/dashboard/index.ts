// Dashboard Container Components
export { DashboardContainer } from './dashboard-container'
export { DashboardHeader } from './dashboard-header'
export { DashboardStatsGrid, type DashboardStat } from './dashboard-stats-grid'
export { DashboardSection } from './dashboard-section'
export { DashboardGrid } from './dashboard-grid'
export { HiringPipeline } from './hiring-pipeline'

// Dashboard Sub-Components
export { QuickActions } from './QuickActions'
export { EnrolledCoursesList } from './EnrolledCoursesList'
export { RecentGradesList, getGradeColor } from './RecentGradesList'
export { PaymentStatusList, getPaymentStatusColor } from './PaymentStatusList'
export { UpcomingExamsList, getExamTypeColor } from './UpcomingExamsList'
export { NotificationGrid } from './NotificationGrid'
export { StatsDisplay, mapStatsToDisplay } from './StatsDisplay'

// Re-export commonly used UI components for convenience
export { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export { Badge } from '@/components/ui/badge'
export { Button } from '@/components/ui/button'
