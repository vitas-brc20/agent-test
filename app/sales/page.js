import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const salesData = [
  { name: '2020', tesla: 500000, hyundai: 400000 },
  { name: '2021', tesla: 600000, hyundai: 450000 },
  { name: '2022', tesla: 700000, hyundai: 500000 },
  { name: '2023', tesla: 750000, hyundai: 520000 },
  { name: '2024', tesla: 800000, hyundai: 550000 },
];

export default function SalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Brand Logo</div>
          <ul className="flex space-x-6">
            <li><Link href="/about" className="hover:text-gray-300">회사소개</Link></li>
            <li><Link href="/history" className="hover:text-gray-300">회사연혁</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">오시는길</Link></li>
            <li><Link href="/sales" className="hover:text-gray-300">누적판매량</Link></li>
            <li><Link href="/board" className="hover:text-gray-300">게시판</Link></li>
          </ul>
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">누적 판매량 (Accumulated Sales)</h1>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tesla" stroke="#8884d8" name="Tesla" />
              <Line type="monotone" dataKey="hyundai" stroke="#82ca9d" name="Hyundai" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
