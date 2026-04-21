import React, { useEffect, useRef } from 'react';

function GitGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * 0.8; // Adjust as needed
      canvas.height = window.innerHeight * 0.7; // Adjust as needed
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!data || !data.commits || data.commits.length === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No Git data available', canvas.width / 2, canvas.height / 2);
        return;
      }

      // --- Basic Visualization Logic (Placeholder) ---
      // This is a highly simplified representation. A real implementation
      // would require complex layout algorithms (e.g., topological sort, force-directed).

      const commitPositions = {};
      let maxDepth = 0;
      const commitSpacingX = 180; // Horizontal spacing between commits
      const commitSpacingY = 80;  // Vertical spacing for parent/child

      // Determine positions - simplistic approach by following parents
      const calculateCommitPos = (commitId, depth = 0) => {
        if (!commitId) return null;
        if (commitPositions[commitId]) return commitPositions[commitId];

        const commit = data.commits.find(c => c.id === commitId);
        if (!commit) return null;

        let parentPos = null;
        if (commit.parent) {
          const parents = Array.isArray(commit.parent) ? commit.parent : [commit.parent];
          // For simplicity, we'll try to align with the first parent's depth
          // A real graph would need to handle multiple parents and merge commits
          parentPos = calculateCommitPos(parents[0], depth + 1);
        } else {
          // Root commit
          parentPos = { x: canvas.width / 2, y: 50 }; // Centered for root
        }

        const currentX = parentPos ? parentPos.x : canvas.width / 2; // Inherit X or center
        const currentY = (parentPos ? parentPos.y : 50) + commitSpacingY;

        commitPositions[commitId] = { x: currentX, y: currentY };
        maxDepth = Math.max(maxDepth, depth + 1);
        return commitPositions[commitId];
      };

      // Calculate all positions first
      data.commits.forEach(commit => {
        if (!commit.parent) {
          calculateCommitPos(commit.id);
        }
      });
      // Ensure all commits have a position, even if detached (simplified)
      data.commits.forEach(commit => {
        if (!commitPositions[commit.id]) {
          // Find any existing commit position to base off, or use a default
          const availablePos = Object.values(commitPositions)[0] || { x: 50, y: 50 };
          commitPositions[commit.id] = { x: availablePos.x + commitSpacingX, y: availablePos.y };
          maxDepth = Math.max(maxDepth, 1);
        }
      });

      // Adjust canvas height based on depth
      canvas.height = 50 + maxDepth * commitSpacingY + 50;

      // Drawing lines (parent-child relationships)
      ctx.strokeStyle = '#4CAF50'; // Greenish line color
      ctx.lineWidth = 2;
      data.commits.forEach(commit => {
        const currentPos = commitPositions[commit.id];
        if (commit.parent && currentPos) {
          const parents = Array.isArray(commit.parent) ? commit.parent : [commit.parent];
          parents.forEach(parentId => {
            const parentPos = commitPositions[parentId];
            if (parentPos) {
              ctx.beginPath();
              ctx.moveTo(parentPos.x, parentPos.y);
              ctx.lineTo(currentPos.x, currentPos.y);
              ctx.stroke();
            }
          });
        }
      });

      // Drawing commits
      ctx.fillStyle = '#2196F3'; // Blue for commits
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      data.commits.forEach(commit => {
        const pos = commitPositions[commit.id];
        if (pos) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
          ctx.fill();

          // Draw commit message (shortened)
          const displayMessage = commit.message.length > 20 ? commit.message.substring(0, 17) + '...' : commit.message;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(displayMessage, pos.x, pos.y + 20);

          // Draw branch labels
          if (commit.branches && commit.branches.length > 0) {
            ctx.fillStyle = '#FF9800'; // Orange for branches
            ctx.font = '10px Inter';
            ctx.textAlign = 'left';
            commit.branches.forEach((branch, index) => {
              ctx.fillText(branch, pos.x + 15, pos.y - 10 + index * 15);
            });
          }
        }
      });
    };

    drawGraph();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      style={{ border: '1px solid #555', backgroundColor: '#1a1c20', display: 'block', margin: 'auto' }}
    />
  );
}

export default GitGraph;
