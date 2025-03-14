import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BugReportIcon from '@mui/icons-material/BugReport';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <BugReportIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            自适应重复缺陷报告检测系统
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          欢迎使用自适应重复缺陷报告检测系统。本系统能够基于缺陷库规模动态选择合适的检测算法，
          有效识别重复的缺陷报告，提高开发团队的工作效率。
        </Typography>
        
        <Typography variant="body1" paragraph>
          对于大规模缺陷库，系统会自动调用MFLLM方法以充分发挥多模态融合与大语言模型的优势；
          对于小规模缺陷库，则启用DLLM方法以利用大语言模型在有限数据下的高效处理能力。
        </Typography>
        
        <Box display="flex" justifyContent="center" mt={3}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/reports')}
            sx={{ mr: 2 }}
          >
            浏览缺陷报告
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate('/algorithms')}
          >
            了解算法详情
          </Button>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <BugReportIcon fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" component="h2" align="center" gutterBottom>
                缺陷报告管理
              </Typography>
              <Typography variant="body2" color="text.secondary">
                浏览、查看和管理系统中的缺陷报告，包括详细信息和状态跟踪。
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => navigate('/reports')}>
                查看报告
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <CompareArrowsIcon fontSize="large" color="secondary" />
              </Box>
              <Typography variant="h6" component="h2" align="center" gutterBottom>
                重复检测
              </Typography>
              <Typography variant="body2" color="text.secondary">
                使用自适应算法检测缺陷报告之间的相似度，识别潜在的重复报告。
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => navigate('/detect-duplicates')}>
                开始检测
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <BarChartIcon fontSize="large" color="info" />
              </Box>
              <Typography variant="h6" component="h2" align="center" gutterBottom>
                统计分析
              </Typography>
              <Typography variant="body2" color="text.secondary">
                查看缺陷报告的统计数据和分析图表，了解项目质量趋势。
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => navigate('/statistics')}>
                查看统计
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <SettingsIcon fontSize="large" color="action" />
              </Box>
              <Typography variant="h6" component="h2" align="center" gutterBottom>
                算法详情
              </Typography>
              <Typography variant="body2" color="text.secondary">
                了解系统使用的检测算法，包括MFLLM和DLLM的特点和适用场景。
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" onClick={() => navigate('/algorithms')}>
                查看算法
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage; 