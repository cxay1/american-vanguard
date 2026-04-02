'use client'

import Link from 'next/link'
import { CheckCircle, AlertCircle, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DashboardGrid } from '@/components/dashboard'
import { PaymentStatus } from '@/types/dashboard'

interface PaymentStatusListProps {
  payments: PaymentStatus[]
  className?: string
}

export function getPaymentStatusColor(status: string) {
  switch (status) {
    case 'paid':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'overdue':
      return 'bg-red-500'
    default:
      return 'bg-yellow-500'
  }
}

function PaymentStatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'paid':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'overdue':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    default:
      return <Clock className="w-5 h-5 text-yellow-600" />
  }
}

export function PaymentStatusList({ payments, className }: PaymentStatusListProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-white mb-4">Fee Payment Status</h3>
      <DashboardGrid>
        {payments.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No payment records</p>
        ) : (
          payments.slice(0, 4).map((payment) => (
            <div 
              key={payment.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-neutral-900 border border-neutral-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <PaymentStatusIcon status={payment.status} />
                </div>
                <div>
                  <p className="font-medium text-white">{payment.description}</p>
                  <p className="text-sm text-neutral-400">${payment.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getPaymentStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
                <p className="text-xs text-neutral-500 mt-1">
                  {payment.paidAt ? `Paid: ${payment.paidAt}` : `Due: ${payment.dueDate}`}
                </p>
              </div>
            </div>
          ))
        )}
        <Link 
          href="/billing" 
          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
        >
          <span>View payment details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </DashboardGrid>
    </div>
  )
}

export default PaymentStatusList
