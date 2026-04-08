'use client'

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-2rem)] m-4 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
      <div className="w-80 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800">
          <div className="h-6 bg-neutral-700 rounded w-24 animate-pulse" />
        </div>
        
        <div className="p-3 border-b border-neutral-800">
          <div className="h-10 bg-neutral-800 rounded-lg animate-pulse" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-700 rounded w-24 animate-pulse" />
                <div className="h-3 bg-neutral-800 rounded w-32 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-neutral-700 rounded w-24 animate-pulse" />
              <div className="h-3 bg-neutral-800 rounded w-16 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-3 rounded-lg ${i % 2 === 0 ? 'bg-neutral-800' : 'bg-yellow-600'} animate-pulse`}>
                <div className="h-4 bg-neutral-600 rounded w-32 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-10 bg-neutral-800 rounded-lg animate-pulse" />
            <div className="w-10 h-10 bg-yellow-600 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
