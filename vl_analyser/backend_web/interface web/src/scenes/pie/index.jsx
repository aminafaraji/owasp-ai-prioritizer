import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          1. What is this application used for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our application helps detect and prioritize vulnerabilities in IP addresses and network assets using advanced machine learning algorithms and automated scanning tools like Nmap.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          2. How does the vulnerability scanning work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We use Nmap to scan the network or IP address. The raw results are then analyzed by our machine learning model, which detects and prioritizes vulnerabilities based on severity, exploitability, and impact.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          3. What makes this tool different from others?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
             AI-based analysis and prioritization
             ,Clean web interface
             ,Real-time scanning and reporting
             ,Focus on automation and simplicity.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          4. Do I need to install anything on my machine?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          No installation is required for the web version. You can access and use it directly from your browser. For advanced usage (like local scanning), a lightweight client is available.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          6. Can I export the scan results?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Absolutely. You can export your results in CSV, JSON, or PDF format directly from the dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
