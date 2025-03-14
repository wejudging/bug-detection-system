import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Divider
} from '@mui/material';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { mockBugReports } from '../data/mockData';

// 注册Chart.js组件
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StatisticsPage: React.FC = () => {
  // 计算各种统计数据
  const totalReports = mockBugReports.length;
  const openReports = mockBugReports.filter(report => report.status === 'open').length;
  const inProgressReports = mockBugReports.filter(report => report.status === 'in-progress').length;
  const resolvedReports = mockBugReports.filter(report => report.status === 'resolved').length;
  const duplicateReports = mockBugReports.filter(report => report.status === 'duplicate').length;
  
  // 按严重程度统计
  const criticalReports = mockBugReports.filter(report => report.severity === 'critical').length;
  const highReports = mockBugReports.filter(report => report.severity === 'high').length;
  const mediumReports = mockBugReports.filter(report => report.severity === 'medium').length;
  const lowReports = mockBugReports.filter(report => report.severity === 'low').length;
  
  // 按组件统计
  const componentCounts: Record<string, number> = {};
  mockBugReports.forEach(report => {
    componentCounts[report.component] = (componentCounts[report.component] || 0) + 1;
  });
  
  // 饼图数据 - 按状态
  const statusPieData = {
    labels: ['未解决', '处理中', '已解决', '重复'],
    datasets: [
      {
        data: [openReports, inProgressReports, resolvedReports, duplicateReports],
        backgroundColor: [
          '#f44336', // 红色 - 未解决
          '#2196f3', // 蓝色 - 处理中
          '#4caf50', // 绿色 - 已解决
          '#9e9e9e'  // 灰色 - 重复
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // 饼图数据 - 按严重程度
  const severityPieData = {
    labels: ['严重', '高', '中', '低'],
    datasets: [
      {
        data: [criticalReports, highReports, mediumReports, lowReports],
        backgroundColor: [
          '#9c27b0', // 紫色 - 严重
          '#f44336', // 红色 - 高
          '#ff9800', // 橙色 - 中
          '#4caf50'  // 绿色 - 低
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // 柱状图数据 - 按组件
  const componentBarData = {
    labels: Object.keys(componentCounts),
    datasets: [
      {
        label: '缺陷报告数量',
        data: Object.values(componentCounts),
        backgroundColor: '#2196f3',
      },
    ],
  };
  
  // 柱状图选项
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '各组件缺陷报告数量',
      },
    },
  };
  
  // 计算重复率
  const duplicateRate = (duplicateReports / totalReports) * 100;
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        缺陷报告统计分析
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                总报告数
              </Typography>
              <Typography variant="h3" color="primary">
                {totalReports}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                未解决
              </Typography>
              <Typography variant="h3" sx={{ color: '#f44336' }}>
                {openReports}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                重复报告
              </Typography>
              <Typography variant="h3" sx={{ color: '#9e9e9e' }}>
                {duplicateReports}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                重复率
              </Typography>
              <Typography variant="h3" sx={{ color: '#ff9800' }}>
                {duplicateRate.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              按状态分布
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box height={300}>
              <Pie data={statusPieData} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              按严重程度分布
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box height={300}>
              <Pie data={severityPieData} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              各组件缺陷分布
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box height={400}>
              <Bar options={barOptions} data={componentBarData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          统计分析结论
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="body1" paragraph>
          根据当前缺陷报告数据分析，我们得出以下结论：
        </Typography>
        
        <Typography variant="body1" paragraph>
          1. 当前系统中存在 {duplicateReports} 个重复报告，重复率为 {duplicateRate.toFixed(1)}%。
          通过使用自适应重复检测系统，我们可以进一步降低重复报告率，提高开发团队的工作效率。
        </Typography>
        
        <Typography variant="body1" paragraph>
          2. 在所有组件中，{Object.entries(componentCounts).sort((a, b) => b[1] - a[1])[0][0]} 
          组件的缺陷报告数量最多，达到 {Object.entries(componentCounts).sort((a, b) => b[1] - a[1])[0][1]} 个，
          建议优先关注该组件的质量改进。
        </Typography>
        
        <Typography variant="body1" paragraph>
          3. 系统中有 {criticalReports + highReports} 个高优先级（严重或高）的缺陷报告，
          占总报告的 {((criticalReports + highReports) / totalReports * 100).toFixed(1)}%，
          需要团队优先处理这些问题。
        </Typography>
      </Paper>
    </Container>
  );
};

export default StatisticsPage; 