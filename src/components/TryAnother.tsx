import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Cpu, Zap, ExternalLink, Settings } from 'lucide-react';

const apiOptions = [
  {
    name: 'Local Model',
    description: 'Mini-XCEPTION running locally',
    icon: Cpu,
    accuracy: '95.2%',
    latency: '33ms',
    privacy: 'Complete',
    cost: 'Free',
    active: true
  },
  {
    name: 'DeepFace API',
    description: 'Cloud-based emotion analysis',
    icon: Cloud,
    accuracy: '97.1%',
    latency: '150ms',
    privacy: 'Limited',
    cost: '$0.01/req',
    active: false
  },
  {
    name: 'AWS Rekognition',
    description: 'Amazon emotion detection',
    icon: Cloud,
    accuracy: '94.8%',
    latency: '200ms',
    privacy: 'Limited',
    cost: '$0.001/req',
    active: false
  },
  {
    name: 'Azure Face API',
    description: 'Microsoft cognitive services',
    icon: Cloud,
    accuracy: '96.3%',
    latency: '180ms',
    privacy: 'Limited',
    cost: '$0.004/req',
    active: false
  }
];

const TryAnother = () => {
  const [selectedApi, setSelectedApi] = useState(0);
  
  const SelectedIcon = apiOptions[selectedApi].icon;

  return (
    <div className="py-20 bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Try Another Option
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare our local Mini-XCEPTION model with cloud-based emotion detection APIs. 
            Switch between different providers to find the best fit for your needs.
          </p>
        </motion.div>

        {/* API Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {apiOptions.map((api, index) => (
            <motion.div
              key={api.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-gray-900 rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
                selectedApi === index
                  ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedApi(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <api.icon className={`h-8 w-8 ${api.active ? 'text-green-400' : 'text-gray-400'}`} />
                {api.active && (
                  <div className="bg-green-400 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{api.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{api.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="font-medium">{api.accuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Latency</span>
                  <span className="font-medium">{api.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Privacy</span>
                  <span className={`font-medium ${api.privacy === 'Complete' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {api.privacy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost</span>
                  <span className={`font-medium ${api.cost === 'Free' ? 'text-green-400' : 'text-orange-400'}`}>
                    {api.cost}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected API Details */}
        <motion.div
          key={selectedApi}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <SelectedIcon className="h-8 w-8 text-cyan-400" />
              <h3 className="text-2xl font-semibold">{apiOptions[selectedApi].name}</h3>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
              
              {selectedApi === 0 ? (
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Active</span>
                </button>
              ) : (
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-colors flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Switch to {apiOptions[selectedApi].name}</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                {selectedApi === 0 && (
                  <>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Complete privacy - no data leaves your device</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Instant processing with minimal latency</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>No internet connection required</span>
                    </li>
                  </>
                )}
                {selectedApi === 1 && (
                  <>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Higher accuracy with ensemble models</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Multiple emotion detection frameworks</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Advanced facial landmark detection</span>
                    </li>
                  </>
                )}
                {selectedApi === 2 && (
                  <>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>AWS infrastructure reliability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Enterprise-grade security</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Scalable processing capacity</span>
                    </li>
                  </>
                )}
                {selectedApi === 3 && (
                  <>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Microsoft cognitive services integration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Advanced emotion analysis algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>Global data center coverage</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Performance Comparison</h4>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Accuracy</span>
                    <span className="font-medium">{apiOptions[selectedApi].accuracy}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                      style={{ width: apiOptions[selectedApi].accuracy }}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Speed</span>
                    <span className="font-medium">{apiOptions[selectedApi].latency}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full"
                      style={{ width: selectedApi === 0 ? '90%' : '60%' }}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Privacy</span>
                    <span className={`font-medium ${apiOptions[selectedApi].privacy === 'Complete' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {apiOptions[selectedApi].privacy}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        apiOptions[selectedApi].privacy === 'Complete' 
                          ? 'bg-green-400' 
                          : 'bg-yellow-400'
                      }`}
                      style={{ width: apiOptions[selectedApi].privacy === 'Complete' ? '100%' : '60%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TryAnother;