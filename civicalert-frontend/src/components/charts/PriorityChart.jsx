import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const PriorityChart = ({ complaints }) => {

  const priorityCount = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0
  };

  complaints.forEach(c => {
    if (priorityCount[c.priority] !== undefined) {
      priorityCount[c.priority]++;
    }
  });

  const data = Object.keys(priorityCount).map(key => ({
    name: key,
    value: priorityCount[key]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="font-semibold mb-3 text-center">
        Priority Distribution
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default PriorityChart;