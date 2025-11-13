import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield, Search, Edit3, Folder, Cloud } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs - More visible */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/40 to-cyan-400/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/40 to-blue-400/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Additional floating shapes - More prominent */}
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-full blur-2xl animate-float animation-delay-4000"></div>
        
        {/* Smaller particles - More visible */}
        <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/2 w-40 h-40 bg-purple-300/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-indigo-300/30 rounded-full blur-xl animate-pulse animation-delay-4000"></div>
        
        {/* Animated Lines/Bars - Different paths */}
        <div className="absolute top-0 left-[10%] w-1 h-32 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent animate-slide-down-1"></div>
        <div className="absolute top-0 left-[25%] w-1 h-40 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent animate-slide-down-2"></div>
        <div className="absolute top-0 left-[45%] w-1 h-36 bg-gradient-to-b from-transparent via-indigo-400/50 to-transparent animate-slide-down-3"></div>
        <div className="absolute top-0 left-[65%] w-1 h-28 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-slide-down-1 animation-delay-3000"></div>
        <div className="absolute top-0 right-[15%] w-1 h-38 bg-gradient-to-b from-transparent via-pink-400/50 to-transparent animate-slide-down-2 animation-delay-5000"></div>
        
        {/* Floating Shapes - Different directions and speeds */}
        <div className="absolute top-[20%] left-0 w-8 h-8 bg-blue-500/40 rounded-full animate-diagonal-1"></div>
        <div className="absolute top-[35%] right-0 w-6 h-6 bg-purple-500/40 rounded-full animate-diagonal-2"></div>
        <div className="absolute top-[50%] left-0 w-10 h-10 bg-indigo-500/40 rounded-full animate-slide-right-slow"></div>
        <div className="absolute top-[65%] right-0 w-7 h-7 bg-pink-500/40 rounded-full animate-diagonal-1 animation-delay-3000"></div>
        <div className="absolute top-[80%] left-0 w-9 h-9 bg-cyan-500/40 rounded-full animate-slide-right-fast"></div>
        
        {/* Zigzag patterns */}
        <div className="absolute top-[15%] left-[20%] w-6 h-6 bg-yellow-400/40 rounded-full animate-zigzag"></div>
        <div className="absolute top-[40%] right-[30%] w-8 h-8 bg-emerald-400/40 rounded-full animate-zigzag animation-delay-2000"></div>
        <div className="absolute top-[70%] left-[40%] w-5 h-5 bg-rose-400/40 rounded-full animate-zigzag animation-delay-4000"></div>
        
        {/* Rotating Rings - Different speeds */}
        <div className="absolute top-[30%] left-[30%] w-40 h-40 border-2 border-blue-300/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-[35%] right-[35%] w-32 h-32 border-2 border-purple-300/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-[55%] left-[55%] w-28 h-28 border-2 border-indigo-300/20 rounded-full animate-spin-medium animation-delay-3000"></div>
        
        {/* Moving gradient overlay - More visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center py-20">
          <div className="animate-fade-in-up max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-6">
              QuickNotes
            </h1>
            <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-semibold">
              Your simple, fast, and secure note-taking app
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Capture your thoughts, organize your ideas, and access them anywhere. 
              Built for students, professionals, and creative thinkers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={token ? "/dashboard" : "/signup"}
                className="group px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              {!token && (
                <Link
                  to="/login"
                  className="px-10 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-50 transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose QuickNotes?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience note-taking reimagined with modern features and elegant design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="text-white animate-pulse" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Lightning Fast</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Create and access your notes instantly with our optimized, high-performance platform
                </p>
              </div>

              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <Shield className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Secure & Private</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Your notes are encrypted and protected with industry-standard security measures
                </p>
              </div>

              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="text-white group-hover:animate-bounce" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Simple to Use</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Clean, intuitive interface designed for distraction-free note-taking
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-4 bg-white/40">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Note-Taking, Simplified
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                QuickNotes is a modern, cloud-based note-taking application designed for individuals who value 
                <span className="font-semibold text-blue-600"> simplicity and efficiency</span>. Whether you're a student taking lecture notes, 
                a professional organizing project ideas, or a creative thinker capturing inspiration, QuickNotes 
                adapts to your workflow.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Built with <span className="font-semibold text-indigo-600">cutting-edge technology</span> and security in mind, 
                your notes are always safe, accessible, and synchronized across all your devices. Say goodbye to 
                lost sticky notes and scattered thoughts—QuickNotes keeps everything organized in one beautiful place.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need for productive note-taking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <Edit3 className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Create & Edit</h4>
                <p className="text-gray-600 leading-relaxed">
                  Easily create, edit, and update your notes with a simple editor
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-xl mb-4 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300">
                  <Search className="text-indigo-600 group-hover:scale-125 transition-transform duration-300" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Smart Search</h4>
                <p className="text-gray-600 leading-relaxed">
                  Find any note instantly with powerful search functionality
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mb-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <Folder className="text-purple-600 group-hover:-rotate-12 transition-transform duration-300" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Stay Organized</h4>
                <p className="text-gray-600 leading-relaxed">
                  Keep your notes organized and easily accessible in one place
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-100 rounded-xl mb-4 group-hover:bg-pink-200 group-hover:scale-110 transition-all duration-300">
                  <Cloud className="text-pink-600 group-hover:animate-bounce transition-transform duration-300" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Cloud Sync</h4>
                <p className="text-gray-600 leading-relaxed">
                  Access your notes anywhere with automatic cloud synchronization
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-12 md:p-16 rounded-3xl shadow-2xl text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto">
                Join thousands of users who trust QuickNotes for their daily note-taking needs
              </p>
              <Link
                to={token ? "/dashboard" : "/signup"}
                className="inline-block px-12 py-5 text-xl font-semibold text-blue-600 bg-white rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-50 transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {token ? "Go to Dashboard" : "Create Free Account"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
