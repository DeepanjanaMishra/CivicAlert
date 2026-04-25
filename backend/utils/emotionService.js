import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const getEmotionFromAudio = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      "http://127.0.0.1:5002/predict-emotion",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    console.log("🎯 Emotion API Response:", response.data);
    return response.data;

  } catch (error) {
    console.error("Emotion API Error:", error.message);
    return { emotion: "neutral", confidence: 0 };
  }
};