import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';
import { Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Welcome back!', {
        duration: 3000,
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      });
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Google sign-in failed', {
        duration: 4000,
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign-in was cancelled', {
      duration: 4000,
      style: {
        background: '#18181b',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Welcome back!', {
        duration: 3000,
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      });
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed', {
        duration: 4000,
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-violet-600/25 to-purple-600/15 rounded-full blur-[100px] animate-aurora"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-600/25 to-blue-600/15 rounded-full blur-[100px] animate-aurora-slow animation-delay-3000"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-indigo-600/15 to-violet-600/10 rounded-full blur-[80px] animate-pulse-glow"></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/40 rounded-full animate-floating-particle"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-5%',
              animationDelay: `${i * 2}s`,
              animationDuration: `${14 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-md relative animate-fade-in-up">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to home</span>
        </Link>

        {/* Login Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Welcome back</h1>
            <p className="text-zinc-400">Sign in to continue to your notes</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 hover:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 hover:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] relative overflow-hidden group"
            >
              <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="text-zinc-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Google Sign In */}
          <div className="flex justify-center">
            {googleLoading ? (
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl text-zinc-400">
                <Loader2 size={18} className="animate-spin" />
                <span>Signing in with Google...</span>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                shape="pill"
                size="large"
                text="signin_with"
                width="300"
              />
            )}
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-zinc-400 mt-6">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-violet-400 font-medium hover:text-violet-300 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Security note */}
        <p className="mt-6 text-center text-zinc-600 text-sm flex items-center justify-center gap-2">
          <Lock size={14} />
          Secured with encryption
        </p>
      </div>
    </div>
  );
};

export default Login;
