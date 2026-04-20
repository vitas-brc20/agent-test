import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fwd</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-500 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-500 hover:text-blue-600">Contact</a>
        </nav>
      </header>

      <main className="p-4">
        {/* Main Content */}
      </main>
    </div>
  );
}