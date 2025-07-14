import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { date: "Jul 5", jars: 500 },
  { date: "Jul 6", jars: 640 },
  { date: "Jul 7", jars: 580 },
  { date: "Jul 8", jars: 700 },
  { date: "Jul 9", jars: 620 },
  { date: "Jul 10", jars: 760 },
  { date: "Jul 11", jars: 560 },
];

const ProductionChart = () => {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-blue-800 text-white shadow-md">
      <h2 className="text-lg font-semibold text-blue-300 mb-2">
        📈 Jar Production (Past 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="jars"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionChart;
