import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Chip, 
  Divider, 
  Button,
  Grid,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { mockBugReports } from '../data/mockData';
import { formatDate, getSeverityColor, getStatusColor } from '../utils/helpers';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const report = mockBugReports.find(report => report.id === id);
  
  if (!report) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          未找到ID为 {id} 的缺陷报告。
        </Alert>
        <Box mt={2}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/reports')}
          >
            返回报告列表
          </Button>
        </Box>
      </Container>
    );
  }
  
  // 如果是重复报告，查找原始报告
  const originalReport = report.status === 'duplicate' && report.duplicateOf 
    ? mockBugReports.find(r => r.id === report.duplicateOf) 
    : null;
  
  // 查找与当前报告相同组件的其他报告（可能相关）
  const relatedReports = mockBugReports
    .filter(r => r.id !== report.id && r.component === report.component)
    .slice(0, 3); // 只显示前3个
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/reports')}
          sx={{ mr: 2 }}
        >
          返回
        </Button>
        <Typography variant="h4" component="h1">
          缺陷报告详情
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {report.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {report.id}
            </Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<CompareArrowsIcon />}
              onClick={() => navigate(`/detect-duplicates/${report.id}`)}
              disabled={report.status === 'duplicate'}
            >
              检测重复
            </Button>
          </Box>
        </Box>
        
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          <Chip 
            label={`严重程度: ${report.severity}`} 
            sx={{ bgcolor: getSeverityColor(report.severity), color: 'white' }}
          />
          <Chip 
            label={`状态: ${report.status}`} 
            sx={{ bgcolor: getStatusColor(report.status), color: 'white' }}
          />
          <Chip 
            label={`组件: ${report.component}`} 
            variant="outlined"
          />
        </Box>
        
        {report.status === 'duplicate' && originalReport && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            此报告已被标记为重复。原始报告: 
            <Button 
              size="small" 
              onClick={() => navigate(`/report/${originalReport.id}`)}
              sx={{ ml: 1 }}
            >
              {originalReport.id} - {originalReport.title}
            </Button>
          </Alert>
        )}
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              描述
            </Typography>
            <Typography variant="body1" paragraph>
              {report.description}
            </Typography>
            
            <Typography variant="h6" gutterBottom>
              重现步骤
            </Typography>
            <Typography variant="body1" component="div">
              {report.steps.split('\n').map((step, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  {step}
                </Box>
              ))}
            </Typography>
            
            {report.screenshot && (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  截图
                </Typography>
                <Box 
                  component="img" 
                  src={report.screenshot} 
                  alt="Bug Screenshot" 
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: 300, 
                    border: '1px solid #ddd',
                    borderRadius: 1
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Screenshot+Not+Available';
                  }}
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  报告信息
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    创建者
                  </Typography>
                  <Typography variant="body1">
                    {report.createdBy}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    创建时间
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(report.createdAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            {relatedReports.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    相关报告
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  {relatedReports.map(relatedReport => (
                    <Box key={relatedReport.id} sx={{ mb: 2 }}>
                      <Typography 
                        variant="subtitle2" 
                        component="div" 
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/report/${relatedReport.id}`)}
                      >
                        {relatedReport.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {relatedReport.id} | 状态: {relatedReport.status}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ReportDetailPage; 