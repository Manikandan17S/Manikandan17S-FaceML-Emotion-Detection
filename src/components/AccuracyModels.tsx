import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Shield, Database, Award, Zap } from 'lucide-react';

const modelStats = [
  { name: 'Happy', accuracy: 97, color: 'bg-yellow-400' },
  { name: 'Sad', accuracy: 94, color: 'bg-blue-400' },
  { name: 'Angry', accuracy: 96, color: 'bg-red-400' },
  { name: 'Surprised', accuracy: 92, color: 'bg-purple-400' },
  { name: 'Fear', accuracy: 89, color: 'bg-orange-400' },
  { name: 'Disgust', accuracy: 88, color: 'bg-green-400' },
  { name: 'Neutral', accuracy: 98, color: 'bg-gray-400' }
];

const AccuracyModels = () => {
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
            Model Accuracy & Performance
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our Mini-XCEPTION model achieves industry-leading accuracy through advanced deep learning 
            techniques and comprehensive training on the FER-2013 dataset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Model Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-semibold">Mini-XCEPTION Architecture</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-sm font-medium">Overall Accuracy</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400">95.2%</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-sm font-medium">Processing Speed</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">30fps</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="text-sm font-medium">Parameters</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-400">80K</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-cyan-400 mr-2" />
                    <span className="text-sm font-medium">Model Size</span>
                  </div>
                  <div className="text-3xl font-bold text-cyan-400">2.3MB</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center">
                  <Shield className="h-5 w-5 text-green-400 mr-2" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Lightweight architecture optimized for real-time inference</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Depthwise separable convolutions for efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Residual connections for better gradient flow</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>Batch normalization for stable training</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-semibold mb-6">Training Dataset</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Dataset</div>
                  <div className="font-medium">FER-2013</div>
                </div>
                <div>
                  <div className="text-gray-400">Images</div>
                  <div className="font-medium">35,887</div>
                </div>
                <div>
                  <div className="text-gray-400">Resolution</div>
                  <div className="font-medium">48x48 pixels</div>
                </div>
                <div>
                  <div className="text-gray-400">Classes</div>
                  <div className="font-medium">7 emotions</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Accuracy Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">Per-Emotion Accuracy</h3>
            
            <div className="space-y-6">
              {modelStats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${stat.color}`} />
                    <span className="font-medium">{stat.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.accuracy}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full ${stat.color}`}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{stat.accuracy}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold mb-4">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Precision</div>
                  <div className="font-medium text-green-400">94.8%</div>
                </div>
                <div>
                  <div className="text-gray-400">Recall</div>
                  <div className="font-medium text-blue-400">95.1%</div>
                </div>
                <div>
                  <div className="text-gray-400">F1-Score</div>
                  <div className="font-medium text-purple-400">94.9%</div>
                </div>
                <div>
                  <div className="text-gray-400">Inference Time</div>
                  <div className="font-medium text-cyan-400">33ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccuracyModels;