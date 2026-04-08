'use client'

export default function NotificationsLoading() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="h-8 bg-neutral-800 rounded w-40 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-800 rounded w-56 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {['All', 'Unread'].map((filter) => (
                <div key={filter} className="h-10 bg-neutral-800 rounded-lg w-20 animate-pulse" />
              ))}
            </div>
            <div className="h-6 bg-neutral-800 rounded w-28 animate-pulse" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-neutral-800 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 bg-neutral-700 rounded-full animate-pulse mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-neutral-700 rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-neutral-700 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-neutral-700 rounded w-24 animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-neutral-700 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-neutral-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-800 p-4 rounded-lg">
            <div className="h-5 bg-neutral-700 rounded w-20 mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-neutral-700 rounded w-16 animate-pulse" />
                <div className="h-4 bg-neutral-700 rounded w-8 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-neutral-700 rounded w-16 animate-pulse" />
                <div className="h-4 bg-neutral-700 rounded w-8 animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-neutral-700 rounded w-16 animate-pulse" />
                <div className="h-4 bg-neutral-700 rounded w-8 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 p-4 rounded-lg">
            <div className="h-5 bg-neutral-700 rounded w-20 mb-4 animate-pulse" />
            <div className="space-y-2">
              {['Info', 'Success', 'Warning', 'Deadline'].map((type) => (
                <div key={type} className="flex justify-between p-2 bg-neutral-700 rounded">
                  <div className="h-4 bg-neutral-600 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-neutral-600 rounded w-8 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
