import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-black/20 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © 2026 CLB CCH. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Privacy</Link>
          <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
