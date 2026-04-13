from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import librosa
import os
import joblib

app = Flask(__name__)

# 🔥 Load model
model = tf.keras.models.load_model("../ml_models/emotion_model/emotion_pretrained_model.keras")

# 🔥 Load scaler (VERY IMPORTANT)
scaler = joblib.load("../ml_models/emotion_model/scaler.pkl")

# Labels
labels = [
    "neutral",
    "calm",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgust",
    "surprised"
]

# 🔥 Feature extraction (MATCH TRAINING EXACTLY)
def extract_features(file_path):
    SAMPLE_RATE = 16000
    N_MFCC = 13
    N_FFT = int(0.025 * SAMPLE_RATE)
    HOP_LENGTH = int(0.010 * SAMPLE_RATE)

    y, sr = librosa.load(file_path, sr=SAMPLE_RATE)

    # MFCC
    mfcc = librosa.feature.mfcc(
        y=y,
        sr=sr,
        n_mfcc=N_MFCC,
        n_fft=N_FFT,
        hop_length=HOP_LENGTH
    )

    # Delta
    delta = librosa.feature.delta(mfcc)
    delta2 = librosa.feature.delta(mfcc, order=2)

    # Stack → (time_steps, features)
    features = np.vstack([mfcc, delta, delta2]).T

    return features


@app.route("/predict-emotion", methods=["POST"])
def predict_emotion():
    try:
        print("📥 Received audio file for emotion detection")

        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        file_path = "temp.wav"
        file.save(file_path)

        # 🔥 Step 1: Extract features
        features = extract_features(file_path)

        # 🔥 Step 2: APPLY SCALING (CRITICAL FIX)
        original_shape = features.shape
        features_reshaped = features.reshape(-1, original_shape[-1])
        features_scaled = scaler.transform(features_reshaped)
        features = features_scaled.reshape(original_shape)

        # 🔥 Step 3: Fix sequence length
        MAX_LEN = 301

        if features.shape[0] < MAX_LEN:
            pad_width = MAX_LEN - features.shape[0]
            features = np.pad(features, ((0, pad_width), (0, 0)))
        else:
            features = features[:MAX_LEN, :]

        # 🔥 Step 4: Expand dims
        features = np.expand_dims(features, axis=0)

        print("Feature shape:", features.shape)

        # 🔥 Step 5: Prediction
        prediction = model.predict(features)
        emotion_index = np.argmax(prediction)
        confidence = float(np.max(prediction))

        emotion = labels[emotion_index]

        # 🔥 DEBUG PRINTS
        print("\n===== EMOTION PREDICTION =====")
        print("Emotion:", emotion)
        print("Confidence:", confidence)
        print("Raw Prediction:", prediction)
        print("==============================\n")

        # Cleanup
        os.remove(file_path)

        return jsonify({
            "emotion": emotion,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(port=5002, debug=True)