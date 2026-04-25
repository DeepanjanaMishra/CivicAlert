import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from "recharts";

const TopIssuesChart = ({ complaints }) => {

  const issueCount = {};

  complaints.forEach(c => {
    c.keywords?.forEach(k => {
      issueCount[k] = (issueCount[k] || 0) + 1;
    });
  });

  const data = Object.keys(issueCount).map(key => ({
    name: key,
    value: issueCount[key]
  }));

  return (
    <div className="w-full h-full">

      <h3 className="text-center font-semibold mb-3">
        Top Issues
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

export default TopIssuesChart;