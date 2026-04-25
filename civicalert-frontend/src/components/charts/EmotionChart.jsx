import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#6366F1", "#22C55E", "#F59E0B", "#EF4444",
  "#3B82F6", "#A855F7", "#EAB308", "#EC4899"
];

const EmotionChart = ({ complaints }) => {
  const emotionCount = {};

  complaints.forEach(c => {
    const e = c.emotion || "unknown";
    emotionCount[e] = (emotionCount[e] || 0) + 1;
  });

  const data = Object.keys(emotionCount).map(key => ({
    name: key,
    value: emotionCount[key]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="font-semibold mb-3 text-center">
        Emotion Distribution
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}   // 🔥 perfect for half screen
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default EmotionChart;