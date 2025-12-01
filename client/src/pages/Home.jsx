import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Lock, Zap, PenLine, Search, FolderOpen, Globe } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 to-purple-600/20 rounded-full blur-[120px] animate-aurora"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-cyan-600/30 to-blue-600/20 rounded-full blur-[120px] animate-aurora-slow animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-600/20 to-teal-600/15 rounded-full blur-[100px] animate-aurora animation-delay-4000"></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-5%',
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          />
        ))}
        
        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[300px] h-[300px]">
            <div className="absolute w-2 h-2 bg-violet-400/60 rounded-full animate-orbit"></div>
            <div className="absolute w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-orbit-reverse animation-delay-2000"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-border-glow">
              <Sparkles size={16} className="text-violet-400" />
              <span className="text-sm text-zinc-400">Simple. Fast. Secure.</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-shift">
                QuickNotes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-4 max-w-2xl mx-auto leading-relaxed">
              The minimalist note-taking app for focused minds
            </p>
            
            <p className="text-base text-zinc-500 mb-12 max-w-xl mx-auto">
              Capture ideas, organize thoughts, and access your notes from anywhere. 
              No distractions, just pure productivity.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={token ? "/dashboard" : "/signup"}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105"
              >
                <span className="absolute inset-0 animate-shimmer-button"></span>
                <span className="relative">Get Started</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {!token && (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white border border-white/20 rounded-full font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 border-t border-white/5 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Built for efficiency
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Everything you need to capture and organize your thoughts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-violet-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Create and access notes instantly. Optimized for speed so you never lose a thought.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Your data is encrypted and protected. Only you have access to your notes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Access Anywhere</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Cloud-synced across all your devices. Your notes are always with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Everything you need,<br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">nothing you don't</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  QuickNotes strips away the complexity. No folders to organize, no tags to manage. 
                  Just open, write, and search. It's note-taking distilled to its essence.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center">
                      <PenLine size={20} className="text-violet-400" />
                    </div>
                    <span className="text-zinc-300">Create and edit notes effortlessly</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
                      <Search size={20} className="text-cyan-400" />
                    </div>
                    <span className="text-zinc-300">Powerful search across all content</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                      <FolderOpen size={20} className="text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">Automatic organization by date</span>
                  </div>
                </div>
              </div>

              {/* Visual element */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.08] border border-white/10 p-8 flex flex-col backdrop-blur-sm hover:border-violet-500/30 transition-all duration-500">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="h-6 w-3/4 bg-gradient-to-r from-white/20 to-white/5 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/8 rounded"></div>
                    <div className="h-4 w-4/5 bg-white/6 rounded"></div>
                    <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-violet-600/40 rounded-full blur-[80px] animate-pulse-glow"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-600/30 rounded-full blur-[60px] animate-pulse-glow animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-cyan-600/20 blur-[100px] animate-pulse-glow"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
              Start capturing your ideas today
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Join thousands of users who trust QuickNotes for their daily thoughts
            </p>
            <Link
              to={token ? "/dashboard" : "/signup"}
              className="group relative inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105"
            >
              <span className="absolute inset-0 animate-shimmer-button"></span>
              <span className="relative">{token ? "Go to Dashboard" : "Create Free Account"}</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © 2025 QuickNotes. All rights reserved.
            </p>
            <p className="text-zinc-600 text-sm">
              Built with ❤️ for productivity
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
