import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;