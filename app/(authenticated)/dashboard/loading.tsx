export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 dark:bg-zinc-800 rounded"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full p-4 rounded-xl shadow-sm bg-white dark:bg-zinc-900 border border-default-200"
          >
            <div className="flex items-center justify-between pb-1">
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-6 w-12 bg-gray-200 dark:bg-zinc-700 rounded-full"></div>
            </div>

            <div className="px-3 py-4">
              <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            </div>

            <div className="flex justify-between items-center border-t pt-3 mt-2 text-sm">
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 py-4">
        <div className="h-5 w-40 bg-gray-200 dark:bg-zinc-800 rounded"></div>
        {/* Simulate a list of bookings */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
