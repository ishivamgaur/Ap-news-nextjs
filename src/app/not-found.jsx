
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
      <h1 className="text-9xl font-extrabold text-red-700 tracking-wider">
        404
      </h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors flex items-center gap-2"
      >
        <FaSearch />
        <span>Go Back Home</span>
      </Link>
    </div>
  );
}
