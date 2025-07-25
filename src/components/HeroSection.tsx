import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, Brain, Sparkles, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative">
              <Brain className="h-20 w-20 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-cyan-400/20 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            See What Your Face Feels
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Real-time emotion detection powered by cutting-edge deep learning. 
            Experience the future of AI-driven facial expression analysis.
          </motion.p>

          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Camera, text: "Real-time Processing" },
              { icon: Zap, text: "High Accuracy" },
              { icon: Brain, text: "Deep Learning" },
              { icon: Sparkles, text: "Mini-XCEPTION" }
            ].map(({ icon: Icon, text }, index) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700"
              >
                <Icon className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera className="h-5 w-5" />
              <span>Try Live Demo</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-600"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Brain className="h-5 w-5" />
              <span>How It Works</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "95%", label: "Accuracy" },
              { number: "7", label: "Emotions" },
              { number: "30fps", label: "Real-time" },
              { number: "100%", label: "Open Source" }
            ].map(({ number, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;