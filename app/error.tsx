"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <div className="flex items-center justify-center mb-4 text-red-500">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-red-600">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        An unexpected error occurred, Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
