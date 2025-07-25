import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Brain, 
  Zap, 
  Github, 
  Mail, 
  Play, 
  Pause, 
  Settings,
  TrendingUp,
  Shield,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import AccuracyModels from './components/AccuracyModels';
import TryAnother from './components/TryAnother';
import OpenSource from './components/OpenSource';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'demo', 'how-it-works', 'accuracy', 'try-another', 'open-source', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FaceML
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'demo', label: 'Demo' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'accuracy', label: 'Models' },
                { id: 'open-source', label: 'Open Source' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === id 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
               <a
               href="https://github.com/Manikandan17S"
               target="_blank"
               rel="noopener noreferrer"
             >
              <button className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-200">
                <Github className="h-5 w-5" />
              </button>
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16">
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="demo">
          <LiveDemo />
        </section>
        
        <section id="how-it-works">
          <HowItWorks />
        </section>
        
        <section id="accuracy">
          <AccuracyModels />
        </section>
        
        <section id="try-another">
          <TryAnother />
        </section>
        
        <section id="open-source">
          <OpenSource />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-cyan-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  FaceML
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Real-time emotion detection using cutting-edge deep learning technology.
              </p>
              <div className="flex flex-wrap gap-2">
                {['emotion detection', 'real-time face emotion', 'faceML AI', 'open source emotion recognition', 'react flask project', 'camera emotion app', 'ai face reader'].map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Frontend: React, Vite, TailwindCSS</li>
                <li>Backend: Flask, OpenCV, TensorFlow</li>
                <li>ML: Mini-XCEPTION (FER-2013)</li>
                <li>Hosting: Vercel, Render</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FaceML. Open source under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;