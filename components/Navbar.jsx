'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow flex items-center h-16 px-6">
      {/* Left: Logo + Text (this itself is the Home button) */}
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/leviathan.jpg"
            alt="Leviathan Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-bold text-xl text-charcoal-gray">Leviathan</span>
        </Link>
      </div>

      {/* Right: Menu Items */}
      <div className="flex-1 flex justify-end items-center space-x-6">
        <Link href="/upload" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Upload Dataset
        </Link>
        <Link href="/dashboard" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Dashboard
        </Link>
        <Link href="/policy" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Policy & Governance
        </Link>
        <Link href="/learning" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Learning & Education
        </Link>
        <Link href="/conservation" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Conservation & Discovery
        </Link>
        <Link href="/auth/signin" className="text-charcoal-gray hover:text-navy-blue font-medium">
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
