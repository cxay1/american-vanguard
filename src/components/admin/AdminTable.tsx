'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface AdminTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

export function AdminTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onRowClick,
  emptyMessage = 'No data found'
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-800">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="text-left py-3 px-4 text-sm font-medium text-neutral-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`border-b border-neutral-800 transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-neutral-800/50' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4 text-white">
                  {col.render ? col.render(item) : String((item as any)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function AdminPagination({ currentPage, totalPages, onPageChange }: AdminPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm text-neutral-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
