import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function AdminHeader({ 
  title, 
  description, 
  actionLabel,
  onAction 
}: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-neutral-400">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-yellow-600 hover:bg-yellow-700 gap-2">
          <Plus className="w-4 h-4" /> {actionLabel}
        </Button>
      )}
    </div>
  )
}
