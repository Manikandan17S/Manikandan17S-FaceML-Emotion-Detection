import os
import io
import base64

import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
import cv2
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

from emotion_cnn import EmotionCNN

app = Flask(__name__)
CORS(app)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# --- Model loading ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "emotion_model.pt")

model = EmotionCNN().to(device)
state_dict = torch.load(MODEL_PATH, map_location=device)
model.load_state_dict(state_dict)
model.eval()

# --- Preprocessing ---
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),
    transforms.Resize((48, 48)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

# Haarcascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend is running with PyTorch!"})


@app.route("/predict_emotion_stream", methods=["POST"])
def predict_emotion_stream():
    try:
        data = request.get_json()
        if not data or "frame" not in data:
            return jsonify({"success": False, "error": "No frame provided"}), 400

        img_data = data["frame"]
        img_bytes = base64.b64decode(img_data.split(",")[1])
        np_img = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"success": False, "error": "Invalid image data"}), 400

        # Detect faces
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

        if len(faces) == 0:
            return jsonify({"success": True, "faces_detected": 0})

        
        (x, y, w, h) = faces[0]
        face_img = gray[y:y + h, x:x + w]
        pil_img = Image.fromarray(face_img)

        img_tensor = transform(pil_img).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(img_tensor)
            probs = F.softmax(outputs, dim=1)[0]
            confidence, predicted = torch.max(probs, 0)

        emotion_distribution = {
            emotion_labels[i]: round(float(probs[i]), 4)
            for i in range(len(emotion_labels))
        }

        return jsonify({
            "success": True,
            "faces_detected": len(faces),
            "emotion": emotion_labels[predicted.item()],
            "confidence": float(confidence),
            "emotion_distribution": emotion_distribution
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
