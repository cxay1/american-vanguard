'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AdminModal({ open, onClose, title, children, footer }: AdminModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-neutral-300">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-neutral-800">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface AdminConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function AdminConfirmModal({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger'
}: AdminConfirmModalProps) {
  const buttonVariant = variant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700' 
    : variant === 'warning'
    ? 'bg-yellow-600 hover:bg-yellow-700'
    : 'bg-yellow-600 hover:bg-yellow-700'

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} className="border-neutral-700 text-white">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} className={buttonVariant}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-neutral-400">{message}</p>
    </AdminModal>
  )
}
