import { useState } from "react";
import { Routes, Route , useLocation , Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  // Hook react-router pour savoir sur quelle route on est
 const location = useLocation();
   // Cacher Topbar et Sidebar sur la page de login
   const showNav = location.pathname !== "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
           {showNav && <Sidebar isSidebar={isSidebar} />} 
          <main className="content">
          {showNav && <Topbar setIsSidebar={setIsSidebar} />}  
            <Routes>
            <Route path="/login" element={<Login onLogin={(status) => setIsAuthenticated(status)} />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        
              <Route path="/team" element={isAuthenticated ? <Team /> : <Navigate to="/login" />} />
              <Route path="/history" element={isAuthenticated ? <Contacts /> : <Navigate to="/login" />} />
              <Route path="/invoices" element={isAuthenticated ? <Invoices /> : <Navigate to="/login" />} />
              <Route path="/nmap" element={isAuthenticated ? <Form /> : <Navigate to="/login" />} />
              <Route path="/bar" element={isAuthenticated ? <Bar /> : <Navigate to="/login" />} />
              <Route path="/faq" element={isAuthenticated ? <Pie /> : <Navigate to="/login" />} />
              <Route path="/line" element={isAuthenticated ? <Line /> : <Navigate to="/login" />} />
              <Route path="/wapiti" element={isAuthenticated ? <FAQ /> : <Navigate to="/login" />} />
              <Route path="/zap" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
              <Route path="/geography" element={isAuthenticated ? <Geography /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
