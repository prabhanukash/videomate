import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">VideoMate</h3>
            <p className="text-sm">The ultimate media automation platform for developers and no-code users.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400">Features</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">Pricing</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">Tutorials</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-blue-400">About</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2024 VideoMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;