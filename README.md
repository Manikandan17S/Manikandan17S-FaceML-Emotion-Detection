# FaceML - Real-Time Emotion Detection

A real-time emotion detection web app powered by a **CNN in PyTorch** for emotion recognition and built with **Flask (backend)** + **React (frontend)**.

---

## ✨ Features

✅ Real-time webcam-based emotion detection  
✅ Detects 7 emotions: **Happy, Sad, Angry, Surprise, Fear, Disgust, Neutral**  
✅ Modern, responsive UI (React + Tailwind + animations)  
✅ Live confidence scores & emotion distribution  
✅ All processing done locally (privacy-first)  
✅ **CNN model trained on FER-2013-style dataset using PyTorch**

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Manikandan17S/Manikandan17S-FaceML-Emotion-Detection.git
cd Manikandan17S-FaceML-Emotion-Detection

2️⃣ Backend Setup (PyTorch + Flask)

From the project root:
# Create virtual environment
python -m venv venv

# Activate venv
# Windows (PowerShell):
venv\Scripts\Activate.ps1

# Windows (CMD):
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run Flask backend
python backend/app.py

✅ Flask server will be available at:
http://localhost:5000

3️⃣ Frontend Setup (React + Vite)

From the project root (in a separate terminal):

npm install
npm run dev


✅ React app will run at (by default):
http://localhost:5173

🖥️ Usage

Start backend:

python backend/app.py


Start frontend:

npm run dev


Open the app in your browser:

👉 http://localhost:5173

Allow camera access and click “Start Detection”

Watch real-time emotion predictions with confidence scores 🎭

🧠 Model Details (PyTorch Version)

Framework: PyTorch

Architecture: Custom CNN defined in backend/emotion_cnn.py

Training Script: backend/model_training.py

Saved Weights: backend/emotion_model.pt

Dataset: FER-2013-style emotion dataset

Input: 48×48 grayscale face image

Output classes (index order):

['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

🔁 Re-training the Model

Expected dataset structure:

dataset/
    train/
        angry/
        disgust/
        fear/
        happy/
        sad/
        surprise/
        neutral/
    test/
        angry/
        disgust/
        fear/
        happy/
        sad/
        surprise/
        neutral/


From project root (with venv activated):

python backend/model_training.py


Best model weights are saved as: backend/emotion_model.pt

app.py automatically loads this file on startup.

📂 Project Structure
FaceML/
├── backend/
│   ├── app.py              # Flask API (PyTorch inference)
│   ├── emotion_cnn.py      # CNN model definition (PyTorch)
│   ├── model_training.py   # Training script (FER-2013 style)
│   ├── emotion_model.pt    # Trained model weights (PyTorch state_dict)
│
├── src/
│   ├── components/         # React components (UI)
│   ├── App.tsx             # Main React app
│   └── main.tsx            # Entry point (Vite)
│
├── package.json
├── requirements.txt        # Python dependencies (Flask, PyTorch, etc.)
├── README.md
└── .gitignore

🔑 API Endpoints (Flask + PyTorch)
✅ Health Check
GET /health


Response:

{
  "status": "Backend is running with PyTorch!"
}

🎭 Real-time Emotion Prediction (Webcam Frame Stream)
POST /predict_emotion_stream
Content-Type: application/json


Request body:

{
  "frame": "data:image/jpeg;base64,..." 
}


Where frame is a base64-encoded image string captured from the webcam on the frontend.

Response example:

{
  "success": true,
  "faces_detected": 1,
  "emotion": "happy",
  "confidence": 0.93,
  "emotion_distribution": {
    "angry": 0.01,
    "disgust": 0.00,
    "fear": 0.02,
    "happy": 0.93,
    "sad": 0.01,
    "surprise": 0.02,
    "neutral": 0.01
  }
}


If no face is detected:

{
  "success": true,
  "faces_detected": 0
}

📦 Requirements
🔹 Backend

Python 3.10+ (recommended 3.10 / 3.11)

PyTorch (CPU build is enough)

Torchvision

Flask 3.x

Flask-Cors

OpenCV

Pillow

NumPy

(All handled via requirements.txt)

🔹 Frontend

Node.js 16+

React + Vite

Tailwind CSS (if used for styling)

⚠️ Common Issues

✅ Black screen / no camera
→ Refresh page, ensure browser has camera permissions.

✅ Backend not responding
→ Check that python backend/app.py is running with no errors.
→ Confirm backend URL (http://localhost:5000) in frontend config if applicable.

✅ CORS issues
→ Flask uses flask_cors.CORS(app) to allow frontend access.
→ Make sure ports (5000 & 5173) are correct.

✅ Slow detection / lag
→ Close heavy apps, use good lighting, and keep face within frame.

🤝 Contributing

Fork the repo

Star ⭐ if you like the project

Create a new feature branch:

git checkout -b feature/your-feature-name


Commit your changes & push:

git push origin feature/your-feature-name


Open a Pull Request

📜 License

This project is licensed under the MIT License.

Built with 💙 by Scott (Manikandan) and PyTorch ⚡
