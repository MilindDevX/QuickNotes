import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowLeft, User, Loader2, Check } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      toast.success('Account created! Welcome to QuickNotes!', {
        duration: 3000,
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      });
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Google sign-up failed', {
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
    toast.error('Google sign-up was cancelled', {
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
    
    if (!name.trim()) {
      toast.error('Please enter your name', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      return;
    }
    
    setLoading(true);
    try {
      await api.post('/auth/signup', { name, email, password });
      toast.success('Account created! Please sign in.', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
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
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-violet-600/25 to-purple-600/15 rounded-full blur-[100px] animate-aurora animation-delay-1000"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/25 to-teal-600/15 rounded-full blur-[100px] animate-aurora-slow animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-gradient-to-br from-cyan-600/15 to-blue-600/10 rounded-full blur-[80px] animate-pulse-glow animation-delay-3000"></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-floating-particle"
            style={{
              left: `${15 + i * 10}%`,
              bottom: '-5%',
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${13 + Math.random() * 7}s`
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

        {/* Signup Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Create your account</h1>
            <p className="text-zinc-400">Start organizing your notes today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 hover:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 hover:border-white/20 transition-all"
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
                  <Lock size={18} className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 hover:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter password"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 hover:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-sm text-zinc-400 mb-2">Requirements:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${password.length >= 6 ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    <Check size={12} className={password.length >= 6 ? "text-emerald-400" : "text-zinc-600"} />
                  </div>
                  <span className={password.length >= 6 ? "text-zinc-300" : "text-zinc-500"}>
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${password === confirmPassword && confirmPassword ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                    <Check size={12} className={password === confirmPassword && confirmPassword ? "text-emerald-400" : "text-zinc-600"} />
                  </div>
                  <span className={password === confirmPassword && confirmPassword ? "text-zinc-300" : "text-zinc-500"}>
                    Passwords match
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] relative overflow-hidden group"
            >
              <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="text-zinc-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Google Sign Up */}
          <div className="flex justify-center">
            {googleLoading ? (
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl text-zinc-400">
                <Loader2 size={18} className="animate-spin" />
                <span>Signing up with Google...</span>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                shape="pill"
                size="large"
                text="signup_with"
                width="300"
              />
            )}
          </div>

          {/* Sign In Link */}
          <p className="text-center text-zinc-400 mt-6">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Security note */}
        <p className="mt-6 text-center text-zinc-600 text-sm flex items-center justify-center gap-2">
          <Lock size={14} />
          Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default Signup;
