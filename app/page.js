// app/page.js
import { Inter } from 'next/font/google';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Placeholder data for Tesla and Hyundai sales
const salesData = [
  { month: 'Jan', tesla: 4000, hyundai: 3500 },
  { month: 'Feb', tesla: 4200, hyundai: 3700 },
  { month: 'Mar', tesla: 4500, hyundai: 3900 },
  { month: 'Apr', tesla: 4300, hyundai: 3800 },
  { month: 'May', tesla: 4700, hyundai: 4100 },
  { month: 'Jun', tesla: 5000, hyundai: 4300 },
];

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-b from-blue-400 to-green-400 via-yellow-300">
      {/* Mario Theme Header */}
      <header className="text-center mb-12 text-white">
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: "4px 4px #8B0000, 2px 2px #FF0000" }}>
          Welcome to Super Mario World 1-1!
        </h1>
        <p className="text-2xl mb-6 text-yellow-300" style={{ textShadow: "1px 1px #000" }}>
          Your Adventure Starts Here!
        </p>
        {/* Placeholder for Mario elements like clouds, blocks, etc. */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="w-20 h-12 bg-white rounded-full shadow-[0_0_0_5px_white,_0_5px_0_-2px_#ccc] -mb-3"></div>
          <div className="w-16 h-16 bg-yellow-400 border-4 border-solid border-orange-700 flex items-center justify-center text-2xl font-bold text-red-800 shadow-[-6px_0_0_#8B4513,inset_0_-6px_#8B4513]" style={{ borderRadius: '8px' }}>?</div>
          <div className="w-16 h-16 bg-yellow-400 border-4 border-solid border-orange-700 flex items-center justify-center text-2xl font-bold text-red-800 shadow-[-6px_0_0_#8B4513,inset_0_-6px_#8B4513]" style={{ borderRadius: '8px' }}></div>
          <div className="w-18 h-24 bg-green-700 border-b-8 border-solid border-green-900 relative rounded-t-lg">
            <div className="absolute -top-8 -left-2 w-20 h-8 bg-green-700 rounded-lg border-b-8 border-solid border-green-900"></div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Dashboard Section */}
        <section className="bg-orange-500 p-6 rounded-xl shadow-xl border-4 border-solid border-yellow-700 text-white">
          <h2 className="text-4xl font-bold mb-5 tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: "2px 2px #8B0000" }}>
            Vehicle Sales Data
          </h2>
          <div className="w-full h-[400px] bg-transparent rounded-lg p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
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
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.4)" />
                <XAxis dataKey="month" stroke="#FFFFFF" tick={{ fontFamily: "'Press Start 2P', cursive", fontSize: 12 }} />
                <YAxis stroke="#FFFFFF" tick={{ fontFamily: "'Press Start 2P', cursive", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f0e68c', border: '3px solid #8B4513', borderRadius: '8px', fontFamily: "'Press Start 2P', cursive" }}
                  labelStyle={{ color: '#333', fontWeight: 'bold' }}
                  itemStyle={{ color: '#333' }}
                />
                <Legend wrapperStyle={{ color: '#fff', fontFamily: "'Press Start 2P', cursive" }} />
                <Line
                  type="monotone"
                  dataKey="tesla"
                  name="Tesla"
                  stroke="#FF0000" // Red
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#FF0000' }}
                  dot={{ r: 5, fill: '#FF0000' }}
                />
                <Line
                  type="monotone"
                  dataKey="hyundai"
                  name="Hyundai"
                  stroke="#00FFFF" // Cyan
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#00FFFF' }}
                  dot={{ r: 5, fill: '#00FFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Placeholder for other dashboard elements or game elements */}
        <section className="bg-green-600 p-6 rounded-xl shadow-xl border-4 border-solid border-green-900 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-2xl mb-5 font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              Explore the Mushroom Kingdom!
            </p>
            <button className="px-8 py-4 text-xl font-bold rounded-lg shadow-md bg-yellow-400 text-red-800 border-4 border-solid border-orange-700 hover:bg-yellow-300 transition-colors duration-300" style={{ fontFamily: "'Press Start 2P', cursive", textShadow: "2px 2px #8B0000" }}>
              Start Game
            </button>
          </div>
        </section>
      </main>

      {/* Add a link to import 'Press Start 2P' font if possible, or acknowledge it's a placeholder */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>
    </div>
  );
}
