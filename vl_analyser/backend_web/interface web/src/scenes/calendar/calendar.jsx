import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {  IconButton } from "@mui/material";
import {  Button } from "@mui/material";
import { ColorModeContext } from "../../theme";
import {  Paper } from '@mui/material';
import axios from 'axios';
import ScanForm from './ScanForm';
import ScanChart from "./ScanChart";
import { LinearProgress, CircularProgress } from "@mui/material";

const Calendar =  ({ onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [tool, setTool] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleScan = async ({ tool, url }) => {

    //e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/scan', {
        url,
        tool: "zap",
      });
      //alert(`Scan complete: ${response.data.result}`);
      setResult(response.data.result); // assuming the response has a field `result`
   
    } catch (error) {
      //alert('Scan failed.');
      //console.error('API error:', error.message);
      setError('Scan failed. Please check the URL or server.');
    }
    finally {
    setLoading(false);
  }
  };

  return (

    <Box m="20px">
      <Header title="SCAN ZAP"  />
      <ScanForm onSubmit={handleScan} />
     
      {loading && (
        <div style={{ marginTop: 10 }}>
          <LinearProgress />
          <p style={{ textAlign: "center", color: 'green'  }}>Scan en cours...</p>
        </div>
      )}

     

      { Array.isArray(result) && (
      <div style={{ width: "400px", margin: "0 auto" }}>
      <ScanChart result={result} />
      <div style={{ marginTop: '20px', color: 'green' }}>
            <ul>
              
      {  result.map((res) => (
          <li key={res.id}>
            <h4>alert: {res.alert}</h4>
            <p>Attack: {res.attack}</p>
            <p>Confidence: {res.confidence}</p>
            <p>Cweid: {res.cweid}</p>
                <p>description: {res.description}</p>
                <p>evidence: {res.evidence}</p>
                <p>messageId: {res.messageId}</p>
                <p>method: {res.method}</p>
                <p>inputVector: {res.inputVector}</p>
                <p>name: {res.name}</p>
                <p>other: {res.other}</p>
                <p>param: {res.param}</p>
                <p>pluginId: {res.pluginId}</p>
                <p>reference: {res.reference}</p>
                <p>risk: {res.risk}</p>
                <p>sourceMessageId: {res.sourceMessageId}</p>
                <p>sourceid: {res.sourceid}</p>
                <p>url: {res.url}</p>
                <p>wascid: {res.wascid}</p>
          </li>
        ))}
      </ul>
        </div>
      </div>
    ) }

     
     

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
           {error}
        </div>
      )}

    </Box>

  


  );
};

export default Calendar;
