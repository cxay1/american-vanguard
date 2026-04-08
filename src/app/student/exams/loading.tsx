'use client'

export default function ExamsLoading() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
        <div className="h-8 bg-neutral-800 rounded w-32 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-800 rounded w-48 animate-pulse" />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-2 border-b border-neutral-800 pb-2">
              <div className="h-10 bg-neutral-800 rounded w-28 animate-pulse" />
              <div className="h-10 bg-neutral-800 rounded w-28 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Upcoming', 'Ongoing', 'Completed'].map((stat) => (
                <div key={stat} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-neutral-800 rounded w-20 animate-pulse" />
                    <div className="w-8 h-8 bg-neutral-800 rounded-full animate-pulse" />
                  </div>
                  <div className="h-8 bg-neutral-800 rounded w-12 animate-pulse" />
                  <div className="h-3 bg-neutral-800 rounded w-16 mt-2 animate-pulse" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-2">
                        <div className="h-6 bg-neutral-800 rounded w-24 animate-pulse" />
                        <div className="h-6 bg-neutral-800 rounded w-20 animate-pulse" />
                      </div>
                      <div className="h-6 bg-neutral-700 rounded w-3/4 animate-pulse" />
                      <div className="flex gap-4">
                        <div className="h-4 bg-neutral-800 rounded w-32 animate-pulse" />
                        <div className="h-4 bg-neutral-800 rounded w-32 animate-pulse" />
                        <div className="h-4 bg-neutral-800 rounded w-20 animate-pulse" />
                      </div>
                      <div className="h-16 bg-neutral-800/50 rounded-lg animate-pulse" />
                    </div>
                    <div className="text-right space-y-2">
                      <div className="h-4 bg-neutral-800 rounded w-16 animate-pulse" />
                      <div className="h-10 bg-yellow-600 rounded-lg w-24 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="h-5 bg-neutral-800 rounded w-24 mb-4 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-neutral-800 rounded-full animate-pulse mt-0.5" />
                    <div className="h-4 bg-neutral-800 rounded w-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
