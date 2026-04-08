'use client'

export default function LibraryLoading() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
        <div className="h-8 bg-neutral-800 rounded w-40 mb-2 animate-pulse" />
        <div className="h-4 bg-neutral-800 rounded w-56 animate-pulse" />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px] h-10 bg-neutral-800 rounded-lg animate-pulse" />
                <div className="h-10 bg-neutral-800 rounded-lg w-40 animate-pulse" />
                <div className="h-10 bg-neutral-800 rounded-lg w-40 animate-pulse" />
                <div className="h-10 bg-neutral-800 rounded-lg w-40 animate-pulse" />
                <div className="h-10 bg-yellow-600 rounded-lg w-20 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-neutral-800 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse" />
                      <div className="h-3 bg-neutral-800 rounded w-full animate-pulse" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-5 bg-neutral-800 rounded w-16 animate-pulse" />
                        <div className="h-5 bg-neutral-800 rounded w-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="h-5 bg-neutral-800 rounded w-32 mb-4 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-8 bg-neutral-800 rounded animate-pulse" />
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="h-5 bg-neutral-800 rounded w-24 mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 bg-neutral-800 rounded w-24 animate-pulse" />
                  <div className="h-4 bg-neutral-800 rounded w-12 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-neutral-800 rounded w-24 animate-pulse" />
                  <div className="h-4 bg-neutral-800 rounded w-12 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-neutral-800 rounded w-24 animate-pulse" />
                  <div className="h-4 bg-neutral-800 rounded w-12 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
