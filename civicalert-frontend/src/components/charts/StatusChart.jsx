import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const StatusChart = ({ complaints }) => {

  const statusCount = {
    Pending: 0,
    "In Progress": 0,
    Resolved: 0
  };

  complaints.forEach(c => {
    if (statusCount[c.status] !== undefined) {
      statusCount[c.status]++;
    }
  });

  const data = Object.keys(statusCount).map(key => ({
    name: key,
    value: statusCount[key]
  }));

  const COLORS = ["#F59E0B", "#3B82F6", "#22C55E"];

  return (
    <div className="w-full h-full">

      <h3 className="text-center font-semibold mb-3">
        Complaint Status
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default StatusChart;