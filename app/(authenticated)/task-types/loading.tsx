export default function UsersLoading() {
  return (
    <div>
      <div className="flex flex-col gap-6 px-4 py-4 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-700 rounded"></div>
          <div className="w-full md:w-1/3 h-10 bg-gray-200 dark:bg-zinc-700 rounded"></div>
        </div>
        <div className="overflow-auto w-full border-1 p-3 rounded-lg">
          <div className="min-w-full overflow-hidden">
            <div className="flex   dark:bg-zinc-800 text-sm font-semibold">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-zinc-700 h-6 rounded mx-1"
                ></div>
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="flex items-center border-t border-gray-100 dark:border-zinc-800"
              >
                {Array.from({ length: 5 }).map((_, colIdx) => (
                  <div key={colIdx} className="flex-1 px-4 py-4">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <div className="flex space-x-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-8 w-8 bg-gray-200 dark:bg-zinc-700 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
