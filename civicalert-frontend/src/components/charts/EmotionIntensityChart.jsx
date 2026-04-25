import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from "recharts";

const EmotionIntensityChart = ({ complaints }) => {

  const emotionCount = {};

  complaints.forEach(c => {
    const e = c.emotion || "neutral";
    emotionCount[e] = (emotionCount[e] || 0) + 1;
  });

  const data = Object.keys(emotionCount).map(key => ({
    name: key,
    value: emotionCount[key]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="font-semibold mb-3 text-center">
        Emotion Analysis
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default EmotionIntensityChart;