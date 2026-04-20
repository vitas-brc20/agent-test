'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Placeholder for Supabase client initialization if needed directly here, or assume utils/supabase is set up.
// For this example, we'll simulate data fetching if Supabase is not directly accessible or for demonstration.

const fakeSalesData = [
  { month: 'Jan', tesla: 5000, hyundai: 7000 },
  { month: 'Feb', tesla: 5500, hyundai: 7200 },
  { month: 'Mar', tesla: 6000, hyundai: 7500 },
  { month: 'Apr', tesla: 6200, hyundai: 7800 },
  { month: 'May', tesla: 6500, hyundai: 8000 },
  { month: 'Jun', tesla: 6800, hyundai: 8200 },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, you would fetch from Supabase like this:
        // const { data, error: supabaseError } = await supabase.from('agent_tasks').select('*').order('created_at', { ascending: false });
        // if (supabaseError) throw supabaseError;
        // setTasks(data);

        // Using fake data for demonstration as per requirements
        setTasks([
          { id: 1, status: 'completed', subject: 'Refactor user authentication', branch_name: 'feature/auth-refactor', pr_url: 'http://github.com/pr/1', sender_email: 'user1@example.com', created_at: '2023-10-26T10:00:00Z' },
          { id: 2, status: 'running', subject: 'Implement new dashboard charts', branch_name: 'feature/charts', pr_url: 'http://github.com/pr/2', sender_email: 'user2@example.com', created_at: '2023-10-26T09:30:00Z' },
          { id: 3, status: 'pending', subject: 'Fix bug in email notification', branch_name: 'fix/email-bug', pr_url: null, sender_email: 'user1@example.com', created_at: '2023-10-26T08:00:00Z' },
          { id: 4, status: 'failed', subject: 'Deploy staging environment', branch_name: 'deploy/staging', pr_url: 'http://github.com/pr/3', sender_email: 'admin@example.com', created_at: '2023-10-25T18:00:00Z' },
        ]);
      } catch (err) {
        setError('작업 목록을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">AI 에이전트 대시보드</h1>
          <p className="text-gray-500 mt-2">이메일로 수신된 작업 의뢰와 현재 처리 상태를 모니터링합니다.</p>
        </header>

        <section className="mb-10 bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">최근 작업 현황</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={fakeSalesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tesla" stroke="#8884d8" activeDot={{ r: 8 }} name="Tesla Sales" />
                <Line type="monotone" dataKey="hyundai" stroke="#82ca9d" activeDot={{ r: 8 }} name="Hyundai Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

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
              {loading && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">
                    작업 목록을 불러오는 중...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-red-500 text-sm">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && tasks.map((task) => (
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
              {!loading && !error && tasks.length === 0 && (
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
