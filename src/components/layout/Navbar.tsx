import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">UTDRS Dashboard</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;