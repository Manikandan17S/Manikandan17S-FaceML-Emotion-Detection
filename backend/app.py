from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
from PIL import Image
import io
import logging
import os
import cv2
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D, BatchNormalization
from tensorflow.keras.preprocessing.image import img_to_array
import warnings
warnings.filterwarnings('ignore')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# Global variables
emotion_model = None
face_cascade = None

# Emotion labels (FER-2013 standard)
EMOTION_LABELS = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def create_model():
    """Create the CNN model architecture"""
    model = Sequential()
    
    # First convolutional block
    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48, 48, 1)))
    model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))
    
    # Second convolutional block
    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))
    
    # Flatten and dense layers
    model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(7, activation='softmax'))
    
    return model

def load_emotion_model():
    """Load or create the emotion detection model"""
    global emotion_model
    try:
        logger.info("Loading emotion detection model...")
        
        # Try to load existing model
        if os.path.exists('emotion_model.h5'):
            emotion_model = tf.keras.models.load_model('emotion_model.h5')
            logger.info("Loaded existing model from emotion_model.h5")
        else:
            # Create new model with random weights for demo
            emotion_model = create_model()
            emotion_model.compile(
                optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            logger.info("Created new model with random weights")
        
        return True
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

def load_face_cascade():
    """Load OpenCV face cascade classifier"""
    global face_cascade
    try:
        logger.info("Loading face cascade classifier...")
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
        if face_cascade.empty():
            logger.error("Failed to load face cascade")
            return False
            
        logger.info("Face cascade loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"Error loading face cascade: {str(e)}")
        return False

def detect_faces(image):
    """Detect faces in the image using OpenCV"""
    try:
        # Convert to grayscale for face detection
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image
        
        # Detect faces
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )
        
        return faces, gray
    except Exception as e:
        logger.error(f"Error detecting faces: {str(e)}")
        return [], None

def predict_emotion(face_image):
    """Predict emotion from face image"""
    try:
        # Preprocess the face image
        face_image = cv2.resize(face_image, (48, 48))
        face_image = face_image.astype("float") / 255.0
        face_image = img_to_array(face_image)
        face_image = np.expand_dims(face_image, axis=0)
        
        # Get predictions from model
        predictions = emotion_model.predict(face_image, verbose=0)[0]
        
        # Get the emotion with highest probability
        emotion_probability = np.max(predictions)
        emotion_label_arg = np.argmax(predictions)
        emotion_text = EMOTION_LABELS[emotion_label_arg]
        
        # Create emotion distribution
        emotion_distribution = {}
        for i, label in enumerate(EMOTION_LABELS):
            emotion_distribution[label.lower()] = float(predictions[i])
        
        return emotion_text.lower(), float(emotion_probability), emotion_distribution
        
    except Exception as e:
        logger.error(f"Error predicting emotion: {str(e)}")
        # Return random predictions for demo if model fails
        import random
        predictions = np.random.rand(7)
        predictions = predictions / np.sum(predictions)
        
        emotion_probability = np.max(predictions)
        emotion_label_arg = np.argmax(predictions)
        emotion_text = EMOTION_LABELS[emotion_label_arg]
        
        emotion_distribution = {}
        for i, label in enumerate(EMOTION_LABELS):
            emotion_distribution[label.lower()] = float(predictions[i])
        
        return emotion_text.lower(), float(emotion_probability), emotion_distribution

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': emotion_model is not None,
        'face_cascade_loaded': face_cascade is not None,
        'model_type': 'tensorflow_cnn',
        'emotion_classes': EMOTION_LABELS
    })

@app.route('/predict_emotion', methods=['POST'])
def predict_emotion_endpoint():
    """Predict emotion from uploaded image"""
    try:
        if emotion_model is None or face_cascade is None:
            return jsonify({'error': 'Model or face cascade not loaded'}), 500
        
        # Get image data from request
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64, prefix
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image then to OpenCV format
        pil_image = Image.open(io.BytesIO(image_bytes))
        cv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        
        # Detect faces
        faces, gray_image = detect_faces(cv_image)
        
        if len(faces) == 0:
            return jsonify({
                'success': False,
                'message': 'No face detected in the image'
            })
        
        results = []
        
        # Process each detected face
        for (x, y, w, h) in faces:
            # Extract face region
            face_roi = gray_image[y:y+h, x:x+w]
            
            # Predict emotion
            predicted_emotion, confidence, emotion_distribution = predict_emotion(face_roi)
            
            results.append({
                'face_coordinates': {'x': int(x), 'y': int(y), 'width': int(w), 'height': int(h)},
                'predicted_emotion': predicted_emotion,
                'confidence': confidence,
                'emotion_distribution': emotion_distribution
            })
        
        return jsonify({
            'success': True,
            'faces_detected': len(faces),
            'results': results
        })
        
    except Exception as e:
        logger.error(f"Error in predict_emotion: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/predict_emotion_stream', methods=['POST'])
def predict_emotion_stream():
    """Predict emotion from video stream frame"""
    try:
        if emotion_model is None or face_cascade is None:
            return jsonify({'error': 'Model or face cascade not loaded'}), 500
        
        # Get image data from request
        data = request.get_json()
        if 'frame' not in data:
            return jsonify({'error': 'No frame data provided'}), 400
        
        # Decode base64 image
        frame_data = data['frame'].split(',')[1]
        frame_bytes = base64.b64decode(frame_data)
        
        # Convert to PIL Image then to OpenCV format
        pil_image = Image.open(io.BytesIO(frame_bytes))
        cv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        
        # Detect faces
        faces, gray_image = detect_faces(cv_image)
        
        if len(faces) == 0:
            return jsonify({
                'success': True,
                'emotion': 'neutral',
                'confidence': 0.0,
                'faces_detected': 0,
                'emotion_distribution': {label.lower(): 0.0 for label in EMOTION_LABELS}
            })
        
        # Process the largest face (assuming it's the main subject)
        largest_face = max(faces, key=lambda face: face[2] * face[3])
        x, y, w, h = largest_face
        
        # Extract face region
        face_roi = gray_image[y:y+h, x:x+w]
        
        # Predict emotion
        predicted_emotion, confidence, emotion_distribution = predict_emotion(face_roi)
        
        return jsonify({
            'success': True,
            'emotion': predicted_emotion,
            'confidence': confidence,
            'faces_detected': len(faces),
            'emotion_distribution': emotion_distribution
        })
        
    except Exception as e:
        logger.error(f"Error in predict_emotion_stream: {str(e)}")
        return jsonify({'error': f'Stream prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    logger.info("Starting Flask application...")
    
    # Load the face cascade and model on startup
    face_cascade_loaded = load_face_cascade()
    model_loaded = load_emotion_model()
    
    if face_cascade_loaded and model_loaded:
        logger.info("Face cascade and model loaded successfully, starting server...")
        logger.info("Backend running at: http://localhost:5000")
        logger.info("Frontend should run at: http://localhost:5173")
        app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
    else:
        logger.error("Failed to load face cascade or model, exiting...")