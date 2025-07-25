# FaceML Backend - Emotion Detection

Flask backend for real-time emotion detection using CNN model trained on FER-2013 dataset.
Based on the emotion detection project: https://github.com/atulapra/Emotion-detection

## Features

- **CNN Model**: Deep learning model for emotion classification
- **Face Detection**: OpenCV Haar cascade for face detection
- **Real-time Processing**: Video stream frame analysis
- **7 Emotion Classes**: Angry, Disgust, Fear, Happy, Neutral, Sad, Surprise
- **REST API**: Flask endpoints for emotion prediction

## Setup Instructions

### 1. Create Virtual Environment (Recommended)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Download Pre-trained Model (Optional)
If you have a pre-trained model:
```bash
# Place your trained model file in the backend directory
# Update the model loading path in app.py
```

### 4. Start the Flask Server
```bash
python app.py
```

The backend will:
- Load the face cascade classifier
- Initialize the emotion detection model
- Start the Flask server on `http://localhost:5000`
- Provide API endpoints for emotion detection

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and model loading state.

### Image Emotion Detection
```
POST /predict_emotion
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

### Video Stream Emotion Detection
```
POST /predict_emotion_stream
Content-Type: application/json

{
  "frame": "data:image/jpeg;base64,..."
}
```

## Model Architecture

The CNN model follows this architecture:
- **Input**: 48x48 grayscale images
- **Conv2D Layers**: Feature extraction with ReLU activation
- **MaxPooling**: Spatial dimension reduction
- **Dropout**: Regularization to prevent overfitting
- **Dense Layers**: Classification with softmax output
- **Output**: 7 emotion probabilities

## Training Your Own Model

1. **Download FER-2013 Dataset**:
   ```bash
   # Download from Kaggle: https://www.kaggle.com/datasets/msambare/fer2013
   ```

2. **Run Training Script**:
   ```bash
   python model_training.py
   ```

3. **Update Model Path**:
   ```python
   # In app.py, update the model loading:
   emotion_model = load_model('your_trained_model.h5')
   ```

## Model Performance

- **Dataset**: FER-2013 (35,887 images)
- **Input Size**: 48x48 pixels
- **Classes**: 7 emotions
- **Architecture**: CNN with batch normalization
- **Accuracy**: ~65-70% (typical for FER-2013)

## Emotion Classes

1. **Angry** 😠
2. **Disgust** 🤢
3. **Fear** 😨
4. **Happy** 😊
5. **Neutral** 😐
6. **Sad** 😢
7. **Surprise** 😲

## Troubleshooting

### Common Issues

1. **Model Loading Error**:
   - Ensure TensorFlow is properly installed
   - Check model file path and format

2. **Face Detection Issues**:
   - Verify OpenCV installation
   - Ensure good lighting conditions
   - Check camera permissions

3. **Low Accuracy**:
   - Improve lighting conditions
   - Ensure face is clearly visible
   - Consider retraining with more data

### Performance Tips

- **Good Lighting**: Ensure adequate lighting for face detection
- **Clear Face**: Face should be clearly visible and unobstructed
- **Stable Camera**: Minimize camera shake for better detection
- **Distance**: Maintain appropriate distance from camera

## Privacy

All emotion detection happens locally on your machine. No data is sent to external services.

## Requirements

- Python 3.8+
- TensorFlow 2.x
- OpenCV 4.x
- Flask 3.x
- Webcam access for real-time detection

## License

This project is based on the open-source emotion detection repository and is available under MIT license.