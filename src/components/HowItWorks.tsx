import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Brain, Zap, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Camera,
    title: 'Webcam Input',
    description: 'Your camera captures real-time video frames at 30fps for immediate processing.',
    details: ['Real-time video capture', 'Privacy-first processing', 'Local data handling']
  },
  {
    id: 2,
    icon: Brain,
    title: 'Flask Backend',
    description: 'Our Python Flask server processes frames using OpenCV and TensorFlow.',
    details: ['OpenCV preprocessing', 'Face detection', 'Frame normalization']
  },
  {
    id: 3,
    icon: Zap,
    title: 'Mini-XCEPTION Model',
    description: 'The pre-trained CNN model analyzes facial expressions with 95% accuracy.',
    details: ['Deep learning inference', 'FER-2013 trained model', 'Multi-class classification']
  },
  {
    id: 4,
    icon: BarChart3,
    title: 'Emotion Results',
    description: 'Get instant emotion predictions with confidence scores and visualizations.',
    details: ['7 emotion classes', 'Confidence scoring', 'Real-time charts']
  }
];

const HowItWorks = () => {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our emotion detection system uses a sophisticated pipeline combining computer vision, 
            deep learning, and real-time processing to analyze your facial expressions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-30" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-bold text-lg mb-4 mx-auto">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <step.icon className="h-12 w-12 text-cyan-400" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-center mb-3">{step.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-center mb-6">{step.description}</p>
                  
                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 z-20">
                    <ArrowRight className="h-8 w-8 text-cyan-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-center">Technical Architecture</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Frontend</h4>
                <p className="text-gray-400 text-sm">React + TypeScript with WebRTC API for camera access and real-time streaming</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Backend</h4>
                <p className="text-gray-400 text-sm">Flask server with TensorFlow and OpenCV for image processing and ML inference</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">ML Model</h4>
                <p className="text-gray-400 text-sm">Mini-XCEPTION CNN trained on FER-2013 dataset with 95% accuracy</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;