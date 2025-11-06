"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-4">
          <h1 className="text-5xl font-bold text-red-500">Application Error</h1>
          <p className="mt-4 text-lg text-gray-300">
            A critical error occurred and the application cannot continue.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-lg"
          >
            Try to Recover
          </button>
        </div>
      </body>
    </html>
  );
}