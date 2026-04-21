import React from 'react';
import Link from 'next/link';
// Assuming recharts is installed and available. You may need to run `npm install recharts`.
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fake sales data for Tesla and Hyundai
const salesData = [
  { month: "Jan", tesla: 50000, hyundai: 70000 },
  { month: "Feb", tesla: 55000, hyundai: 72000 },
  { month: "Mar", tesla: 60000, hyundai: 75000 },
  { month: "Apr", tesla: 58000, hyundai: 73000 },
  { month: "May", tesla: 62000, hyundai: 76000 },
  { month: "Jun", tesla: 65000, hyundai: 78000 },
  { month: "Jul", tesla: 68000, hyundai: 80000 },
  { month: "Aug", tesla: 70000, hyundai: 82000 },
  { month: "Sep", tesla: 72000, hyundai: 85000 },
  { month: "Oct", tesla: 75000, hyundai: 88000 },
  { month: "Nov", tesla: 78000, hyundai: 90000 },
  { month: "Dec", tesla: 80000, hyundai: 92000 },
];

const SalesDataPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Embedded Navbar Structure - Assuming a common Navbar component is available */}
      <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white font-bold text-xl hover:text-gray-300 transition duration-300">
            Company Chronicle
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-white hover:text-gray-300 transition duration-300">Home</Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition duration-300">About</Link>
            <Link href="/history" className="text-white hover:text-gray-300 transition duration-300">History</Link>
            <Link href="/sales-data" className="text-white hover:text-gray-300 transition duration-300 font-semibold underline">Sales Data</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Automotive Sales Performance</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Monthly Sales Overview (Units)</h2>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderColor: '#d1d5db', borderRadius: '0.375rem' }} />
                <Legend wrapperStyle={{ padding: "10px" }} />
                <Line type="monotone" dataKey="tesla" stroke="#007bff" strokeWidth={2} activeDot={{ r: 6 }} name="Tesla" />
                <Line type="monotone" dataKey="hyundai" stroke="#28a745" strokeWidth={2} activeDot={{ r: 6 }} name="Hyundai" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesDataPage;
