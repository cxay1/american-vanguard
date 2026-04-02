'use client'

import Link from 'next/link'
import { Bell, ArrowRight } from 'lucide-react'
import { DashboardSection } from '@/components/dashboard'
import { DashboardNotification } from '@/types/dashboard'

interface NotificationGridProps {
  notifications: DashboardNotification[]
  className?: string
}

export function NotificationGrid({ notifications, className }: NotificationGridProps) {
  const unreadNotifications = notifications.filter(n => !n.isRead).length

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <Link href="/student/notifications" className="text-sm text-yellow-600 hover:text-yellow-500 flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <DashboardSection title="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.length === 0 ? (
            <p className="text-neutral-400 text-center py-8 col-span-3">No notifications</p>
          ) : (
            notifications.slice(0, 6).map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border transition-colors ${
                  notification.isRead 
                    ? 'bg-neutral-900 border-neutral-800' 
                    : 'bg-neutral-800 border-yellow-600/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-yellow-600" />
                    <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                  </div>
                  {!notification.isRead && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  )}
                </div>
                <p className="text-sm text-neutral-400 mb-2">{notification.message}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
        {unreadNotifications > 0 && (
          <div className="mt-4 text-center">
            <span className="text-yellow-600 text-sm">{unreadNotifications} unread notification{unreadNotifications !== 1 ? 's' : ''}</span>
          </div>
        )}
      </DashboardSection>
    </div>
  )
}

export default NotificationGrid
