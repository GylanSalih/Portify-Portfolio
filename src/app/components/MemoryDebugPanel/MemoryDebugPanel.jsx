'use client';

import { useState, useEffect } from 'react';
import { useMemoryMonitor } from '../../lib/memoryMonitor';

const MemoryDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState(null);
  const { start, stop, export: exportData } = useMemoryMonitor();

  // Update report every 5 seconds when visible - MEMORY LEAK FIX
  useEffect(() => {
    if (!isVisible) return;

    // MEMORY LEAK FIX: Use dynamic import instead of require to avoid memory leaks
    const interval = setInterval(async () => {
      try {
        const { getMemoryReport } = await import('../../lib/memoryMonitor');
        const memoryReport = getMemoryReport();
        setReport(memoryReport);
      } catch (error) {
        console.warn('Error getting memory report:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        title="Memory Monitor"
      >
        🧠
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          width: '300px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
            🧠 Memory Monitor
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <button onClick={start} style={buttonStyle}>Start</button>
            <button onClick={stop} style={buttonStyle}>Stop</button>
            <button onClick={exportData} style={buttonStyle}>Export</button>
          </div>

          {report && (
            <div>
              <div><strong>Duration:</strong> {report.duration}</div>
              <div><strong>Memory:</strong> {report.currentMemory}</div>
              <div><strong>Usage:</strong> {report.memoryUsage}</div>
              <div><strong>Trend:</strong> {report.trend > 0 ? '+' : ''}{report.trend.toFixed(2)}MB</div>
              <div><strong>Event Listeners:</strong> {report.eventListeners}</div>
              
              {report.trend > 1 && (
                <div style={{ 
                  color: '#ef4444', 
                  fontWeight: 'bold', 
                  marginTop: '10px',
                  padding: '5px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '5px'
                }}>
                  ⚠️ Memory Leak Detected!
                </div>
              )}
              
              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer' }}>Components</summary>
                <div style={{ fontSize: '10px', marginTop: '5px' }}>
                  {Object.entries(report.components || {}).map(([name, count]) => (
                    <div key={name}>{name}: {count}</div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const buttonStyle = {
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  margin: '0 5px 5px 0',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '10px'
};

export default MemoryDebugPanel;
