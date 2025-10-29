'use client';

import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Hier könntest du den Fehler an einen Service loggen
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-black/50 rounded-3xl blur-3xl" />
            
            {/* Main Card */}
            <div className="relative bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-12 max-w-lg mx-4 shadow-2xl">
              {/* Icon Container */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg" />
                  <div className="relative bg-zinc-900 border border-zinc-800 rounded-full p-4">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <h1 className="text-2xl font-semibold text-white tracking-tight">
                    Something went wrong
                  </h1>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
                    An unexpected error occurred. Don't worry, this has been logged and we're looking into it.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try again
                  </button>
                  
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-zinc-800/50 text-white text-sm font-medium rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go home
                  </Link>
                </div>
              </div>

              {/* Subtle border accent */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
