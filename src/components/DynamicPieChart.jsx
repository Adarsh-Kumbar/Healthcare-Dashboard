import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EFF",
  "#FF6699",
  "#66CC99",
  "#FF4444",
  "#8884d8",
  "#00BCD4",
  "#FF9800",
  "#795548",
];

const GROUP_OPTIONS = [
  { value: "patient_injury_zone", label: "Injury Zone" },
  { value: "city_name", label: "City" },
  { value: "disease_manner", label: "Disease Manner" },
  { value: "first_symptom", label: "First Symptom" },
];

const DynamicPieChart = () => {
  const [rawData, setRawData] = useState([]);
  const [groupKey, setGroupKey] = useState(GROUP_OPTIONS[0].value);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadExcel = async () => {
      const response = await fetch(
        "/src/Patient_Data_Sample__50_Rows_Filled_.xlsx"
      );
      const buffer = await response.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "buffer" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setRawData(json);
    };
    loadExcel();
  }, []);

  useEffect(() => {
    if (!rawData.length) return;
    const counts = {};
    rawData.forEach((row) => {
      const key = row[groupKey] || "Unknown";
      counts[key] = (counts[key] || 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const entries = Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);

      const main = [],
      other = { name: "Other", value: 0 };
    entries.forEach((item) => {
      if (parseFloat(item.percentage) < 5) {
        other.value += item.value;
      } else main.push(item);
    });
    if (other.value > 0) {
      other.percentage = ((other.value / total) * 100).toFixed(1);
      main.push(other);
    }
    setChartData(main);
  }, [rawData, groupKey]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Controls + Chart */}
      <div className="flex-1 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Distribution by{" "}
          {GROUP_OPTIONS.find((o) => o.value === groupKey).label}
        </h2>
        {/* Dropdown */}
        <select
          value={groupKey}
          onChange={(e) => setGroupKey(e.target.value)}
          className="mb-4 px-3 py-2 border rounded"
        >
          {GROUP_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} patients`} />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-white p-6 rounded shadow-md overflow-auto max-h-[400px]">
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Count</th>
              <th className="px-4 py-2 border">%</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item) => (
              <tr key={item.name} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.value}</td>
                <td className="px-4 py-2 border">{item.percentage}%</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className="px-4 py-2 border">Total</td>
              <td className="px-4 py-2 border">
                {chartData.reduce((sum, i) => sum + i.value, 0)}
              </td>
              <td className="px-4 py-2 border">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicPieChart;
