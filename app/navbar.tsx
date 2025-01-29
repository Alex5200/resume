// src/Navbar.tsx
import React from 'react';
import { Link, Outlet } from 'react-router';

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 text-white shadow-md fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-2 flex justify-center gap-[20%] items-center">
          <Link to="/" className="bg-transparent hover:bg-gray-700 transition w-[45%] justify-center items-center duration-200 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <Link to="/search" className="bg-transparent hover:bg-gray-700 transition w-[45%] justify-center items-center duration-200 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
}