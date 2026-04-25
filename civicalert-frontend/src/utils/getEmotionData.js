export const getEmotionData = (emotion) => {

  const map = {
    neutral: { icon: "😐", label: "Neutral", color: "bg-gray-200 text-gray-700" },
    calm: { icon: "😌", label: "Calm", color: "bg-blue-100 text-blue-700" },
    happy: { icon: "🙂", label: "Happy", color: "bg-green-200 text-green-700" },
    sad: { icon: "😢", label: "Sad", color: "bg-blue-200 text-blue-700" },
    angry: { icon: "😠", label: "Angry", color: "bg-red-200 text-red-700" },
    fearful: { icon: "😨", label: "Fearful", color: "bg-purple-200 text-purple-700" },
    disgust: { icon: "🤢", label: "Disgust", color: "bg-yellow-200 text-yellow-800" },
    surprised: { icon: "😲", label: "Surprised", color: "bg-pink-200 text-pink-700" },
  };

  return map[emotion] || {
    icon: "❓",
    label: "Unknown",
    color: "bg-gray-200 text-gray-700"
  };
};