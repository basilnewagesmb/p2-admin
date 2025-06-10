
export default function UserProfileLoading() {
  return (
    <div className="flex flex-col w-full h-full px-4 py-6 animate-pulse">
      <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Profile Section */}
          <div className="w-80 flex-shrink-0">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-zinc-700 mb-4"></div>

            {/* Username & Handle */}
            <div className="h-5 w-32 bg-gray-200 dark:bg-zinc-700 mb-2 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-700 mb-6 rounded"></div>

            {/* About Section */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-600 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-300 dark:border-zinc-800" />

            {/* Address Section */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-600 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-300 dark:border-zinc-800" />

            {/* Employee Details Section */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-zinc-600 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Booking Table Section */}
          <div className="flex-1">
            <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-700 rounded mb-4"></div>
            <div className="w-full border border-default-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-gray-100 dark:bg-zinc-800">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="flex-1 h-6 bg-gray-200 dark:bg-zinc-700 mx-1 rounded"></div>
                ))}
              </div>

              {/* Table Rows */}
              {Array.from({ length: 4 }).map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex border-t border-gray-100 dark:border-zinc-800"
                >
                  {Array.from({ length: 5 }).map((_, colIdx) => (
                    <div key={colIdx} className="flex-1 px-3 py-4">
                      <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
