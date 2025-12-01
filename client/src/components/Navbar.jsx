import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">QuickNotes</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/dashboard")
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/login")
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`group relative px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all overflow-hidden ${
                    isActive("/signup")
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  }`}
                >
                  <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
                  <span className="relative">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
