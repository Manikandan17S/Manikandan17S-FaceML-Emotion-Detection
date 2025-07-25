import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Download, Star, GitFork, Eye, Code, FileText, Users } from 'lucide-react';

const OpenSource = () => {
  const repoStats = [
    { icon: Star, label: 'Stars', value: '2.4k' },
    { icon: GitFork, label: 'Forks', value: '485' },
    { icon: Eye, label: 'Watchers', value: '127' },
    { icon: Users, label: 'Contributors', value: '23' }
  ];

  const features = [
    {
      icon: Code,
      title: 'Complete Source Code',
      description: 'Full access to frontend React code, Flask backend, and ML model implementation'
    },
    {
      icon: FileText,
      title: 'Comprehensive Documentation',
      description: 'Detailed setup instructions, API documentation, and architecture explanations'
    },
    {
      icon: Download,
      title: 'Easy Deployment',
      description: 'Docker containers, cloud deployment scripts, and local development setup'
    }
  ];

  const repoUrl = "https://github.com/Manikandan17S/Manikandan17S-FaceML-Emotion-Detection";
  const zipUrl = `${repoUrl}/archive/refs/heads/main.zip`;

  return (
    <div className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Open Source
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FaceML is completely open source and available under the MIT license. 
            Contribute to the project, customize it for your needs, or learn from our implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Repository Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center mb-6">
                <Github className="h-8 w-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-semibold">GitHub Repository</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {repoStats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-gray-900 rounded-lg p-4 text-center">
                    <Icon className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {/* ✅ View on GitHub button with link */}
                <a
                  href={"https://github.com/Manikandan17S/Manikandan17S-FaceML-Emotion-Detection"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <Github className="h-5 w-5" />
                    <span>View on GitHub</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </a>

                {/* ✅ Download ZIP button with GitHub ZIP link */}
                <a
                  href={zipUrl}
                  download
                >
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download ZIP</span>
                  </button>
                </a>
              </div>
            </div>

            {/* MIT License */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-semibold mb-4">MIT License</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    MIT Licensed
                  </div>
                </div>
                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  Free to use, modify, and distribute. Perfect for both personal projects and commercial applications.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6">What's Included</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-2 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`# Clone the repository
git clone https://github.com/username/faceml.git

# Install dependencies
cd faceml
npm install
pip install -r requirements.txt

# Start the development server
npm run dev
python app.py`}</code>
                </pre>
              </div>
            </div>

            {/* Contribution */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-semibold mb-4">Contributing</h3>
              <p className="text-gray-400 mb-4">
                We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                  Good First Issue
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  Help Wanted
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  Documentation
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;
