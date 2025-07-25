import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

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
            Contact & Feedback
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions, found a bug, or want to contribute? We'd love to hear from you. 
            Get in touch and help us make FaceML even better.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
          >
            <div className="flex items-center mb-6">
              <MessageSquare className="h-8 w-8 text-cyan-400 mr-3" />
              <h3 className="text-2xl font-semibold">Send us a message</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="question">General Question</option>
                  <option value="contribution">Contribution</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your issue, idea, or question..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="flex items-center mb-6">
                <Mail className="h-8 w-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-semibold">Get in Touch</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-2 flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Email</h4>
                    <p className="text-gray-400">manikandankid17@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Community</h4>
                    <p className="text-gray-400">Join our Discord server</p>
                    <p className="text-gray-400">Follow us on Twitter</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full p-2 flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Issues</h4>
                    <p className="text-gray-400">Report bugs on GitHub</p>
                    <p className="text-gray-400">Request features via Issues</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">How accurate is the emotion detection?</h4>
                  <p className="text-gray-400 text-sm">Our Mini-XCEPTION model achieves 95.2% accuracy on the FER-2013 dataset.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">Is my data private?</h4>
                  <p className="text-gray-400 text-sm">Yes, all processing happens locally. Your camera data never leaves your device.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">Can I use this commercially?</h4>
                  <p className="text-gray-400 text-sm">Absolutely! FaceML is MIT licensed and free for commercial use.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">How do I contribute?</h4>
                  <p className="text-gray-400 text-sm">Check out our GitHub repository and look for "good first issue" labels.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;