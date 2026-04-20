import { supabase } from "@/utils/supabase";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

export const revalidate = 0; // 실시간 반영을 위해 SSR 캐시 비활성화

// Placeholder data for sales comparison
const salesComparisonData = [
  { name: 'Tesla', sales: 15000, pv: 15000, amt: 15000 },
  { name: 'Hyundai', sales: 12000, pv: 12000, amt: 12000 },
];

const pieChartData = [
  { name: 'Tesla', value: 15000 },
  { name: 'Hyundai', value: 12000 },
];

const COLORS = ['#0088FE', '#00C49F']; // Example colors

export default async function Home() {
  const { data: tasks, error } = await supabase
    .from("agent_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading tasks: {error.message}</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">AI 에이전트 대시보드</h1>
          <p className="text-gray-500 mt-2">이메일로 수신된 작업 의뢰와 현재 처리 상태를 모니터링합니다.</p>
        </header>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Pie Chart */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">판매량 비율</h2>
            <div className="flex justify-center items-center h-64">
              <PieChart width={250} height={200}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">판매량 비교</h2>
            <div className="flex justify-center items-center h-64">
              <BarChart
                width={300}
                height={200}
                data={salesComparisonData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" barSize={30} />
              </BarChart>
            </div>
          </div>
        </div>

        {/* Task Table Section */}
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
