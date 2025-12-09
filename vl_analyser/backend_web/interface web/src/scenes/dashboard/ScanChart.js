import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const ScanChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ZAP" stroke="#8884d8" activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Nmap" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Wapiti" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScanChart;
