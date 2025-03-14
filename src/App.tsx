import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import ReportDetailPage from './pages/ReportDetailPage';
import DuplicateDetectionPage from './pages/DuplicateDetectionPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import StatisticsPage from './pages/StatisticsPage';

// 创建主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/report/:id" element={<ReportDetailPage />} />
              <Route path="/detect-duplicates" element={<DuplicateDetectionPage />} />
              <Route path="/detect-duplicates/:id" element={<DuplicateDetectionPage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </Box>
          <Box 
            component="footer" 
            sx={{ 
              py: 3, 
              px: 2, 
              mt: 'auto', 
              backgroundColor: (theme) => theme.palette.grey[200],
              textAlign: 'center'
            }}
          >
            自适应重复缺陷报告检测系统 © {new Date().getFullYear()}
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
