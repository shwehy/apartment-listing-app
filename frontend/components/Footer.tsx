// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="mb-2">📞 Contact Us: +20 114 354 2003</p>
        <p>📧 Email: alyelshwehy@apartments-app.com</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 text-left">
        <p className="mt-4">
          Admin database<Link href="/admin" className="text-blue-600 hover:underline">Go to Admin Panel</Link>
        </p>
      </div>
    </footer>
  )
}
