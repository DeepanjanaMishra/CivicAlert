import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const TimelineChart = ({ complaints }) => {

  const dateMap = {};

  complaints.forEach(c => {
    const date = new Date(c.createdAt).toLocaleDateString();
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const data = Object.keys(dateMap).map(date => ({
    date,
    count: dateMap[date]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="font-semibold mb-3 text-center">
        Complaints Over Time
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default TimelineChart;