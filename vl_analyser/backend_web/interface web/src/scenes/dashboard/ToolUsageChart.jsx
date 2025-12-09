import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { tokens } from "../../theme";
import {
  useTheme
} from "@mui/material";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  


const ToolUsageChart = () => {
  const [data, setData] = useState([]);
const theme = useTheme();
const colors = tokens(theme.palette.mode);

   useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/scan-stats")
      .then(res => {
        const raw = res.data[0]; // Get the single object
        const formatted = [
          { name: "Nmap", value: raw.Nmap },
          { name: "Wapiti", value: raw.Wapiti },
          { name: "ZAP", value: raw.ZAP }
        ];
        setData(formatted);
      })
      .catch(err => console.error("Failed to fetch scan stats:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 250 }}>
      <h3 style={{ textAlign: "center", color:  colors.greenAccent[600] }}>Scan Distribution by Tool</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ToolUsageChart;
