'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navbar.css';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section: Logo + Separator + Burger */}
        <div className="navbar-left">
          <Link href="/" className="navbar-logo">
            No.Press
          </Link>

          <div className="navbar-separator"></div>

          <button className="navbar-burger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="navbar-links">
          <Link
            href="/"
            className={`navbar-link ${pathname === '/' ? 'navbar-link-active' : ''}`}
          >
            HOME
          </Link>
          <Link
            href="/newsfeed"
            className={`navbar-link ${pathname === '/newsfeed' ? 'navbar-link-active' : ''}`}
          >
            NEWSFEED
          </Link>
          <Link
            href="/about"
            className={`navbar-link ${pathname === '/about' ? 'navbar-link-active' : ''}`}
          >
            ABOUT
          </Link>
        </div>

        {/* Right Section: Register Button */}
        <Link href="/register" className="navbar-register">
          REGISTER
        </Link>
      </div>
    </nav>
  );
}
