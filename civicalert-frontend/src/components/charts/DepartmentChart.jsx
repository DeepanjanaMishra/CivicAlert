import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const DepartmentChart = ({ complaints }) => {

  const deptCount = {};

  complaints.forEach(c => {
    const dept = c.department || "Other";
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });

  const data = Object.keys(deptCount).map(key => ({
    name: key,
    value: deptCount[key]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="font-semibold mb-3 text-center">
        Department-wise Complaints
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
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

export default DepartmentChart;