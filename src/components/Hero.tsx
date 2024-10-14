import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">The Video & Image Creation API</h1>
        <p className="text-xl md:text-2xl mb-8">VideoMate is the media automation platform for developers and no-code users.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">Get API Key</a>
          <a href="#" className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600">View Docs</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;