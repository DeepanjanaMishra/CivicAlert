from flask import Flask, request, jsonify
import whisper
import os
import imageio_ffmpeg

# 🔥 ADD THIS
os.environ["PATH"] += os.pathsep + os.path.dirname(imageio_ffmpeg.get_ffmpeg_exe())
app = Flask(__name__)

# Load model (first time will take time)
model = whisper.load_model("base")

@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    try:
        audio_file = request.files["audio"]

        # Save file directly
        file_path = "temp_audio"
        audio_file.save(file_path)

        # 🔥 Directly transcribe (NO ffmpeg)
        result = model.transcribe(file_path)
        print("🧠 Transcription result:", result)

        os.remove(file_path)

        return jsonify({
            "text": result["text"]
        })

    except Exception as e:
        print("❌ Whisper error:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5001)