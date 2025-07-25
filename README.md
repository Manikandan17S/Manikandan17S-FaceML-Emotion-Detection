# FaceML - Real-Time Emotion Detection

A complete real-time emotion detection web application using React frontend and Flask backend with CNN emotion detection model.

## 🎯 Features

- **Real-time emotion detection** from webcam feed
- **7 emotion classes**: Happy, Sad, Angry, Surprise, Fear, Disgust, Neutral
- **Beautiful, responsive UI** with animations and gradients
- **Live emotion timeline** charts and confidence scoring
- **Privacy-focused**: All processing happens locally
- **CNN model** trained on FER-2013 dataset

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

```bash
# Clone or download the project
# Run the setup script
python setup.py
```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Start the Flask backend:**
```bash
python app.py
```

#### Frontend Setup

1. **Install Node.js dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
```
http://localhost:5173
```

## 🖥️ Usage

1. **Start Backend**: Run `python app.py` in the backend directory
2. **Start Frontend**: Run `npm run dev` in the root directory
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Allow Camera**: Grant camera permissions when prompted
5. **Start Detection**: Click "Start Camera" to begin emotion detection

## 📊 Model Information

- **Architecture**: Convolutional Neural Network (CNN)
- **Dataset**: FER-2013 (Facial Expression Recognition)
- **Input Size**: 48x48 grayscale images
- **Output**: 7 emotion classes with confidence scores
- **Framework**: TensorFlow/Keras + OpenCV

### Emotion Classes

1. **Angry** 😠 - Red theme
2. **Disgust** 🤢 - Green theme  
3. **Fear** 😨 - Orange theme
4. **Happy** 😊 - Yellow theme
5. **Neutral** 😐 - Gray theme
6. **Sad** 😢 - Blue theme
7. **Surprise** 😲 - Purple theme

## 🛠️ API Endpoints

### Health Check
```
GET http://localhost:5000/health
```

### Image Emotion Detection
```
POST http://localhost:5000/predict_emotion
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

### Video Stream Emotion Detection
```
POST http://localhost:5000/predict_emotion_stream
Content-Type: application/json

{
  "frame": "data:image/jpeg;base64,..."
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Camera not working**:
   - Ensure you're running on `localhost` or `https://`
   - Grant camera permissions in your browser
   - Check if other applications are using the camera

2. **Backend connection failed**:
   - Make sure Flask server is running on port 5000
   - Check firewall settings
   - Verify CORS configuration

3. **Dependencies installation failed**:
   - Update pip: `pip install --upgrade pip`
   - Try installing dependencies one by one
   - Check Python version (3.8+ required)

4. **Black screen in camera feed**:
   - Refresh the page and try again
   - Check browser console for errors
   - Ensure proper lighting conditions

### Performance Tips

- **Good lighting**: Ensure adequate lighting for face detection
- **Clear face**: Face should be clearly visible and unobstructed
- **Stable camera**: Minimize camera shake for better detection
- **Close browser tabs**: Free up system resources

## 🔒 Privacy

- All emotion detection happens **locally** on your machine
- **No data is sent** to external services
- Camera feed is **processed in real-time** and not stored
- Complete **privacy protection** for your facial data

## 📋 Requirements

### Backend
- Python 3.8+
- TensorFlow 2.13+
- OpenCV 4.8+
- Flask 3.0+

### Frontend
- Node.js 16+
- Modern browser with WebRTC support
- Webcam access

## 🏗️ Project Structure

```
faceml/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── requirements.txt    # Python dependencies
│   ├── run.py             # Backend runner script
│   └── README.md          # Backend documentation
├── src/
│   ├── components/        # React components
│   ├── App.tsx           # Main application
│   └── main.tsx          # Application entry point
├── setup.py              # Automatic setup script
├── package.json          # Frontend dependencies
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **FER-2013 Dataset** for emotion recognition training data
- **OpenCV** for computer vision capabilities
- **TensorFlow** for deep learning framework
- **React** and **Tailwind CSS** for beautiful UI

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Look at browser console for error messages
3. Ensure all dependencies are properly installed
4. Try restarting both backend and frontend servers

---

**Made with ❤️ for real-time emotion detection**