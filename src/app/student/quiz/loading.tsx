'use client'

export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-neutral-800 rounded w-32 mb-2 animate-pulse" />
            <div className="h-4 bg-neutral-800 rounded w-64 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-2">
          {['All Quizzes', 'Available', 'In Progress', 'Completed'].map((filter) => (
            <div key={filter} className="h-10 bg-neutral-800 rounded-lg w-24 animate-pulse" />
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-5 bg-neutral-800 rounded w-16 animate-pulse" />
                    <div className="h-6 bg-neutral-800 rounded w-20 animate-pulse" />
                  </div>
                  <div className="h-6 bg-neutral-700 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-neutral-800 rounded w-full animate-pulse" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-neutral-800 rounded w-16 animate-pulse" />
                    <div className="h-4 bg-neutral-800 rounded w-24 animate-pulse" />
                    <div className="h-4 bg-neutral-800 rounded w-20 animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:min-w-[140px]">
                  <div className="h-10 bg-neutral-700 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
