import React from 'react';
import { Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Video className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">VideoMate</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link to="/editor" className="text-gray-600 hover:text-blue-600">Editor</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600">Docs</a></li>
            <li><a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;