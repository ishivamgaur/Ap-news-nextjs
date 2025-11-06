"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // You can log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        An unexpected error has occurred. You can try to reload the page or go
        back home.
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link href="/" className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">Go Back Home</Link>
      </div>
    </div>
  );
}
