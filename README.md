FaceML - Real-Time Emotion Detection




A real-time emotion detection web app powered by CNN for emotion recognition and built with Flask (backend) + React (frontend).

✨ Features
✅ Real-time webcam-based emotion detection
✅ Detects 7 emotions: Happy, Sad, Angry, Surprise, Fear, Disgust, Neutral
✅ Modern, responsive UI (Tailwind + Animations)
✅ Live confidence scores & timeline charts
✅ All processing done locally (Privacy-first)
✅ CNN Model trained on FER-2013 dataset

🚀 Quick Start
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Manikandan17S/Manikandan17S-FaceML-Emotion-Detection.git
cd Manikandan17S-FaceML-Emotion-Detection
2. Backend Setup
bash
Copy
Edit
cd backend
python -m venv venv
# Activate venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
✅ Flask server will run on http://localhost:5000

3. Frontend Setup
bash
Copy
Edit
# In project root
npm install
npm run dev
✅ React app will run on http://localhost:5173

🖥️ Usage
Start Backend → python app.py

Start Frontend → npm run dev

Open → http://localhost:5173

Allow Camera Access and click Start Detection

📊 Model Details
Architecture: CNN (TensorFlow/Keras)

Dataset: FER-2013

Input: 48x48 grayscale image

Output: 7 emotions (Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise)

📂 Project Structure
bash
Copy
Edit
FaceML/
├── backend/
│   ├── app.py             # Flask API
│   ├── model.h5           # Trained CNN model
│   ├── requirements.txt    # Python dependencies
├── src/
│   ├── components/         # React Components
│   ├── App.tsx            # Main App
│   └── main.tsx           # Entry point
├── .gitignore
├── README.md
└── package.json
🔑 API Endpoints
Health Check
bash
Copy
Edit
GET /health
Response: { "status": "ok" }
Predict Emotion
css
Copy
Edit
POST /predict_emotion
Body: { "image": "data:image/jpeg;base64,..." }
📦 Requirements
Python 3.8+

Flask 3.0+

TensorFlow 2.x

Node.js 16+

⚠️ Common Issues
✅ Black Screen → Refresh & allow camera
✅ Backend not connecting → Check CORS + Flask running
✅ Slow detection → Close other apps, good lighting

🤝 Contributing
Fork & Star 🌟 the repo

Create a feature branch

Make changes & push

Submit a Pull Request

📜 License
Licensed under MIT License.