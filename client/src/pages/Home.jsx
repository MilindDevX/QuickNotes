import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-gray-900">
        Welcome to <span className="text-blue-600">QuickNotes</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Your simple, fast, and secure note-taking app.
      </p>
      <div className="mt-8">
        <Link
          to={token ? "/dashboard" : "/signup"}
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
