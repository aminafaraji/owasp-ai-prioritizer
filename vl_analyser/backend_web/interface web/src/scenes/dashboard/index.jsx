import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolUsageChart from "./ToolUsageChart"; // ✅ Graphe circulaire

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [scans, setScans] = useState([]);
  const [toolCounts, setToolCounts] = useState({ ZAP: 0, Nmap: 0, Wapiti: 0 });
  const [type, setType] = useState("");
  const [score, setScore] = useState("");
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/lastfive")
      .then((res) => {
        setScans(res.data);
        const counts = { ZAP: 0, Nmap: 0, Wapiti: 0 };
        res.data.forEach((scan) => {
          const tool = scan.tool?.toLowerCase();
          if (tool.includes("zap")) counts.ZAP++;
          else if (tool.includes("nmap")) counts.Nmap++;
          else if (tool.includes("wapiti")) counts.Wapiti++;
        });
        setToolCounts(counts);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePredict = async () => {
    if (!score || !type) {
      alert("Please enter a vulnerability description");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict_priority", {
       
        type: type,
        score: score,
      });
      setPrediction(res.data.priority);
    } catch (err) {
      console.error("Prediction error:", err.response?.data || err.message);
      setPrediction("Error");
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the AI Vulnerability Analyzer" />
       {/*  <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button> */}
      </Box>

      {/* IA Prediction */}
      <Box
        backgroundColor={colors.primary[400]}
        p="7px"
        mt="2px"
        borderRadius="8px"
      >
        <Typography variant="h5" color={colors.grey[100]} mb="10px">
           AI Vulnerability Priority
        </Typography>
        <Box display="flex" gap="10px" flexWrap="wrap">
          <input
            type="text"
            placeholder="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              minWidth: "250px",
            }}
          />
           <input
            type="text"
            placeholder="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              minWidth: "250px",
            }}
          />
          <Button
            onClick={handlePredict}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "white",
              fontWeight: "bold",
              height: "42px",
            }}
          >
            Predict
          </Button>
        </Box>
        {prediction && (
          <Typography mt="5px" color={colors.greenAccent[400]}>
            Predicted Priority: <strong>{prediction}</strong>
          </Typography>
        )}
      </Box>

      {/* CHARTS + RECENT SCANS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        mt="20px"
      >
        {/* TOOL USAGE CHART (PIE) */}
        <Box
          gridColumn="span 8"
          backgroundColor={colors.primary[400]}
          // display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="10px"
        >
         {/*  <Typography variant="h5" color={colors.grey[100]} fontWeight="100" mb="2px">
            Tool Usage Statistics
          </Typography> */}
          <ToolUsageChart toolCounts={toolCounts} />
        </Box>

        {/* RECENT SCANS */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Scans
            </Typography>
          </Box>
          {scans.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.id}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.url}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.tool}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
