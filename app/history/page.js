import Link from 'next/link';

const CompanyHistory = () => {
  const historyData = [
    { year: 1996, title: "Company Founded", description: "The company was established in 1996 with a vision to revolutionize the automotive industry." },
    { year: 2000, title: "First Prototype Unveiled", description: "Our first electric vehicle prototype was unveiled, showcasing advanced battery technology and innovative design." },
    { year: 2005, title: "Series Production Begins", description: "Began series production of our groundbreaking electric sedan, receiving critical acclaim from industry experts and early adopters." },
    { year: 2010, title: "Global Expansion", description: "Expanded operations to key international markets, establishing a strong global presence and manufacturing facilities overseas." },
    { year: 2015, title: "Autonomous Driving Tech", description: "Introduced advanced autonomous driving features and AI-powered assistance systems, setting new industry standards for safety and convenience." },
    { year: 2020, title: "Sustainability Focus", description: "Renewed commitment to sustainability with a focus on renewable energy in manufacturing processes and a goal for carbon neutrality." },
    { year: 2025, title: "Next-Gen EV Launch", description: "Launched our next-generation electric vehicle, pushing the boundaries of performance, battery range, and user experience." },
    { year: 2026, title: "Present Day", description: "Continuing to innovate and lead the future of electric mobility with cutting-edge research and development." }
  ];

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
            <Link href="/history" className="text-white hover:text-gray-300 transition duration-300 font-semibold underline">History</Link>
            <Link href="/sales-data" className="text-white hover:text-gray-300 transition duration-300">Sales Data</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Company's Journey</h1>

        <div className="relative lg:w-3/4 lg:mx-auto">
          {/* Vertical Timeline */}
          <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-gray-300 rounded-full"></div>
          {historyData.map((item, index) => (
            <div key={index} className={`mb-12 flex justify-center items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} `}>
              <div className="order-first lg:order-last w-5/12"></div> {/* Spacer */} 
              <div className="z-10 flex items-center order-first bg-blue-500 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-white text-xs"></h1>
              </div>
              <div className={`order-first lg:order-${index % 2 === 0 ? 'last' : 'first'} relative w-5/12 px-4 py-6 bg-white rounded-lg shadow-md border border-gray-200`}>
                <h3 className="mb-1 font-bold text-xl text-gray-800">{item.year}</h3>
                <h4 className="mb-3 font-semibold text-lg text-gray-700">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CompanyHistory;
