import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-r from-white to-teal-300">
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p className="mt-4 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/dashboard/home"
            className="px-6 py-3 bg-white font-bold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
