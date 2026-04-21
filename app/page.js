import Link from 'next/link';

export default function Page() {
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
        <h1 className="text-4xl font-bold mb-6">메인 대시보드 (Main Dashboard)</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to the company dashboard. Navigate using the menu above.</p>
        {/* Placeholder for more dashboard content */}
      </main>
    </div>
  );
}
