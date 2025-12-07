import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw } from 'lucide-react';
import EmotionChart from './EmotionChart';
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const emotions = [
  { name: 'angry', emoji: '😠', color: 'text-red-400', label: 'Angry' },
  { name: 'disgust', emoji: '🤢', color: 'text-green-400', label: 'Disgust' },
  { name: 'fear', emoji: '😨', color: 'text-orange-400', label: 'Fear' },
  { name: 'happy', emoji: '😊', color: 'text-yellow-400', label: 'Happy' },
  { name: 'sad', emoji: '😢', color: 'text-blue-400', label: 'Sad' },
  { name: 'surprise', emoji: '😲', color: 'text-purple-400', label: 'Surprise' },
  { name: 'neutral', emoji: '😐', color: 'text-gray-400', label: 'Neutral' }
];

type LiveDemo = {
  apiBase: string;
};

const LiveDemo = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState(emotions[6]); // neutral
  const [confidence, setConfidence] = useState(0);
  const [emotionDistribution, setEmotionDistribution] = useState<{ [key: string]: number }>({});
  const [emotionHistory, setEmotionHistory] = useState<
    Array<{ time: string; emotion: string; confidence: number }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);

  // -------------------------
  // Backend health check
  // -------------------------
  useEffect(() => {
    checkBackendConnection();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        setBackendConnected(true);
        setDebugInfo('Backend connected ✅');
      } else {
        setBackendConnected(false);
        setDebugInfo('Backend not responding ❌');
      }
    } catch (e) {
      console.error('Backend health error:', e);
      setBackendConnected(false);
      setDebugInfo('Cannot reach backend ❌');
    }
  };

  // -------------------------
  // Camera control
  // -------------------------
  const startCamera = async () => {
    try {
      setError(null);
      setDebugInfo('Requesting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current
          .play()
          .catch(() => setDebugInfo('Click to allow camera autoplay'));

        videoRef.current.onloadedmetadata = () => {
          setVideoReady(true);
          setIsActive(true);
          startEmotionDetection();
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or error');
      setDebugInfo('Camera error ❌');
    }
  };

  const stopCamera = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setVideoReady(false);
    setDebugInfo('Camera stopped');
  };

  const startEmotionDetection = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(captureAndAnalyze, 2000); // every 2s
  };

  // -------------------------
  // Capture frame & call backend
  // -------------------------
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isProcessing || !backendConnected) return;
    if (!videoRef.current.videoWidth || !videoRef.current.videoHeight) return;

    setIsProcessing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameData = canvas.toDataURL('image/jpeg', 0.8);

      const res = await fetch(`${API_BASE}/predict_emotion_stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frame: frameData })
      });

      if (!res.ok) {
        console.error('Backend error:', res.statusText);
        setDebugInfo('Backend returned error ❌');
        return;
      }

      const result = await res.json();
      console.log('Backend result:', result);

      if (result.success && result.faces_detected > 0 && result.emotion) {
        const emotionName = String(result.emotion).toLowerCase();

        const detectedEmotion =
          emotions.find(e => e.name === emotionName) || emotions[6];

        // confidence from backend is 0–1, convert to %
        const confPercent =
          typeof result.confidence === 'number'
            ? Math.round(result.confidence * 100)
            : 0;

        setCurrentEmotion(detectedEmotion);
        setConfidence(confPercent);
        setEmotionDistribution(result.emotion_distribution || {});

        const now = new Date().toLocaleTimeString();
        setEmotionHistory(prev => [
          ...prev.slice(-9),
          { time: now, emotion: detectedEmotion.label, confidence: confPercent }
        ]);

        setDebugInfo(
          `Detected: ${detectedEmotion.label} (${confPercent}%) – faces: ${result.faces_detected}`
        );
      } else if (result.success && result.faces_detected === 0) {
        setDebugInfo('No face detected');
      } else {
        setDebugInfo('No emotion detected');
      }
    } catch (err) {
      console.error('Error analyzing frame:', err);
      setDebugInfo('Error analyzing frame ❌');
    } finally {
      setIsProcessing(false);
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="py-20 bg-gray-900 relative">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Live Emotion Detection
          </h2>
          <p className="text-xl text-gray-300">
            Experience real-time emotion recognition powered by our PyTorch CNN model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Camera Feed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-cyan-400" /> Camera Feed
                  {isProcessing && (
                    <span className="ml-2 text-xs text-cyan-400">(Analyzing...)</span>
                  )}
                </h3>
                <button
                  onClick={isActive ? stopCamera : startCamera}
                  disabled={!backendConnected}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isActive
                      ? 'bg-red-500 hover:bg-red-600'
                      : backendConnected
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isActive ? 'Stop' : 'Start'}
                </button>
              </div>

              {/* Backend Status + Refresh */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      backendConnected ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      backendConnected ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    Backend {backendConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <button
                  onClick={checkBackendConnection}
                  className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-xs flex items-center space-x-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Video Section */}
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                {!videoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p className="text-gray-300 text-lg">
                      {debugInfo || 'Waiting for camera...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Emotion Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Current Emotion */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 text-center">
              <h3 className="text-xl font-semibold mb-4">Current Emotion</h3>
              <div className="text-8xl mb-4">{currentEmotion.emoji}</div>
              <div className={`text-3xl font-bold ${currentEmotion.color}`}>
                {currentEmotion.label}
              </div>
              <p className="text-gray-400 mt-2">Confidence: {confidence}%</p>
            </div>

            {/* Emotion Breakdown */}
            {Object.keys(emotionDistribution).length > 0 && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Emotion Breakdown</h3>
                {emotions.map(emotion => {
                  const raw = emotionDistribution[emotion.name] || 0;
                  const percentage = Math.round(raw * 100);
                  return (
                    <div
                      key={emotion.name}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {emotion.emoji} {emotion.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 h-2 rounded">
                          <motion.div
                            className="h-2 bg-cyan-400 rounded"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Emotion Timeline */}
            {emotionHistory.length > 0 && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Emotion Timeline</h3>
                <EmotionChart data={emotionHistory} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
