import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <BugReportIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          自适应重复缺陷报告检测系统
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            首页
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/reports"
          >
            缺陷报告
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/algorithms"
          >
            算法详情
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/statistics"
          >
            统计分析
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 