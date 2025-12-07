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

from backend.emotion_cnn import EmotionCNN

app = Flask(__name__)

# Explicit CORS config for Vercel + local dev
CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "https://face-ml-emotion-detection.vercel.app"
    ]}},
    supports_credentials=False,
)

@app.after_request
def add_cors_headers(response):
    # Safety net to ensure CORS headers are always present
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

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
cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(cascade_path)

print("[INFO] Using device:", device)
print("[INFO] Haar cascade path:", cascade_path)
print("[INFO] Haar cascade loaded empty? ->", face_cascade.empty())


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "Backend is running with PyTorch!",
        "device": str(device),
        "cascade_loaded": not face_cascade.empty()
    })


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

        h, w, _ = frame.shape

        # Detect faces
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,   # you can try 1.05 later if still no faces
            minNeighbors=3,    # was 5, now more lenient
            minSize=(60, 60)   # ignore tiny detections
        )

        # Debug: print some info in Render logs
        print(f"[DEBUG] Frame size: {w}x{h}, faces detected: {len(faces)}")

        if len(faces) == 0:
            return jsonify({
                "success": True,
                "faces_detected": 0,
                "debug": "no_faces_detected"
            })

        # Take first face
        (x, y, w_face, h_face) = faces[0]
        face_img = gray[y:y + h_face, x:x + w_face]
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
            "faces_detected": int(len(faces)),
            "emotion": emotion_labels[predicted.item()],
            "confidence": float(confidence),
            "emotion_distribution": emotion_distribution
        })

    except Exception as e:
        print("[ERROR] Exception in /predict_emotion_stream:", e)
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
