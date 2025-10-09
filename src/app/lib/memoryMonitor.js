// Memory Leak Detection & Performance Monitoring Tool
'use client';

class MemoryMonitor {
  constructor() {
    this.startTime = Date.now();
    this.measurements = [];
    this.isMonitoring = false;
    this.intervalId = null;
    this.observers = [];
    this.eventListeners = new Map();
    this.componentCounts = new Map();
  }

  // Start monitoring memory usage
  startMonitoring(interval = 5000) {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    console.log('🔍 Memory Monitor started');
    
    this.intervalId = setInterval(() => {
      this.collectMemoryData();
    }, interval);

    // Monitor component mounts/unmounts
    this.setupComponentTracking();
    
    // Track event listeners
    this.trackEventListeners();
  }

  // Stop monitoring
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.cleanup();
    console.log('🛑 Memory Monitor stopped');
  }

  // Collect memory data
  collectMemoryData() {
    if (!window.performance || !window.performance.memory) {
      console.warn('Memory API not available');
      return;
    }

    const memory = window.performance.memory;
    const measurement = {
      timestamp: Date.now(),
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usedMB: Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100,
      totalMB: Math.round(memory.totalJSHeapSize / 1024 / 1024 * 100) / 100,
      usage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100),
      components: Object.fromEntries(this.componentCounts),
      eventListeners: this.eventListeners.size
    };

    this.measurements.push(measurement);
    
    // Keep only last 100 measurements
    if (this.measurements.length > 100) {
      this.measurements.shift();
    }

    // Check for potential memory leaks
    this.checkForLeaks(measurement);
  }

  // Check for memory leaks
  checkForLeaks(current) {
    if (this.measurements.length < 10) return;

    const recent = this.measurements.slice(-10);
    const trend = this.calculateTrend(recent.map(m => m.usedMB));
    
    // Alert if memory usage is consistently increasing
    if (trend > 2) { // More than 2MB increase over 10 measurements
      console.warn('🚨 Potential Memory Leak Detected!', {
        trend: `+${trend.toFixed(2)}MB`,
        current: `${current.usedMB}MB`,
        components: current.components,
        eventListeners: current.eventListeners
      });
      
      this.reportLeak(current, trend);
    }
  }

  // Calculate trend (linear regression slope)
  calculateTrend(values) {
    const n = values.length;
    const sumX = n * (n - 1) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumXX = n * (n - 1) * (2 * n - 1) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  // Track component mounts/unmounts
  setupComponentTracking() {
    // Override React's createElement to track components
    if (typeof window !== 'undefined' && window.React) {
      const originalCreateElement = window.React.createElement;
      
      window.React.createElement = (type, props, ...children) => {
        if (typeof type === 'function' && type.name) {
          this.incrementComponent(type.name);
        }
        return originalCreateElement(type, props, ...children);
      };
    }
  }

  // Track event listeners - MEMORY LEAK FIX: Store original functions for restore
  trackEventListeners() {
    // Store original functions for cleanup
    if (!this.originalAddEventListener) {
      this.originalAddEventListener = EventTarget.prototype.addEventListener;
      this.originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    }
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      const key = `${this.constructor.name}-${type}`;
      memoryMonitor.eventListeners.set(key, (memoryMonitor.eventListeners.get(key) || 0) + 1);
      return memoryMonitor.originalAddEventListener.call(this, type, listener, options);
    };
    
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
      const key = `${this.constructor.name}-${type}`;
      const count = memoryMonitor.eventListeners.get(key) || 0;
      if (count > 0) {
        memoryMonitor.eventListeners.set(key, count - 1);
      }
      return memoryMonitor.originalRemoveEventListener.call(this, type, listener, options);
    };
  }

  // Increment component count
  incrementComponent(name) {
    this.componentCounts.set(name, (this.componentCounts.get(name) || 0) + 1);
  }

  // Get current memory report
  getMemoryReport() {
    const latest = this.measurements[this.measurements.length - 1];
    if (!latest) return null;

    const duration = (Date.now() - this.startTime) / 1000 / 60; // minutes
    
    return {
      duration: `${duration.toFixed(1)} minutes`,
      currentMemory: `${latest.usedMB}MB`,
      memoryUsage: `${latest.usage}%`,
      measurements: this.measurements.length,
      components: latest.components,
      eventListeners: latest.eventListeners,
      trend: this.measurements.length >= 10 ? 
        this.calculateTrend(this.measurements.slice(-10).map(m => m.usedMB)) : 0
    };
  }

  // Report memory leak
  reportLeak(measurement, trend) {
    // You can send this to your analytics service
    console.table({
      'Memory Used': `${measurement.usedMB}MB`,
      'Trend': `+${trend.toFixed(2)}MB`,
      'Components': Object.keys(measurement.components).length,
      'Event Listeners': measurement.eventListeners,
      'Time': new Date(measurement.timestamp).toLocaleTimeString()
    });
  }

  // Cleanup - MEMORY LEAK FIX: Restore original prototypes
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    // CRITICAL: Restore original prototype functions
    if (this.originalAddEventListener) {
      EventTarget.prototype.addEventListener = this.originalAddEventListener;
      this.originalAddEventListener = null;
    }
    
    if (this.originalRemoveEventListener) {
      EventTarget.prototype.removeEventListener = this.originalRemoveEventListener;
      this.originalRemoveEventListener = null;
    }
    
    // Clear tracking data
    this.eventListeners.clear();
    this.componentCounts.clear();
  }

  // Export data for analysis
  exportData() {
    const data = {
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      measurements: this.measurements,
      report: this.getMemoryReport()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memory-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Global instance
let memoryMonitor = null;

// Initialize memory monitor
export const initMemoryMonitor = () => {
  if (typeof window === 'undefined') return null;
  
  if (!memoryMonitor) {
    memoryMonitor = new MemoryMonitor();
  }
  
  return memoryMonitor;
};

// Easy access functions
export const startMemoryMonitoring = (interval = 5000) => {
  const monitor = initMemoryMonitor();
  if (monitor) monitor.startMonitoring(interval);
};

export const stopMemoryMonitoring = () => {
  if (memoryMonitor) memoryMonitor.stopMonitoring();
};

export const getMemoryReport = () => {
  return memoryMonitor ? memoryMonitor.getMemoryReport() : null;
};

export const exportMemoryData = () => {
  if (memoryMonitor) memoryMonitor.exportData();
};

// React Hook for memory monitoring
export const useMemoryMonitor = (autoStart = false, interval = 5000) => {
  if (typeof window === 'undefined') return { report: null, start: () => {}, stop: () => {} };
  
  const monitor = initMemoryMonitor();
  
  if (autoStart && monitor && !monitor.isMonitoring) {
    monitor.startMonitoring(interval);
  }
  
  return {
    report: monitor ? monitor.getMemoryReport() : null,
    start: () => monitor?.startMonitoring(interval),
    stop: () => monitor?.stopMonitoring(),
    export: () => monitor?.exportData()
  };
};

export default memoryMonitor;
