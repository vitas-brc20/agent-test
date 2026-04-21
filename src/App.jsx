import React from 'react';
import GitGraph from './components/GitGraph';
import './App.css';

function App() {
  // Placeholder for fetching or defining git data
  const sampleGitData = {
    commits: [
      { id: 'a1b2c3d', message: 'Initial commit', parent: null, branches: ['main'] },
      { id: 'e4f5g6h', message: 'Add feature X', parent: 'a1b2c3d', branches: ['feature/X'] },
      { id: 'i7j8k9l', message: 'Refactor code', parent: 'e4f5g6h', branches: ['feature/X'] },
      { id: 'm0n1o2p', message: 'Fix bug Y', parent: 'i7j8k9l', branches: ['fix/Y', 'feature/X'] },
      { id: 'q3r4s5t', message: 'Merge feature X', parent: ['i7j8k9l', 'm0n1o2p'], branches: ['main'] },
    ],
    // In a real app, this would come from a Git log parser or API
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Git Branch Visualizer</h1>
        <p>Explore your project's branching strategies</p>
      </header>
      <main className="app-main">
        <GitGraph data={sampleGitData} />
      </main>
      <footer className="app-footer">
        <p>© 2026 Git Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
