import React from 'react';
import { Video, FileSpreadsheet, Code } from 'lucide-react';

const features = [
  {
    icon: <Video className="h-12 w-12 text-blue-600" />,
    title: 'Video Generation API',
    description: 'Create stunning videos programmatically with our powerful API.',
  },
  {
    icon: <FileSpreadsheet className="h-12 w-12 text-blue-600" />,
    title: 'Spreadsheet to Video',
    description: 'Convert your spreadsheet data into engaging video content effortlessly.',
  },
  {
    icon: <Code className="h-12 w-12 text-blue-600" />,
    title: 'Developer Friendly',
    description: 'Easy integration with your existing projects and workflows.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
