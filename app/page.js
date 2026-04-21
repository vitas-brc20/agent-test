import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export const revalidate = 0; // 실시간 반영을 위해 SSR 캐시 비활성화

export default async function Page() {
  const { data: tasks, error } = await supabase
    .from("agent_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading tasks: {error.message}</div>;
  }

  // Fake sales data for Tesla and Hyundai
  const salesData = [
    { name: 'Q1 2026', tesla: 450000, hyundai: 300000 },
    { name: 'Q2 2026', tesla: 480000, hyundai: 320000 },
    { name: 'Q3 2026', tesla: 510000, hyundai: 340000 },
    { name: 'Q4 2026', tesla: 530000, hyundai: 360000 },
  ];

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Mario World Theme Header */}
        <header className="mb-10 text-center relative p-8 rounded-lg" style={{ backgroundColor: '#719CB7' /* Mario Sky Blue */ }}>
          <div className="absolute inset-0 overflow-hidden -z-10">
            {/* Placeholder elements for Mario theme */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-700 rounded-lg transform rotate-45 tile-brick"></div>
            <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-700 rounded-lg transform -rotate-45 tile-brick"></div>
            <div className="absolute bottom-2 left-1/3 w-20 h-20 bg-green-700 rounded-full mushroom-pipe-element"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-green-700 rounded-full mushroom-pipe-element transform scale-x-[-1]"></div>
            <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-red-500 rounded-full mushroom-cap"></div>
            <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-red-500 rounded-full mushroom-cap transform rotate-12"></div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white shadow-text-mario mb-3">Super Mario World 1-1</h1>
          <p className="text-xl text-white opacity-90">버섯 왕국으로 떠나는 모험!</p>
        </header>

        {/* Sales Performance Chart */}
        <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sales Performance</h2>
          <div className="flex justify-center items-center">
            <LineChart width={700} height={350} data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6B7280" /> {/* Gray text */}
              <YAxis stroke="#6B7280" /> {/* Gray text */}
              <Tooltip />
              <Legend wrapperStyle={{ padding: "10px" }} />
              <Line type="monotone" dataKey="tesla" stroke="#DC2626" strokeWidth={2} activeDot={{ r: 8 }} dot={{ r: 4 }} /> {/* Red for Tesla */}
              <Line type="monotone" dataKey="hyundai" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} /> {/* Blue for Hyundai */}
            </LineChart>
          </div>
        </section>

        {/* Original Task Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업 정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">브랜치 / PR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요청자</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks?.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${task.status === 'running' ? 'bg-blue-100 text-blue-800 animate-pulse' : ''}
                      ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${task.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {task.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.subject}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{task.body}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.branch_name ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 block">
                          {task.branch_name}
                        </span>
                        {task.pr_url && task.pr_url !== "PR 생성 실패" && (
                          <a href={task.pr_url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline flex items-center">
                             PR 링크 바로가기 🔗
                          </a>
                        )}
                      </div>
                    ) : <span className="text-gray-400 text-xs">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.sender_email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400 font-mono">
                    {new Date(task.created_at).toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
              {(!tasks || tasks.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">
                    아직 수신된 이메일 작업이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="mt-8 flex justify-center">
          <Link href="/about" className="text-gray-400 hover:text-indigo-600 text-sm flex items-center transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            프로젝트 소개 보기
          </Link>
        </footer>
      </div>
    </main>
  );
}
